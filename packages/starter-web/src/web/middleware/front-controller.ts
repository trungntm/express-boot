import 'reflect-metadata';
import { Request, Response, NextFunction, RequestHandler } from 'express';

export function frontControllerHandlerMiddleware(controller: any, handler: string): RequestHandler {
  return (req: Request, _res: Response, next: NextFunction) => {
    try {
      // Get metadata about path variables
      const pathVariables: { [key: string]: number } =
        Reflect.getMetadata('path:params', controller, handler) || {};

      const requestParams: { [key: string]: { index: number; defaultValue?: any } } =
        Reflect.getMetadata('request:params', controller, handler) || {};

      // Get metadata about request body
      const requestBodyIndices: number[] =
        Reflect.getMetadata('request:body', controller, handler) || [];

      // Extract arguments for the handler
      const args: any[] = [];
      if (pathVariables) {
        Object.keys(pathVariables).forEach(paramName => {
          const index = pathVariables[paramName];
          args[index] = req.params[paramName]; // Populate args based on param metadata
        });
      }

      if (requestParams) {
        Object.keys(requestParams).forEach(paramName => {
          const { index, defaultValue } = requestParams[paramName];
          args[index] = req.query[paramName] !== undefined ? req.query[paramName] : defaultValue; // Populate args based on query param metadata
        });
      }

      if (requestBodyIndices) {
        requestBodyIndices.forEach(index => {
          args[index] = req.body; // Populate body argument
        });
      }
      (req as any).controllerArgs = args;
      next();
    } catch (error) {
      next(error);
    }
  };
}
