import { RouteMetadata, SwaggerResponse } from '../types'

export function generateSwaggerSpec(controllers: any[]): object {
  const paths: any = {}

  controllers.forEach((ControllerClass) => {
    const basePath: string = '/api' + Reflect.getMetadata('controller:basePath', ControllerClass)

    const routes: RouteMetadata[] = Reflect.getMetadata('controller:routes', ControllerClass) || []

    const swaggerTag = Reflect.getMetadata('swagger:tags', ControllerClass) || []

    routes.forEach((route) => {
      const operations = Reflect.getMetadata('swagger:operations', ControllerClass, route.handler)
      const responses = Reflect.getMetadata('swagger:responses', ControllerClass, route.handler)
      const params = Reflect.getMetadata('swagger:parameters', ControllerClass, route.handler) || []
      const requestBody = Reflect.getMetadata('swagger:requestBody', ControllerClass, route.handler)

      // Check if path parameters (e.g., :id) are part of the route
      const swaggerPath = `${basePath}${route.path.replace(/:(\w+)/g, '{$1}')}`

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
                    schema: requestBody.schema
                  }
                }
              }
            : undefined,
          responses: responses?.reduce((acc: any, response: SwaggerResponse) => {
            acc[response.status] = { description: response.description, content: response.content }
            return acc
          }, {}),
          security: [{ bearerAuth: [] }]
        }
      }
    })
  })

  return {
    openapi: '3.0.0',
    info: {
      title: 'API Documentation',
      version: '1.0.0',
      description: 'Generated Swagger documentation'
    },
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT' // Optional: Specify token format
        }
      }
    },
    security: [{ bearerAuth: [] }],
    paths
  }
}
