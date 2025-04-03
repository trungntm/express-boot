# Starter Mongo

`starter-mongo` is a utility package for integrating MongoDB into Express.js applications. It provides repository patterns, and pagination utilities to simplify database operations.

## Features

- **Repository Pattern**: Abstracts MongoDB operations with a repository interface.
- **Pagination**: Includes `Pageable`, `PageRequest` and `Page` classes for paginated queries.
- **Configuration**: Supports configuration via `application.yml`.

## Installation

To install the package, use:

```bash
npm install @express-boot/starter-mongo
```

or

```bash
yarn add @express-boot/starter-mongo
```

## Usage

### 1. Configuration

Add MongoDB configuration to your `application.yml` file:

```yaml
express:
  data:
    mongodb:
      uri: 'mongodb://localhost:27017/express-app'
      database: 'test'
      username: ''
      password: ''
```

### 2. Define a Model

Create a model class that extends `DocumentModel`:

```typescript
import { DocumentModel } from '@express-boot/starter-mongo';

export class User extends DocumentModel {
  name: string;
  email: string;
}
```

### 3. Create a Repository

Use `@Repository` decorator to annotate your repository will map to a collection in database. Also, it will register as a service into `Container` IoC

- Ex: @Repository('users')

Implement a repository for your model:

```typescript
import { MongoRepository, MongoRepositoryImpl, Repository } from '@express-boot/starter-mongo';
import { User } from '../model/User';

@Repository('users')
export class UserRepository extends MongoRepositoryImpl<User> implements MongoRepository<User> {}
```

### 4. Use the Repository

Inject and use the repository in your service or controller:

```typescript
import { Inject, Service } from '@express-boot/starter-core';
import { UserRepository } from '../repository/UserRepository';

@Service()
export class UserService {
  constructor(@Inject() private readonly userRepository: UserRepository) {}

  async createUser(name: string, email: string): Promise<User> {
    await this.userRepository.save({ name, email });
  }
}
```

### 5. Pagination

Use the `PageRequest` class for paginated queries:

```typescript
const pageable = PageRequest.ofPageAndLimit(0, 10);
const filter = { name: 'John' };
const page = await userRepository.findAllWithPaging(filter, pageable);
console.log(page.results);
```

## License

This package is licensed under the MIT License. See the [LICENSE](../../LICENSE) file for details.
