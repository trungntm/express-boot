# Starter Swagger

`starter-swagger` is a utility package for integrating Swagger API documentation into Express.js applications. It simplifies the process of generating and managing API documentation.

## Technologies

- **TypeScript**: Strongly typed programming language for building scalable applications.
- **Express.js**: Web framework for Node.js.
- **Swagger**: API documentation and design tool.
- **Decorators**: Simplify Swagger metadata definition using TypeScript decorators.

## Installation

To install the package, use:

- Using `npm`

```bash
npm install @express-boot/starter-swagger
```

- Using `yarn`

```bash
yarn add @express-boot/starter-swagger
```

## List of Annotations and Their Purpose

### API Metadata Annotations

- `@ApiModel()`: Defines a model for API documentation.
- `@ApiModelProperty()`: Describes a property of an API model.
- `@ApiOperations(summary: string)`: Describes an API operation with a summary.
- `@ApiParams(name: string, description: string)`: Describes a parameter for an API operation.
- `@ApiResponses(status: number, description: string)`: Describes possible responses for an API operation.
- `@Tag(name: string, description: string)`: Groups API operations under a specific tag.

## How to Use These Annotations

1. **Define API Models**

   Use the `@ApiModel` and `@ApiModelProperty` annotations to define API models:

   ```typescript
   import { ApiModelProperty } from '@express-boot/starter-swagger';

   export class User {
     @ApiModelProperty('string', 'xxxxxxxxxxxxxxxxxxxxxxxx')
     id: number;

     @ApiModelProperty('string', 'John Doe')
     name: string;
   }
   ```

2. **Annotate API Endpoints**

   Use the `@ApiOperations`, `@ApiParams`, and `@ApiResponses` annotations to document API endpoints:

   ```typescript
   import { RestController, PostMapping } from '@express-boot/starter-web';
   import { ApiOperations, ApiResponses } from '@express-boot/starter-swagger';

   @RestController('/users')
   @Tag('Users')
   export class UserController {
     @PostMapping('')
     @ApiOperation('Create user API', 'Create user API')
     @ApiModel('Create user body', UserDTO)
     @ApiResponses(
       { status: 201, description: 'Created' },
       { status: 401, description: 'Unauthorized' },
       { status: 404, description: 'Not Found' }
     )
     createUser(@RequestBody() userDTO: UserDTO): UserDTO {
       return userDTO;
     }

     @GetMapping('')
     @ApiOperation('Query users API', 'Query users by name and pagination')
     @ApiParam('limit', 'query', 'Limit', false)
     @ApiParam('page', 'query', 'Page', false)
     @ApiParam('name', 'query', 'The users name', false)
     @ApiResponses(
       { status: 200, description: 'Success' },
       { status: 401, description: 'Unauthorized' },
       { status: 404, description: 'Not Found' }
     )
     async queryUsers(
       @RequestParam('page', 0) page: number,
       @RequestParam('limit', 10) limit: number,
       @RequestParam('name') name: string,
       @RequestParam('email') email: string
     ) {
       const filter = { name, email };
       const options = { limit, page };

       const pageResult: Page<User> = await this.userService.queryUsers(filter, options);
       const result: PageResponse = {
         ...pageResult,
         results: pageResult.results.map(UserConverter.entity2dto),
       };

       return result;
     }
   }
   ```

3. **Register Swagger Handler**

   Use the utilities provided by `starter-swagger` to register the Swagger handler with your Express application:

   ```typescript
   import { createExpress } from '@express-boot/starter-web';
   import { generateSwaggerSpec, swaggerUi } from '@express-boot/starter-swagger';
   import { UserController } from './UserController';

   const app = createExpress();
   const controllers = [HelloController];

   const routes = registerRoutes(controllers);

   // Api will be start with context /api. You can reflect it by yourself
   app.use('/api', routes);

   const swaggerSpec = generateSwaggerSpec(controllers);

   // TODO: Fix the swagger-ui-express types
   // eslint-disable-next-line @typescript-eslint/ban-ts-comment
   // @ts-ignore
   app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

   app.listen(3000, () => {
     console.log('Server is running on port 3000');
   });
   ```

## Externalize configuration

- This package is including `@express-boot/starter-core` which support auto-configuration via `application.yaml` file. You can update the swagger information as below to generate the swagger docs with proper information:

```yaml
swagger:
  info:
    title: 'Express Boot App API'
    description: 'API documentation for Express Boot App'
    version: '1.0.0'
```

## License

This package is licensed under the MIT License. See the [LICENSE](../../LICENSE) file for details.
