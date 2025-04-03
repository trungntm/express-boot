import { Container } from '@express-boot/starter-core';
import { RouteMetadata, SwaggerResponse } from '../types';
import { SwaggerProperties } from '../properties/swagger-properties';

/**
 * Generates a Swagger specification object based on the provided controllers.
 *
 * @param {any[]} controllers - An array of controller classes to generate the Swagger spec from.
 * @returns {object} The generated Swagger specification object.
 */
export function generateSwaggerSpec(controllers: any[]): object {
  const paths: any = {};

  const swaggerProperties = Container.get(SwaggerProperties);

  controllers.forEach(controllerClass => {
    const basePath: string = '/api' + Reflect.getMetadata('controller:basePath', controllerClass);

    const routes: RouteMetadata[] = Reflect.getMetadata('controller:routes', controllerClass) || [];

    const swaggerTag = Reflect.getMetadata('swagger:tags', controllerClass) || [];

    routes.forEach(route => {
      const operations = Reflect.getMetadata('swagger:operations', controllerClass, route.handler);
      const responses = Reflect.getMetadata('swagger:responses', controllerClass, route.handler);
      const params =
        Reflect.getMetadata('swagger:parameters', controllerClass, route.handler) || [];
      const requestBody = Reflect.getMetadata(
        'swagger:requestBody',
        controllerClass,
        route.handler
      );

      // Check if path parameters (e.g., :id) are part of the route
      const swaggerPath = `${basePath}${route.path.replace(/:(\w+)/g, '{$1}')}`;

      paths[swaggerPath] = {
        ...paths[swaggerPath],
        [route.method.toLowerCase()]: {
          summary: operations?.summary || '',
          description: operations?.description || '',
          tags: swaggerTag,
          parameters: params || [],
          requestBody: requestBody
            ? {
                description: requestBody.description || '',
                content: {
                  'application/json': {
                    schema: requestBody.schema,
                  },
                },
              }
            : undefined,
          responses: responses?.reduce((acc: any, response: SwaggerResponse) => {
            acc[response.status] = { description: response.description, content: response.content };
            return acc;
          }, {}),
          security: [{ bearerAuth: [] }],
        },
      };
    });
  });

  return {
    openapi: swaggerProperties.openApiVersion,
    info: {
      title: swaggerProperties.info.title,
      version: swaggerProperties.info.version,
      description: swaggerProperties.info.description,
    },
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT', // Optional: Specify token format
        },
      },
    },
    security: [{ bearerAuth: [] }],
    paths,
  };
}
