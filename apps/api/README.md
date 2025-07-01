# 🖥️ @app/api

A high-performance REST API built with Elysia and Bun, providing the backend services for the Turbo Base monorepo. 🚀

## 📖 Overview

This application serves as the primary backend API for the Turbo Base platform. Built with Elysia web framework and powered by Bun runtime, it provides a fast, type-safe, and developer-friendly API with automatic documentation generation and modular architecture.

## 🛠️ Tech Stack

### 🌟 Core Framework

- **[Elysia](https://elysiajs.com/)** - Fast & ergonomic web framework for Bun
- **[Bun](https://bun.sh/)** - High-performance JavaScript runtime

### 📚 Key Dependencies

- **@elysiajs/swagger** - Automatic OpenAPI documentation generation
- **@yolk-oss/elysia-env** - Environment variable validation and management
- **defu** - Deep object merging utility

### 🔧 Development Tools

- **@tool/cli** - Custom CLI for building and compilation
- **@tool/tsconfig** - Shared TypeScript configurations
- **TypeScript** - Type safety and development experience

## 🏗️ Architecture

### 📁 Project Structure

```sh
apps/api/
├── src/
│   ├── libs/           # Shared libraries and utilities
│   │   └── swagger.ts  # Swagger configuration
│   ├── modules/        # Feature modules
│   │   └── ping/       # Health check module
│   │       ├── index.ts    # Module definition
│   │       └── service.ts  # Business logic
│   ├── utils/          # Utility functions
│   │   └── env.ts      # Environment configuration
│   └── main.ts         # Application entry point
├── .env.sample         # Environment variables template
├── Dockerfile          # Container configuration
├── package.json        # Dependencies and scripts
├── tsconfig.json       # TypeScript configuration
└── turbo.json          # Turborepo configuration
```

### 🔧 Module Architecture

The API follows a modular architecture pattern:

```sh
Module Structure
├── index.ts           # Module definition and routing
├── service.ts         # Business logic and data operations
├── types.ts           # Module-specific TypeScript types
└── validators.ts      # Input validation schemas
```

### 🌐 API Structure

```sh
/api
├── /ping              # Health check endpoint
└── /docs              # Swagger UI documentation
```

## 🚀 Getting Started

### 📋 Prerequisites

- **Bun** >= 1.x
- **Node.js** >= 18.0.0 (for tooling compatibility)

### 🔧 Environment Setup

1. **Copy environment template:**

    ```bash
    cp .env.sample .env
    ```

2. **Configure environment variables:**

    ```bash
    # Server Configuration
    HOST=0.0.0.0          # Server host
    PORT=3000             # Server port
    ```

### 🏃‍♂️ Development

```bash
# Start development server with hot reload
bun run dev

# Type check the application
bun run ts:check

# Build for production (compile for the current platform)
bun run build

# Compile to executable (compile for target platforms using @tool/cli)
bun run compile
```

### 🐳 Docker Deployment

```bash
# Build Docker image
docker build -t turbo-api .

# Run container
docker run -p 3000:3000 turbo-api
```

## 📡 API Documentation

### 🔍 Interactive Documentation

The API provides automatic OpenAPI documentation:

- **Development**: `http://localhost:3000/api/docs`
- **Production**: `https://your-domain.com/api/docs`

### 🎯 Available Endpoints

#### Health Check

```http
GET /api/ping
```

**Response:**

```json
"pong"
```

## 🔧 Development Workflow

### 📝 Creating New Modules

1. **Create module directory:**

    ```bash
    mkdir src/modules/your-module
    ```

2. **Create module files:**

    ```typescript
    // src/modules/your-module/index.ts
    import Elysia from 'elysia';
    import YourService from './service';

    export default new Elysia({ name: 'module:your-module' })
      .group('/your-module', (app) => 
        app.use(YourService)
          .get('/', ({ yourService }) => yourService.greeting())
      );
    ```

3. **Create service:**

    ```typescript
    // src/modules/your-module/service.ts
    import Elysia from 'elysia';

    export default new Elysia({ name: 'service:your-module' })
      .decorate('yourService', {
        greeting() {
          return { message: 'Hello from your module!' };
        },
      });
    ```

4. **Register in main.ts:**

    ```typescript
    import YourModule from '#/your-module';

    const app = new Elysia({ prefix: '/api' })
      // ...existing middleware
      .use(YourModule);
    ```

### 🛡️ Environment Variables

Add new environment variables in `src/utils/env.ts`:

```typescript
export default env({
  HOST: t.String({ default: '0.0.0.0' }),
  PORT: t.Number({ default: 3000 }),
  // Add your variables here
  DATABASE_URL: t.String(),
  JWT_SECRET: t.String(),
});
```

### 📖 Adding Documentation

Enhance Swagger documentation in `src/libs/swagger.ts`:

```typescript
const DEFAULT_OPTIONS = {
  documentation: {
    info: {
      title: 'Turbo Base API Documentation',
      version,
      description: 'Comprehensive API for Turbo Base platform',
    },
    tags: [
      { name: 'Health', description: 'Health check endpoints' },
      { name: 'Users', description: 'User management' },
    ],
  },
} satisfies ElysiaSwaggerConfig;
```

## 🚀 Performance & Optimization

### ⚡ Built-in Optimizations

- **Bun Runtime**: Native performance with optimized JavaScript execution
- **Elysia Framework**: Zero-cost abstractions and minimal overhead
- **Type Safety**: Compile-time optimizations with TypeScript
- **Hot Reload**: Fast development iterations with Bun's built-in watcher

### 📊 Production Optimizations

- **Single File Executable**: Compiled binaries for deployment
- **Source Maps**: Enabled for debugging in production
- **Environment Validation**: Runtime environment variable checking
- **Modular Architecture**: Efficient code splitting and loading

## 🔐 Security

### 🛡️ Security Features

- **Environment Validation**: Secure environment variable handling
- **Type Safety**: Runtime type checking with Elysia's type system
- **CORS Configuration**: Configurable cross-origin resource sharing
- **Request Validation**: Automatic input validation and sanitization

### 🔒 Security Best Practices

- Keep environment variables secure and never commit `.env` files
- Validate all incoming requests with proper schemas
- Implement proper authentication and authorization
- Use HTTPS in production environments
- Regularly update dependencies for security patches

## 📄 License

This application is part of the Turbo Base monorepo and follows the same license terms.
