# 🛠️ @tool/tsconfig

A collection of shared TypeScript configurations for the Turbo Base monorepo, providing standardized compilation settings across all packages and applications. 🚀

## 📖 Overview

This internal tooling package provides standardized TypeScript configurations that can be extended by different packages and applications within the monorepo. It includes framework-specific presets with optimized compilation settings and strong type safety defaults.

## ⚙️ Available Configurations

### 📋 Base Configuration

`base.tsconfig.json` - Foundation configuration for all TypeScript projects

```json
{
  "extends": "@tool/tsconfig/base.tsconfig.json",
  "compilerOptions": {
    "rootDir": "src",
    "outDir": "dist"
  },
  "include": ["src/**/*"]
}
```

**Features:**

- **Module System**: ESNext target with bundler-based module resolution
- **JSON Support**: Resolve JSON modules with full type safety
- **Import Flexibility**: Synthetic default imports and TypeScript extensions
- **Build Performance**: Incremental compilation with optimized caching
- **Type Safety**: Strict mode with comprehensive null checks
- **Development**: No emit mode with pretty printing enabled

### ⚛️ React Configuration

`react.tsconfig.json` - Extends base with React-specific settings

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

**Features:**

- Extends the base configuration
- **JSX Transform**: Modern React JSX transform (`react-jsx`)
- **Class Fields**: `useDefineForClassFields` for proper class behavior
- **DOM Types**: ES2022, DOM, and DOM.Iterable type definitions
- **React Optimized**: Configured for React 19+ development patterns

### 🟢 Bun Configuration

`bun.tsconfig.json` - Extends base with Bun.js and Node.js settings

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

**Features:**

- Extends the base configuration
- **Runtime Types**: Node.js and Bun runtime type definitions
- **Server Optimized**: Configured for backend services and CLI tools
- **Cross-Platform**: Works with both Bun and Node.js environments

## 🚀 Usage Examples

### 📦 Installation

Add the package to your project's dev dependencies:

```json
{
  "devDependencies": {
    "@tool/tsconfig": "workspace:*"
  }
}
```

### 🌐 Web Application (React)

```json
{
  "extends": "@tool/tsconfig/react.tsconfig.json",
  "compilerOptions": {
    "rootDir": "src",
    "outDir": "dist",
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    }
  },
  "include": [
    "src/**/*",
    "vite.config.ts"
  ],
  "exclude": ["dist", "node_modules"]
}
```

### 🖥️ Backend Service (Bun/Node)

```json
{
  "extends": "@tool/tsconfig/bun.tsconfig.json",
  "compilerOptions": {
    "rootDir": "src",
    "outDir": "dist",
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    }
  },
  "include": ["src/**/*"],
  "exclude": ["dist", "tests", "node_modules"]
}
```

### 📚 Package Library

```json
{
  "extends": "@tool/tsconfig/base.tsconfig.json",
  "compilerOptions": {
    "rootDir": "src",
    "outDir": "dist",
    "declaration": true,
    "declarationMap": true,
    "emitDeclarationOnly": true
  },
  "include": ["src/**/*"],
  "exclude": ["dist", "tests"]
}
```

## 🏗️ Architecture

### 📁 Project Structure

```sh
tools/tsconfig/
├── base.tsconfig.json     # Foundation configuration
├── react.tsconfig.json    # React-specific preset
├── bun.tsconfig.json      # Bun/Node.js preset  
├── package.json           # Package configuration
└── README.md              # Documentation
```

### 🔧 Configuration Hierarchy

```sh
Base Configuration (base.tsconfig.json)
├── ESNext target with bundler module resolution
├── Strict type checking with null safety
├── Incremental compilation with caching
├── JSON module support
│
├── React Configuration (react.tsconfig.json)
│   ├── Extends base configuration
│   ├── React JSX transform support
│   ├── DOM type definitions
│   └── Class fields definition behavior
│
└── Bun Configuration (bun.tsconfig.json)
    ├── Extends base configuration
    ├── Node.js type definitions
    └── Bun runtime type support
```

## 🛡️ Type Safety Features

The configurations provide comprehensive type safety:

**Strict Mode Settings:**

- `strict: true` - Enable all strict type checking options
- `noImplicitAny: true` - Disallow implicit any types
- `noImplicitReturns: true` - Require explicit return statements
- `noImplicitOverride: true` - Require explicit override keywords
- `noUnusedLocals: true` - Report unused local variables
- `noUnusedParameters: true` - Report unused function parameters
- `forceConsistentCasingInFileNames: true` - Enforce consistent file naming

## 🚀 Performance Features

### ⚡ Build Optimization

- **Incremental Compilation**: Fast rebuilds with `.tsbuildinfo` caching
- **Skip Lib Check**: Skip type checking of declaration files for speed
- **Isolated Modules**: Each file can be transpiled independently
- **Module Detection**: Force module detection for better tree shaking

### 📊 Development Experience

- **Pretty Output**: Enhanced error messages and formatting
- **Source Maps**: Full debugging support with sourcemap generation
- **Import Extensions**: TypeScript file imports with extensions
- **JSON Modules**: Direct JSON file imports with type safety

## 🔧 Development

### 📋 Scripts

```bash
# Type check all configuration files
bun run ts:check

# Clean build artifacts and dependencies
bun run clean
```

### 🧪 Testing Configurations

```bash
# Test base configuration
bunx tsc --noEmit --project base.tsconfig.json

# Test React configuration  
bunx tsc --noEmit --project react.tsconfig.json

# Test Bun configuration
bunx tsc --noEmit --project bun.tsconfig.json
```

## 📚 Dependencies

### ⚙️ Development Dependencies

- **TypeScript** - Core TypeScript compiler and type system
- **@types/bun** - Bun runtime type definitions
- **@types/node** - Node.js runtime type definitions

## 🤝 Contributing

When contributing to the TypeScript configurations:

1. **Compatibility** - Ensure configurations work across all supported environments
2. **Performance** - Consider compilation speed and development experience
3. **Type Safety** - Maintain strict type checking without being overly restrictive
4. **Documentation** - Update this README for configuration changes
5. **Testing** - Test configurations with real projects in the monorepo

## 📄 License

This tool is part of the Turbo Base monorepo and follows the same license terms.
