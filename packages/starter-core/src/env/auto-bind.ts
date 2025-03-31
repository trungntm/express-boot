// import Container from 'typedi';
// import { getConfigurationRegistry } from './annotation/configuration-properties';
// import { ConfigurationBinder } from './configuration-binder';
// import { Environment } from './property-source';

// const boundConfigurations = new Map<Function, any>();

// export function autoBindConfigurations(environment: Environment): void {
//   const registry = getConfigurationRegistry();

//   for (const configClass of registry) {
//     const instance = ConfigurationBinder.bind(configClass as any, environment);
//     boundConfigurations.set(configClass, instance);
//     console.log(`Auto-bound configuration class: ${configClass.name}`, instance);
//     Container.set(configClass, instance);
//     console.log(`Get after bind: ${configClass.name}`, Container.get(configClass));
//   }
// }

// export function getBoundConfiguration<T>(configClass: new () => T): T {
//   return boundConfigurations.get(configClass);
// }
