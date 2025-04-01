# Starter Web

`starter-web` is a utility package for building web applications with Express.js. It provides a set of annotations and utilities to simplify the development of RESTful APIs.

`starter-web` is also includes `stater-core` as a dependency

## Technologies

- **TypeScript**: Strongly typed programming language for building scalable applications.
- **Express.js**: Web framework for Node.js.
- **Decorators**: Simplify routing and middleware configuration using TypeScript decorators.

## Installation

To install the package, use:

- Using `npm`:

```bash
npm install @express-boot/starter-web
```

- Using `yarn`:

```bash
yarn add @express-boot/starter-web
```

## List of Annotations and Their Purpose

### Annotations for HTTP Methods

- `@GetMapping(path: string)`: Maps HTTP GET requests to a specific handler.
- `@PostMapping(path: string)`: Maps HTTP POST requests to a specific handler.
- `@PutMapping(path: string)`: Maps HTTP PUT requests to a specific handler.
- `@DeleteMapping(path: string)`: Maps HTTP DELETE requests to a specific handler.
- `@PatchMapping(path: string)`: Maps HTTP PATCH requests to a specific handler.

### Parameter Annotations

- `@RequestParam(name: string)`: Binds a query parameter to a method parameter.
- `@PathVariable(name: string)`: Binds a path variable to a method parameter.
- `@RequestBody()`: Binds the request body to a method parameter.

### Controller Annotation

- `@RestController()`: Marks a class as a REST controller, enabling it to handle HTTP requests.

## How to Use These Annotations

1. **Create a Controller**

   Use the `@RestController` annotation to define a controller class:

   ```typescript
   import {
     RestController,
     GetMapping,
     PostMapping,
     PutMapping,
     RequestParam,
   } from '@express-boot/starter-web';

   class MessageDTO {
     message: string;
   }

   @RestController('/hello')
   export class HelloController {
     @GetMapping('/sayHello')
     sayHello(@RequestParam('name') name: string): string {
       return `Hello, ${name}!`;
     }

     @PostMapping('/createMessage')
     sayHello(@RequestBody() body: MessageDTO): string {
       return `Creating me, ${body}!`;
     }

     @PutMapping('/updateMessage/:id')
     sayHello(@PathVariable('id') id: string, @RequestBody() body: MessageDTO): string {
       return `Updating ${id}, ${body}!`;
     }
   }
   ```

2. **Register the Controller**

   Use the utilities provided by `starter-web` to register the controller with your Express application:

   ```typescript
   import { createExpress } from '@express-boot/starter-web';
   import { HelloController } from './HelloController';

   const app = createExpress();
   const controllers = [HelloController];

   const routes = registerRoutes(controllers);

   // Api will be start with context /api. You can reflect it by yourself
   app.use('/api', routes);

   app.listen(3000, () => {
     console.log('Server is running on port 3000');
   });
   ```

## License

This package is licensed under the MIT License. See the [LICENSE](../../LICENSE) file for details.
