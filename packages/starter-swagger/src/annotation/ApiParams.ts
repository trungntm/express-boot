import 'reflect-metadata';

export interface SwaggerParameter {
  name: string;
  in: 'query' | 'path' | 'header' | 'cookie';
  required: boolean;
  description?: string;
  schema?: object;
}

export function ApiParam(
  name: string,
  type: 'query' | 'path',
  description: string,
  required = true
) {
  return function (target: any, propertyKey: string) {
    const params: SwaggerParameter[] =
      Reflect.getMetadata('swagger:parameters', target.constructor, propertyKey) || [];
    params.push({ name, in: type, required, description });
    Reflect.defineMetadata('swagger:parameters', params, target.constructor, propertyKey);
  };
}
