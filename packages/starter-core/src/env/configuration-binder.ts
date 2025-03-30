import 'reflect-metadata';
import { TypeConverter } from '../types/type-converter';
import { Environment } from './property-source';
import { CONFIG_PREFIX_KEY } from '../utils';

export class ConfigurationBinder {
  private static toKebabCase(str: string): string {
    return str.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase();
  }

  private static toCamelCase(str: string): string {
    return str.replace(/-([a-z])/g, (g) => g[1].toUpperCase());
  }

  static bind<T extends object>(target: new () => T, environment: Environment): T {
    const instance = new target();
    const prefix = Reflect.getMetadata(CONFIG_PREFIX_KEY, target) || '';

    // // Get all properties from the class
    // const propertyNames = Object.getOwnPropertyNames(target.prototype);
    // console.log('class propertyNames', propertyNames);

    // Get all properties from the instance
    const instancePropertyNames = Object.keys(instance);
    
    // Try to get type metadata from the class
    for (const propertyKey of instancePropertyNames) {
      const type = Reflect.getMetadata('design:type', instance, propertyKey);

      // Try both kebab-case and camelCase versions of the property key
      const kebabKey = this.toKebabCase(propertyKey);
      const camelKey = this.toCamelCase(kebabKey);
      
      // Try both formats in the configuration
      const configKeyKebab = prefix ? `${prefix}.${kebabKey}` : kebabKey;
      const configKeyCamel = prefix ? `${prefix}.${camelKey}` : camelKey;
      
      const value = environment.getProperty(configKeyKebab) || environment.getProperty(configKeyCamel);
      
      if (value !== undefined) {
        (instance as any)[propertyKey] = TypeConverter.convert(value, type);

        Object.defineProperty(target, propertyKey, {
          get: function () {
            return value;
          },
          set: function (newValue: any) {
            // Note: Setting the value won't affect the environment
            // This is just to maintain property accessor pattern
            this[`_${propertyKey}`] = newValue;
          },
          enumerable: true,
          configurable: true,
        });
      }
    }
    
    return instance;
  }
}