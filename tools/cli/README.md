# 🛠️ @tool/cli

A powerful command-line interface tool for the Turbo Base monorepo that provides compilation utilities and development tooling. 🚀

## 📖 Overview

This internal tooling package provides a comprehensive CLI for building and compiling TypeScript entries into Bun single-file executables with support for multiple target platforms and advanced compilation options.

## ⚙️ Installation & Usage

### 📦 Installation

This tool is automatically available within the monorepo workspace. You can run it using:

```bash
bun run tool-cli <command>
# or
bunx tool-cli <command>
```

### 🚀 Commands

#### `compile <entries...>`

Compile provided entry files into Bun single-file executables.

```bash
tool-cli compile src/main.ts src/worker.ts
```

### 🎯 Options

#### Target Platform Options

- `-t, --target <targets...>` - Specify target platforms (conflicts with --current)
- `--current` - Build for current platform (conflicts with --target)

**Available targets:**

- `bun-linux-x64` - Linux Intel/AMD
- `bun-linux-arm64` - Linux ARM64
- `bun-linux-x64-musl` - Linux Intel/AMD with musl libc
- `bun-linux-arm64-musl` - Linux ARM64 with musl libc
- `bun-darwin-x64` - macOS Intel
- `bun-darwin-arm64` - macOS Apple Silicon

#### Output Options

- `--outdir <outdir>` - Path to output directory
- `--prefix <prefix>` - Add prefix to compiled executable(s)
- `--minify` - Enable bun's all minification flags
- `--sourcemap` - Compile with sourcemaps
- `--bytecode` - Use a bytecode cache for compiled executable
- `--clean` - Clean output directory before compiling

#### Performance Options

- `--concurrency <number>` - Max concurrent compilation processes when multiple targets specified (default: 4)

### 📋 Examples

#### Basic Compilation

```bash
# Compile for current platform
tool-cli compile src/main.ts --current

# Compile for specific targets
tool-cli compile src/main.ts -t bun-darwin-arm64 bun-linux-x64

# Compile with custom output directory and prefix
tool-cli compile src/main.ts --outdir build --prefix my-app
```

#### Advanced Compilation

```bash
# Compile with minification and source maps
tool-cli compile src/main.ts --minify --sourcemap

# Compile with maximum performance options
tool-cli compile src/main.ts --bytecode --concurrency 8

# Compile multiple entries for production
tool-cli compile src/server.ts src/worker.ts src/cli.ts \
  -t bun-darwin-arm64 bun-linux-x64 bun-linux-x64-musl \
  --minify --bytecode --clean \
  --outdir dist/production
```

## 🏗️ Architecture

### 📁 Project Structure

```sh
tools/cli/
├── bin/
│   └── cli.ts          # CLI entry point and command definitions
├── src/
│   ├── compiler.ts     # Core compilation logic and orchestration
│   ├── constants.ts    # Application constants and defaults
│   ├── prompts.ts      # Interactive prompts for user input
│   ├── types.ts        # TypeScript type definitions
│   └── utils.ts        # Utility functions and helpers
├── package.json        # Package configuration and dependencies
└── tsconfig.json       # TypeScript configuration
```

### 🔧 Core Components

#### **Compiler Engine** (`compiler.ts`)

- Handles multi-target compilation orchestration
- Manages concurrent build processes
- Provides build result aggregation and error handling
- Supports incremental compilation optimizations

#### **CLI Interface** (`cli.ts`)

- Implements Commander.js-based command structure
- Provides argument parsing and validation
- Handles user input sanitization
- Manages command execution flow

#### **Interactive Prompts** (`prompts.ts`)

- Provides intelligent target platform selection
- Handles user preference collection
- Supports fallback mechanisms for automation

#### **Utilities** (`utils.ts`)

- Platform detection and validation
- File system operations and path management
- Directory cleaning and preparation
- Target platform compatibility checks

## 🛡️ Type Safety

The CLI is built with full TypeScript support and provides:

- **Strict Type Checking** - All operations are type-safe
- **Platform Validation** - Target platforms are validated at compile time
- **Argument Parsing** - Command arguments are strongly typed
- **Error Handling** - Comprehensive error types and handling

## 🚀 Performance Features

### ⚡ Concurrent Compilation

- Supports concurrent compilation processes
- Intelligent work distribution across available CPU cores
- Memory-efficient build process management

### 📊 Build Optimization

- Incremental compilation support
- Dependency caching (by `bun`)
- Source map generation options (by `bun`)
- Bytecode compilation for maximum performance (by `bun`)

### 🔍 Smart Defaults

- Automatic platform detection
- Intelligent target selection prompts
- Optimized default configurations
- Development-friendly settings

## 🔧 Development

### 📋 Scripts

```bash
# Type check the CLI source
bun run ts:check

# Clean build artifacts and dependencies
bun run clean
```

### 🧪 Testing the CLI

```bash
# Test basic compilation
tool-cli compile examples/hello.ts --current

# Test multi-target compilation
tool-cli compile examples/server.ts -t bun-darwin-arm64 bun-linux-x64
```

## 📚 Dependencies

### 🛠️ Core Dependencies

- **@commander-js/extra-typings** - Enhanced CLI framework with TypeScript support
- **@inquirer/prompts** - Interactive command line prompts
- **consola** - Beautiful console logging
- **defu** - Smart configuration merging

### ⚙️ Development Dependencies

- **@tool/tsconfig** - Shared TypeScript configurations
- **TypeScript** - Type checking and compilation
- **Bun Types** - Runtime type definitions

## 🤝 Contributing

When contributing to the CLI tool:

1. **Type Safety** - Ensure all new features are fully typed
2. **Error Handling** - Implement comprehensive error handling
3. **Performance** - Consider compilation performance impact
4. **Documentation** - Update this README for new features
5. **Testing** - Test across multiple platforms when possible

## 📄 License

This tool is part of the Turbo Base monorepo and follows the same license terms.
