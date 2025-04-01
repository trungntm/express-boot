import { StandardEnvironment } from '../environment';

export function Value(path: string) {
  return function (target: any, propertyKey: string) {
    // Get the environment instance
    const environment = StandardEnvironment.getInstance();

    // Get the value from environment
    const value = environment.getProperty(path);

    // Define the property with getter and setter
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
  };
}
