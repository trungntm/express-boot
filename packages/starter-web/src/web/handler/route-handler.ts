import { Router, RequestHandler } from 'express';
import { Container } from 'typedi';
import { RestController } from '../annotation';
import { catchAsync } from '../../utils/catch-async';
import { frontControllerHandlerMiddleware } from '../middleware/front-controller';
import httpStatus from 'http-status';

export function registerRoutes(controllers: any[]): Router {
  const router = Router();

  controllers.forEach(controller => {
    // Get the base path of the controller
    const basePath: string = Reflect.getMetadata('controller:basePath', controller);

    // Retrieve route metadata for the controller
    const routes: { path: string; method: string; handler: string }[] = Reflect.getMetadata(
      'controller:routes',
      controller
    );

    const controllerInstance = Container.get<typeof RestController>(controller);

    if (!controllerInstance || typeof controllerInstance !== 'object') {
      throw new Error('Controller instance is invalid');
    }

    // Register each route with the full path (basePath + method path)
    routes.forEach(route => {
      const { path, method, handler } = route;
      const fullPath = basePath + path; // Combine base path with method path

      if (controllerInstance[handler]) {
        const routeMethod = method.toLowerCase() as 'get' | 'post' | 'put' | 'delete'; // Restrict to valid HTTP methods
        // Register the route method on the router
        const handlerFunction = controllerInstance[
          handler as keyof typeof controllerInstance
        ] as unknown as (...args: any[]) => any;
        // Apply the auth middleware if needed
        const middlewareChain: RequestHandler[] = [];

        // Put auth middleware
        // const requiredRights = getRequiredRights(controllerInstance, handler)
        // if (requiredRights.length > 0) {
        //   middlewareChain.push(auth(...requiredRights))
        // } else {
        //   middlewareChain.push(auth())
        // }

        // Put validate request middleware
        // const validate = validateRequest(controllerInstance, handler)
        // if (validate) {
        //   middlewareChain.push(validate)
        // }

        middlewareChain.push(frontControllerHandlerMiddleware(controllerInstance, handler));

        // Add the route handler wrapped in error handling
        middlewareChain.push(
          catchAsync(async (req, res) => {
            const args = (req as any).controllerArgs;
            // Call the handler
            const result = await handlerFunction.apply(controllerInstance, args);
            if (result !== undefined) {
              if (method.toLowerCase() === 'post') {
                res.status(httpStatus.CREATED).send(result);
              } else {
                res.send(result); // Automatically send the result if defined
              }
            }
          })
        );

        router[routeMethod](fullPath, ...middlewareChain);
      }
    });
  });

  return router; // Return the router with all the routes registered
}
