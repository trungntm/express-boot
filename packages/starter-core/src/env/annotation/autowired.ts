import 'reflect-metadata';

import { Container } from 'typedi';

export function Autowired(): PropertyDecorator {
  return function (target: Object, propertyKey: string | symbol): void {
    Object.defineProperty(target, propertyKey, {
      get: function () {
        return Container.get(Reflect.getMetadata('design:type', target, propertyKey));
      },
      enumerable: true,
      configurable: true,
    });
  };
}
