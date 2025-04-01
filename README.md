# Express Boot

A modern Express.js application using Yarn workspaces and TypeScript.

## Project Structure

```
express-boot/
├── packages/
│   ├── app/               # Main Express application
│   │   ├── src/           # Application source code
│   │   │   ├── main/      # Main application logic
│   │   │   ├── resources/ # Configuration files (e.g., application.yml)
│   │   └── package.json   # App-specific dependencies
│   ├── starter-core/      # Core utilities and environment management
│   ├── starter-log/       # Logging utilities
│   ├── starter-swagger/   # Swagger integration
│   └── starter-web/       # Web utilities and decorators
├── package.json           # Root package.json
└── tsconfig.json          # TypeScript configuration
```

## Getting Started

1. Install dependencies:

   ```bash
   yarn install
   ```

2. Start the development server:

   ```bash
   yarn dev
   ```

3. Build the project:

   ```bash
   yarn build
   ```

4. Start the production server:
   ```bash
   yarn start
   ```

## Available Scripts

- `yarn dev`: Start the development server with hot reload
- `yarn build:packages`: Build the packages
- `yarn build:app`: Build the demo app
- `yarn start`: Start the production server
- `yarn test`: Run tests

## Features

- TypeScript support
- Modular monorepo structure with Yarn workspaces
- Express.js framework
- Swagger integration for API documentation
- Centralized configuration management
- Logging utilities
- Development server with hot reload
- Production build setup
