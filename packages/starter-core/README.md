# Starter Core

`starter-core` is a foundational package for Express.js applications. It provides utilities for environment management, property binding, and configuration handling, enabling a robust and flexible application setup.

## Technologies

- **TypeScript**: Strongly typed programming language for building scalable applications.
- **Typedi**: Dependency injection tool for Typescript and JavaScript.

## Installation

To install the package, use:

- Using `npm`:

```bash
npm install @express-boot/starter-core
```

- Using `yarn`:

```bash
yarn add @express-boot/starter-core
```

## Features

### Environment Management

- `activeProfile` will let you know which environment you are working on. This will be set from `NODE_ENV` variable
- Load environment variables from `.env` files or system environment.
- Support for YAML and JSON property sources.
  - application.yaml/json - default property file
  - application-{profile}.yaml/json - profile property file
  - support for both `camelCase` and `kebab-case`

### Property Binding

- `@ConfigurationProperties`: Binds configuration properties to a class.
- `@NestedConfigurationProperties`: Binds configuration properties to a nested class
- `@Value`: Injects specific configuration values into fields or methods.

### Dependency Injection

#### From Typedi

- `@Inject`: Automatically injects dependencies into components.
- `@Service`: Register a instance into `Container`

#### Custom

- `@Autowired`: Automatically injects dependencies into components, the same with `@Inject`.

## How to Use

1. **Load Configuration Properties**

   Use the `@ConfigurationProperties` annotation to bind configuration properties to a class:

   ```typescript
   import { ConfigurationProperties } from '@express-boot/starter-core';

   @ConfigurationProperties('server')
   export class ServerProperties {
     port: number = 8080;
   }
   ```

   ```typescript
   import { ConfigurationProperties } from '@express-boot/starter-core';

   class AppConfiguration {
     name: string = '';
   }

   @ConfigurationProperties('server')
   export class ServerProperties {
     port: number = 8080;
     @NestedConfigirationProperties()
     appConfig: AppConfigiration = new AppConfiguration();
   }
   ```

2. **Inject Configuration Values**

   Use the `@Value` annotation to inject specific configuration values:

   ```typescript
   import { Value } from '@express-boot/starter-core';

   export class AppConfig {
     @Value('app.name')
     appName: string;
   }
   ```

3. **Dependency Injection**

   Use the `@Autowired` annotation to inject dependencies:

   ```typescript
   import { Autowired } from '@express-boot/starter-core';

   export class MyService {
     @Autowired()
     private readonly anotherService: AnotherService;
   }
   ```

## License

This package is licensed under the MIT License. See the [LICENSE](../../LICENSE) file for details.
