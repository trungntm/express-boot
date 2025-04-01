import 'reflect-metadata';
import { SwaggerResponse } from '../types';

export function ApiResponses(...value: SwaggerResponse[]) {
  return function (target: any, propertyKey: string) {
    Reflect.defineMetadata('swagger:responses', value, target.constructor, propertyKey);
  };
}
