# Starter Log

`starter-log` is a logging utility package for Express.js applications. It provides a simple and consistent way to handle logging across your application. It can be use for `class` or `function`

## Technologies

- Typescript
- Signale

## Features

- Centralized logging utility
- Easy integration with Express.js
- Configurable log levels

## Installation

To install the package, use:

- Using `npm`

```bash
npm install @express-boot/starter-log
```

- Using `yarn`

```bash
yarn install @express-boot/starter-log
```

## Usage

Import the logging utility and use it in your application:

```typescript
import { Logger } from '@express-boot/starter-log';

class HelloWorldController {
  private readonly logger = log.scope('HelloController');

  async sayHello(): Promise<string> {
    this.logger.info('sayHello', name);
  }
}
```

## License

This package is licensed under the MIT License. See the [LICENSE](../../LICENSE) file for details.
