import 'reflect-metadata';
import { TypeConverter } from '../types/type-converter';
import { Environment } from './property-source';
import { CONFIG_PREFIX_KEY } from '../utils';

export class ConfigurationBinder {
  private static toKebabCase(str: string): string {
    return str.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase();
  }

  private static toCamelCase(str: string): string {
    return str.replace(/-([a-z])/g, g => g[1].toUpperCase());
  }

  private static bindNestedProperties(
    instance: any,
    prefix: string,
    environment: Environment
  ): void {
    const keys = Object.keys(instance);

    for (const key of keys) {
      const type = Reflect.getMetadata('design:type', instance, key);

      const kebabKey = this.toKebabCase(key);
      const camelKey = this.toCamelCase(kebabKey);

      const configKeyKebab = prefix ? `${prefix}.${kebabKey}` : kebabKey;
      const configKeyCamel = prefix ? `${prefix}.${camelKey}` : camelKey;

      const value =
        environment.getProperty(configKeyKebab) || environment.getProperty(configKeyCamel);
      if (value !== undefined) {
        instance[key] = TypeConverter.convert(value, type);
      } else if (type && typeof type === 'function' && type.prototype) {
        // Handle nested objects
        if (!instance[key]) {
          instance[key] = new type();
        }
        this.bindNestedProperties(instance[key], configKeyKebab, environment);
      }
    }
  }

  static bind<T extends object>(target: new () => T, environment: Environment): T {
    const instance = new target();
    const prefix = Reflect.getMetadata(CONFIG_PREFIX_KEY, target) || '';

    this.bindNestedProperties(instance, prefix, environment);

    return instance;
  }
}
