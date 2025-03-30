import { Container } from 'typedi';
import { CONFIG_PREFIX_KEY } from './index';

export function getConfigurationServices(): any[] {
  // Get all services from the container
  const services = Container.getMany('*');
  
  // Filter services that have ConfigurationProperties metadata
  return services.filter(service => {
    const constructor = Object.getPrototypeOf(service).constructor;
    return Reflect.hasMetadata(CONFIG_PREFIX_KEY, constructor);
  });
}

export function getConfigurationService<T>(constructor: new (...args: any[]) => T): T {
  return Container.get(constructor);
}

export function getConfigurationPrefix(constructor: any): string {
  return Reflect.getMetadata(CONFIG_PREFIX_KEY, constructor) || '';
} 