import 'reflect-metadata';
import { Service } from 'typedi';

// Controller decorator to define the base path for the controller
export function RestController(basePath: string) {
  return function (target: any) {
    Service()(target);
    Reflect.defineMetadata('controller:basePath', basePath, target);
  };
}
