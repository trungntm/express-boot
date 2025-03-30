import 'reflect-metadata';
import { Service } from 'typedi';
import { CONFIG_PREFIX_KEY } from '../../utils';

export function ConfigurationProperties(prefix: string = '') {
  return function <T extends { new (...args: any[]): {} }>(constructor: T) {
    Service()(constructor);
    Reflect.defineMetadata(CONFIG_PREFIX_KEY, prefix, constructor);
  };
}
