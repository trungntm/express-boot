import { RouteMetadata } from '../types';

export function createMethodDecorator(method: string) {
  return function (path: string) {
    return function (target: any, propertyKey: string) {
      // Retrieve current routes or initialize empty array
      const routes: RouteMetadata[] =
        Reflect.getMetadata('controller:routes', target.constructor) || [];

      // Add route metadata with path, method, and handler
      routes.push({
        path,
        method,
        handler: propertyKey,
      });

      // Define metadata for the controller's routes
      Reflect.defineMetadata('controller:routes', routes, target.constructor);
    };
  };
}
