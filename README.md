# 🚀 Turbo Base

<p align="center">
  <img alt="Turbo Base" src="https://img.shields.io/badge/monorepo-technology%20showcase-blue?style=for-the-badge" />
  <img alt="Bun" src="https://img.shields.io/badge/runtime-bun-orange?style=for-the-badge&logo=bun" />
  <img alt="TypeScript" src="https://img.shields.io/badge/language-typescript-blue?style=for-the-badge&logo=typescript" />
  <img alt="License" src="https://img.shields.io/badge/license-MIT-green?style=for-the-badge" />
</p>

<p align="center">
  <strong>A modern monorepo technology showcase demonstrating high-performance tools and development practices</strong>
</p>

---

## 📖 Table of Contents

- [🌟 Overview](#-overview)
- [🏗️ Architecture](#️-architecture)
- [🛠️ Tech Stack](#️-tech-stack)
- [📦 Project Structure](#-project-structure)
- [🚀 Quick Start](#-quick-start)
- [🔧 Development](#-development)
- [📱 Applications](#-applications)
- [📚 Packages](#-packages)
- [🛠️ Tools](#️-tools)
- [⚙️ Configuration](#️-configuration)
- [🐳 Docker & Deployment](#-docker--deployment)
- [🚀 CI/CD Pipeline](#-cicd-pipeline)
- [🧪 Scripts](#-scripts)
- [🤝 Contributing](#-contributing)
- [📄 License](#-license)

## 🌟 Overview

Turbo Base is a cutting-edge monorepo template that showcases modern development practices and high-performance tools. Built with developer experience in mind, it demonstrates the power of combining the latest technologies in a scalable, maintainable architecture.

### Key Features

- ⚡ **Ultra-fast development** with Bun runtime and hot reload
- 🏗️ **Turborepo orchestration** with intelligent caching, task pipelines, and remote caching
- 🎯 **TypeScript-first** with strict type safety across the entire stack
- 🎨 **Modern UI** with React 19, TanStack Router, and Tailwind CSS
- 🔄 **Automated workflows** with Git hooks, CI/CD, and dependency management
- 📦 **Monorepo architecture** with shared packages and consistent tooling
- 🛠️ **Developer experience** with VS Code integration and comprehensive tooling
- 📋 **Code quality** with Biome, TypeScript, Commitlint, and automated checks
- 🐳 **Container-ready** with optimized Docker builds and multi-stage production images
- 🚀 **Production deployment** with GitHub Actions CI/CD and container orchestration

## 🏗️ Architecture

```text
┌─────────────────────────────────────────────────────┐
│                   Turbo Base                        │
├─────────────────────────────────────────────────────┤
│  🚀 Apps           📚 Packages        🛠️ Tools      │
│  ├── api          ├── ui             ├── cli        │
│  └── web          └── shared         ├── tailwind   │
│                                      └── tsconfig   │
└─────────────────────────────────────────────────────┘
```

This monorepo follows a clean separation of concerns:

- **Apps**: Standalone applications (API & Web)
- **Packages**: Shared libraries and components
- **Tools**: Development utilities and configurations

## 🛠️ Tech Stack

### Core Technologies

- **[Bun](https://bun.sh/)** - Ultra-fast JavaScript runtime, package manager, and bundler
- **[Turborepo](https://turbo.build/)** - High-performance build system with intelligent caching, parallel execution, task pipelines, and remote cache sharing
- **[TypeScript](https://www.typescriptlang.org/)** - Type-safe JavaScript with advanced features and strict configuration

### Frontend

- **[React 19](https://react.dev/)** - Latest React with concurrent features
- **[TanStack Start](https://tanstack.com/start)** - Full-stack React framework
- **[TanStack Router](https://tanstack.com/router)** - Type-safe routing
- **[Tailwind CSS](https://tailwindcss.com/)** - Utility-first CSS framework
- **[Vite](https://vitejs.dev/)** - Next-generation frontend tooling

### Backend

- **[Elysia](https://elysiajs.com/)** - Fast and type-safe web framework for Bun
- **[Swagger](https://swagger.io/)** - API documentation and testing

### Development Tools

- **[Biome](https://biomejs.dev/)** - Fast formatter, linter, and import organizer
- **[Lefthook](https://github.com/evilmartians/lefthook)** - Git hooks manager for automated quality checks
- **[Commitlint](https://commitlint.js.org/)** - Conventional commit message linting
- **[CSpell](https://cspell.org/)** - Code spell checker for multiple languages
- **[Knip](https://knip.dev/)** - Unused dependencies and dead code detector
- **[Renovate](https://renovatebot.com/)** - Automated dependency updates

## 📦 Project Structure

```text
turbo-base/
├── 📱 apps/                    # Applications
│   ├── api/                    # Elysia/Bun backend API
│   │   ├── src/
│   │   │   ├── main.ts         # Application entry point
│   │   │   ├── libs/           # API libraries (swagger, etc.)
│   │   │   ├── modules/        # Feature modules (ping, etc.)
│   │   │   └── utils/          # Utilities (env, etc.)
│   │   ├── Dockerfile          # Container configuration
│   │   └── package.json
│   └── web/                    # React 19 frontend application
│       ├── src/
│       │   ├── components/     # React components
│       │   ├── routes/         # TanStack Router routes
│       │   ├── lib/            # Utilities and configurations
│       │   └── assets/         # Static assets
│       ├── Dockerfile          # Container configuration
│       └── package.json
├── 📚 packages/                # Shared packages
│   ├── ui/                     # Shared UI components
│   │   ├── src/
│   │   │   ├── button.tsx      # Button component
│   │   │   ├── theme.tsx       # Theme utilities
│   │   │   └── index.ts        # Package exports
│   │   └── package.json
│   └── shared/                 # Shared utilities (WIP)
│       └── package.json
├── 🛠️ tools/                   # Development tools
│   ├── cli/                    # Project CLI tool
│   ├── tailwind/               # Shared Tailwind configurations
│   └── tsconfig/               # Shared TypeScript configurations
├── ⚙️ .config/                 # Configuration files
│   ├── commitlintrc.yaml       # Commit message linting rules
│   ├── knip.json               # Unused dependencies configuration
│   └── lefthook.yaml           # Git hooks configuration
├── 🏢 .vscode/                 # VS Code workspace settings
│   ├── cspell.json             # Spell check configuration
│   ├── extensions.json         # Recommended extensions
│   └── settings.json           # Editor configuration
├── 🚀 .github/                 # GitHub workflows and automation
│   ├── workflows/
│   │   └── ci.yml              # CI/CD pipeline
│   ├── scripts/
│   │   └── prepare.sh          # Build preparation script
│   └── renovate.json           # Dependency update configuration
├── 🐳 Deployment files         # Container and deployment
│   ├── .dockerignore           # Docker ignore patterns
│   ├── .env.sample             # Environment variables template
│   └── .env                    # Local environment (gitignored)
├── biome.json                  # Code formatting and linting
├── turbo.json                  # Turborepo configuration
└── package.json               # Root package.json with workspaces
```

## 🚀 Quick Start

### Prerequisites

- **[Bun](https://bun.sh/)** >= 1.2.17
- **Node.js** >= 18 (for compatibility)
- **Git** for version control

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/ismoiliy98/turbo-base.git
   cd turbo-base
   ```

2. **Install dependencies**

   ```bash
   bun install
   ```

3. **Start development**

   ```bash
   bun dev
   ```

This will start:

- 🌐 **Web app** at `http://localhost:3001`
- 🔌 **API server** at `http://localhost:3000`
- 📚 **API docs** at `http://localhost:3000/api/docs`

## 🔧 Development

### Available Scripts

| Script | Description |
|--------|-------------|
| `bun dev` | Start all apps in development mode |
| `bun run build` | Build all apps for production |
| `bun ts:check` | Type-check all TypeScript files |
| `bun biome:check` | Check code formatting and linting |
| `bun biome:fix` | Fix code formatting and linting issues |
| `bun clean` | Clean build artifacts and node_modules |
| `bun packages:check` | Verify package dependencies |

### Code Quality

This project maintains high code quality standards:

- **TypeScript** for type safety
- **Biome** for fast formatting and linting
- **Conventional commits** for clear commit messages
- **Git hooks** for automated quality checks

### Development Workflow

1. **Create a feature branch**

   ```bash
   git checkout -b feature/amazing-feature
   ```

2. **Make your changes**
   - Follow TypeScript best practices
   - Use conventional commit messages
   - Ensure lints pass

3. **Commit and push**

   ```bash
   git add .
   git commit -m "feat: add amazing feature"
   git push origin feature/amazing-feature
   ```

## 📱 Applications

### 🔌 API (`apps/api`)

A high-performance backend API built with Elysia and Bun.

**Features:**

- ⚡ Elysia framework for ultra-fast performance
- 📖 Auto-generated Swagger documentation
- 🏗️ Modular architecture with services
- 🔧 Environment-based configuration
- 🧪 Built-in health checks

**Quick start:**

```bash
cd apps/api
bun dev
```

[📖 Read more](./apps/api/README.md)

### 🌐 Web (`apps/web`)

A modern React application with cutting-edge features.

**Features:**

- ⚛️ React 19 with latest features
- 🛣️ Type-safe routing with TanStack Router
- 🎨 Tailwind CSS for styling
- 🌙 Dark/light theme support
- 📱 Responsive design
- ⚡ Hot reload development

**Quick start:**

```bash
cd apps/web
bun dev
```

[📖 Read more](./apps/web/README.md)

## 📚 Packages

### 🎨 UI (`packages/ui`)

Shared UI components and utilities for consistent design across applications.

**Components:**

- `Button` - Customizable button component
- `ThemeToggle` - Theme switching component

**Utilities:**

- `cn` - Class name utility
- `pxToRem` / `remToPx` - Unit conversion helpers

[📖 Read more](./packages/ui/README.md)

### 🔗 Shared (`packages/shared`)

Common utilities and types shared across the monorepo (Work in Progress).

[📖 Read more](./packages/shared/README.md)

## 🛠️ Tools

### 💻 CLI (`tools/cli`)

A powerful command-line interface for project automation and development workflows.

**Features:**

- 📦 Project scaffolding
- 🔧 Development automation
- 🎯 Target-specific operations
- 🚀 Bun/Elysia project support

[📖 Read more](./tools/cli/README.md)

### 🎨 Tailwind (`tools/tailwind`)

Shared Tailwind CSS configurations for consistent styling across platforms.

**Configurations:**

- `base` - Core Tailwind setup
- `web` - Web-specific enhancements
- `mobile` - Mobile-optimized settings

[📖 Read more](./tools/tailwind/README.md)

### ⚙️ TypeScript (`tools/tsconfig`)

Centralized TypeScript configurations for different environments and use cases.

**Configurations:**

- `base` - Core TypeScript setup
- `react` - React-specific settings
- `bun` - Bun runtime optimizations

[📖 Read more](./tools/tsconfig/README.md)

## ⚙️ Configuration

The monorepo includes comprehensive configuration for development tools and workflows:

### 📝 Code Quality & Standards

- **`.config/commitlintrc.yaml`** - Enforces conventional commit messages
- **`.config/lefthook.yaml`** - Git hooks for automated quality checks
- **`.config/knip.json`** - Dead code and unused dependencies detection
- **`biome.json`** - Fast formatting, linting, and import organization

### 🎯 VS Code Integration

- **`.vscode/settings.json`** - Optimized editor settings for the tech stack
- **`.vscode/extensions.json`** - Recommended extensions for the best development experience
- **`.vscode/cspell.json`** - Spell checking configuration supporting multiple languages

### 🔄 Automation & Workflows

- **`.github/workflows/ci.yml`** - Comprehensive CI/CD pipeline
- **`.github/renovate.json`** - Automated dependency updates
- **`.github/scripts/`** - Custom scripts for build preparation

### 🌍 Environment Management

- **`.env.sample`** - Template for environment variables
- **`turbo.json`** - Build orchestration and caching configuration

## 🐳 Docker & Deployment

### Container Architecture

Each application includes optimized Docker configurations for production deployment:

**Multi-stage Build Process:**

1. **Base Stage** - Bun runtime with Turbo CLI installation
2. **Source Stage** - Dependency pruning with `turbo prune`
3. **Dependencies Stage** - Cached dependency installation
4. **Build Stage** - Application compilation with remote cache integration
5. **Production Stage** - Minimal runtime image with security optimizations

### Docker Features

- **🏗️ Turbo Pruning** - Only includes necessary dependencies for each app
- **📦 Layer Caching** - Optimized Docker layer caching for faster builds
- **🔒 Security** - Non-root user execution and minimal attack surface
- **⚡ Performance** - Multi-architecture builds (AMD64/ARM64)
- **🔗 Remote Cache** - Integration with Turbo's remote caching system

### Deployment Commands

Build and run containers locally:

```bash
# Build API container
docker build -f apps/api/Dockerfile -t turbo-base-api .

# Build Web container  
docker build -f apps/web/Dockerfile -t turbo-base-web .

# Run containers
docker run -p 3000:3000 turbo-base-api
docker run -p 3001:3000 turbo-base-web
```

### Production Considerations

- **Environment Variables** - Secure secret management in CI/CD
- **Health Checks** - Built-in application health monitoring
- **Horizontal Scaling** - Stateless application design
- **Container Registry** - GitHub Container Registry (ghcr.io) integration

## 🚀 CI/CD Pipeline

### Automated Workflows

The CI/CD pipeline provides comprehensive automation for code quality, testing, and deployment:

### 🔍 Quality Assurance

**Parallel Linting & Checks:**

- **Package Management** - Dependency validation and sorting
- **Knip Analysis** - Unused dependencies and dead code detection  
- **TypeScript** - Type checking across all packages
- **Biome** - Code formatting and linting validation

### 🏗️ Build & Release Process

**Intelligent Build Strategy:**

- **Affected Detection** - Only builds changed applications using Turbo's change detection
- **Multi-platform Builds** - AMD64 and ARM64 architecture support
- **Remote Caching** - Shared build cache across CI runs and developers
- **Container Registry** - Automatic pushes to GitHub Container Registry

### 🎯 Pipeline Features

- **Branch-based Workflows** - Different strategies for `main`, `stage`, and `test` branches
- **Manual Triggers** - Force build and release options via workflow dispatch
- **Concurrent Safety** - Automatic cancellation of outdated pipeline runs
- **Security** - Secure secret handling for Turbo remote cache and registries

### 📊 Pipeline Configuration

```yaml
# Trigger conditions
on:
  push: [main, stage, test]
  pull_request: [main, stage, test]
  workflow_dispatch: # Manual trigger options
```

### 🔐 Environment Variables

Required secrets for full pipeline functionality:

- `TURBO_API` - Remote cache API endpoint
- `TURBO_TOKEN` - Remote cache authentication
- `GITHUB_TOKEN` - Container registry access

## 🧪 Scripts

The monorepo provides several scripts for common development tasks:

### Build & Development

```bash
bun dev          # Start development servers
bun run build    # Build all applications
bun clean        # Clean build artifacts
```

### Quality Assurance

```bash
bun biome:check  # Check formatting and linting
bun biome:fix    # Auto-fix issues
bun ts:check     # Type-check TypeScript
```

### Package Management

```bash
bun packages:check  # Verify dependencies
bun packages:fix    # Fix dependency issues
bun packages:sort   # Sort package.json files
```

### Utilities

```bash
bun ui:add       # Add UI components
bun knip:check   # Check for unused dependencies
```

## 🤝 Contributing

We welcome contributions! Please see our [contributing guidelines](./CONTRIBUTING.md) for details.

### Development Setup

1. Fork the repository
2. Clone your fork
3. Install dependencies: `bun install`
4. Create a feature branch
5. Make your changes
6. Run tests and linting
7. Submit a pull request

### Code Standards

- Follow TypeScript best practices
- Use conventional commit messages
- Update documentation as needed

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](./LICENCE) file for details.

---

<p align="center">
  <strong>Built with ❤️ by <a href="https://ismoiliy.dev">Bekhzod Ismoiliy</a></strong>
</p>

<p align="center">
  <a href="#-table-of-contents">⬆️ Back to top</a>
</p>
