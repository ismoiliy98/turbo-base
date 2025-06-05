# 🛠️ @tool/tsconfig

A collection of shared TypeScript configurations for the Turbo Base monorepo (turborepo). 🚀

## 📖 Overview

This internal tooling package provides standardized TypeScript configurations that can be extended by different packages and applications within the monorepo.

## ⚙️ Available Configurations

### 📋 Base Configuration

`base.tsconfig.json`

The foundation configuration that sets up common TypeScript settings:

- 📦 **Module System**
  - ESNext target with bundler-based module resolution
  - JSON module support
  - Synthetic default imports allowed
  - TypeScript extensions import support

- 🛡️ **Type Safety**
  - Strict mode with null checks
  - No implicit any/returns/overrides
  - Unused locals and parameters checking
  - Consistent file casing enforced

- 🔧 **Build Options**
  - Incremental compilation
  - No declaration files
  - JavaScript files allowed
  - Skip library checks for better performance

### ⚛️ React Configuration

`react.tsconfig.json`

Extends the base configuration with React-specific settings:

- React JSX transform support
- Class fields definition behavior
- DOM and DOM.Iterable type definitions

### 🟢 Bun Configuration

`bun.tsconfig.json`

Extends the base configuration with Bun.js settings:

- Node.js type definitions
- Bun runtime type support

## Usage

1. Add the package to your project's dev dependencies:

    ```json
    {
      "devDependencies": {
        "@tool/tsconfig": "workspace:*"
      }
    }
    ```

2. Extend the appropriate configuration in your `tsconfig.json`:

    - For `React` applications:

    ```json
    {
      "extends": "@tool/tsconfig/react.tsconfig.json",
      "compilerOptions": {
        "rootDir": "src",
        "outDir": "dist"
      },
      "include": ["src/**/*"]
    }
    ```

    - For `Bun (or Node)` services:

    ```json
    {
      "extends": "@tool/tsconfig/bun.tsconfig.json",
      "compilerOptions": {
        "rootDir": "src",
        "outDir": "dist"
      },
      "include": ["src/**/*"]
    }
    ```

## Key Benefits

- 🎯 Standardized configurations across packages
- 🔒 Strong type safety defaults
- ⚡️ Optimized build settings
- 📦 Framework-specific optimizations
- 🔄 Consistent module resolution
