import 'reflect-metadata';
import { CONFIG_PREFIX_KEY } from '../../utils';
import { Service } from 'typedi';
import { Container } from 'typedi';
import { ConfigurationBinder } from '../configuration-binder';
import { StandardEnvironment } from './../environment';

// const configurationRegistry: Set<Function> = new Set();

export function ConfigurationProperties(prefix: string = ''): ClassDecorator {
  return function (target: Function): void {
    Service()(target); // Register the class in the container
    Reflect.defineMetadata(CONFIG_PREFIX_KEY, prefix, target);
    // configurationRegistry.add(target);

    // Auto-bind the configuration class to the environment
    const environment = StandardEnvironment.getInstance();
    const boundInstance = ConfigurationBinder.bind(target as any, environment);
    Container.set(target, boundInstance); // Store the bound instance in the container
  };
}

// export function getConfigurationRegistry(): Set<Function> {
//   return configurationRegistry;
// }

export function NestedConfigurationProperties(): PropertyDecorator {
  return function (_target: Object, _propertyKey: string | symbol): void {};
}
