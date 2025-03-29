# Express Boot

A modern Express.js application using Yarn workspaces and TypeScript.

## Project Structure

```
express-boot/
├── packages/
│   ├── app/           # Main Express application
│   └── shared/        # Shared utilities
├── package.json       # Root package.json
└── tsconfig.json      # TypeScript configuration
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
- `yarn build`: Build the project
- `yarn start`: Start the production server
- `yarn test`: Run tests

## Features

- TypeScript support
- Express.js framework
- Yarn workspaces for monorepo management
- Shared utilities package
- Development server with hot reload
- Production build setup
