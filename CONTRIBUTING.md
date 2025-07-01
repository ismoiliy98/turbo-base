# Contributing to Turbo Base

Thank you for your interest in contributing to Turbo Base! This document provides guidelines and information for contributors to help maintain code quality and ensure a smooth development experience.

## 📖 Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Setup](#development-setup)
- [Development Workflow](#development-workflow)
- [Code Standards](#code-standards)
- [Commit Guidelines](#commit-guidelines)
- [Pull Request Process](#pull-request-process)
- [Project Structure](#project-structure)
- [Linting](#linting)
- [Documentation](#documentation)
- [Issues and Bug Reports](#issues-and-bug-reports)
- [Feature Requests](#feature-requests)
- [Release Process](#release-process)

## Code of Conduct

This project adheres to a code of conduct that we expect all contributors to follow. Please be respectful, inclusive, and professional in all interactions.

## Getting Started

### Prerequisites

Before contributing, ensure you have the following installed:

- **[Bun](https://bun.sh/)** >= 1.2.17
- **Node.js** >= 18 (for compatibility)
- **Git** for version control
- **Docker** (optional, for container testing)

### Development Setup

1. **Fork the repository**

   ```bash
   # Fork on GitHub, then clone your fork
   git clone https://github.com/YOUR_USERNAME/turbo-base.git
   cd turbo-base
   ```

2. **Add upstream remote**

   ```bash
   git remote add upstream https://github.com/ismoiliy98/turbo-base.git
   ```

3. **Install dependencies**

   ```bash
   bun install
   ```

4. **Verify setup**

   ```bash
   bun dev
   ```

   This should start both the API server and web application without errors.

## Development Workflow

### 1. Create a Feature Branch

Always create a new branch for your work:

```bash
# Update your main branch
git checkout main
git pull upstream main

# Create and switch to a new feature branch
git checkout -b feature/your-feature-name
# or for bug fixes
git checkout -b fix/bug-description
```

### 2. Make Your Changes

- Follow the established code patterns and conventions
- Write clear, self-documenting code
- Add tests for new functionality
- Update documentation as needed

### 3. Commit Your Changes

We use [Conventional Commits](https://www.conventionalcommits.org/) for consistent commit messages:

```bash
git add .
git commit -m "feat: add new authentication module"
```

### 4. Push and Create Pull Request

```bash
git push origin feature/your-feature-name
```

Then create a pull request on GitHub with a clear description of your changes.

## Code Standards

### TypeScript

- Use strict TypeScript configuration
- Provide explicit types for function parameters and return values
- Avoid using `any` type
- Use proper type imports (`import type`)

```typescript
// Good
import type { User } from './types';

interface UserService {
  getUser(id: string): Promise<User>;
}

// Avoid
function getUser(id: any): any {
  // ...
}
```

### Code Style

We use [Biome](https://biomejs.dev/) for formatting and linting:

```bash
# Check formatting and linting
bun biome:check

# Auto-fix issues
bun biome:fix
```

### File Naming Conventions

- Use kebab-case for file names: `user-service.ts`
- Use PascalCase for component files: `UserProfile.tsx`
- Use camelCase for utility functions: `formatDate.ts`

### Import Organization

Biome automatically organizes imports, but follow this order:

1. Node.js built-ins
2. External packages
3. Internal packages (from workspace)
4. Relative imports

## Commit Guidelines

### Commit Message Format

```text
<type>(<scope>): <description>

[optional body]

[optional footer(s)]
```

### Types

- **feat**: New feature
- **fix**: Bug fix
- **docs**: Documentation changes
- **style**: Code style changes (formatting, etc.)
- **refactor**: Code refactoring
- **test**: Adding or updating tests
- **chore**: Maintenance tasks
- **ci**: CI/CD changes

### Scope

- **api**: Backend API changes
- **web**: Frontend application changes
- **ui**: UI package changes
- **cli**: CLI tool changes
- **config**: Configuration changes
- **deps**: Dependency updates

### Examples

```bash
feat(api): add user authentication endpoint
fix(web): resolve theme toggle issue
docs(readme): update installation instructions
chore(deps): update dependencies to latest versions
```

## Pull Request Process

### Before Submitting

1. **Run quality checks**

   ```bash
   bun biome:check
   bun ts:check
   bun packages:check
   ```

2. **Test your changes**

   ```bash
   bun dev  # Ensure everything starts correctly
   # Run any specific tests for your changes
   ```

3. **Update documentation**
   - Update README.md if needed
   - Update relevant package README files

### Pull Request Template

When creating a pull request, include:

- **Description**: Clear explanation of what changes were made
- **Motivation**: Why these changes are needed
- **Testing**: How the changes were tested
- **Screenshots**: For UI changes
- **Breaking Changes**: Note any breaking changes

### Review Process

1. **Automated Checks**: All CI checks must pass
2. **Code Review**: At least one maintainer review required
3. **Testing**: Manual testing may be required for significant changes
4. **Documentation**: Ensure documentation is updated

## Project Structure

### Apps

- **`apps/api/`**: Backend API built with Elysia
- **`apps/web/`**: Frontend React application

### Packages

- **`packages/ui/`**: Shared UI components
- **`packages/shared/`**: Common utilities and types

### Tools

- **`tools/cli/`**: Command-line interface
- **`tools/tailwind/`**: Tailwind CSS configurations
- **`tools/tsconfig/`**: TypeScript configurations

### Configuration

- **`.config/`**: Tool configurations
- **`.vscode/`**: VS Code settings
- **`.github/`**: GitHub workflows and automation

## Linting

### Running Lints

```bash
# Type checking
bun ts:check

# Linting and formatting
bun biome:check

# Package validation
bun packages:check

# Dead code detection
bun knip:check
```

## Documentation

### Code Documentation

- Include examples in documentation
- Keep documentation up to date with code changes

### README Updates

When making significant changes:

1. Update the relevant package README
2. Update the main README if needed
3. Include clear examples and usage instructions

## Issues and Bug Reports

### Before Creating an Issue

1. Search existing issues to avoid duplicates
2. Check if the issue exists in the latest version
3. Try to reproduce the issue consistently

### Bug Report Template

- **Environment**: OS, Bun version, browser (if applicable)
- **Steps to Reproduce**: Clear, numbered steps
- **Expected Behavior**: What should happen
- **Actual Behavior**: What actually happens
- **Additional Context**: Screenshots, logs, etc.

## Feature Requests

### Before Requesting a Feature

1. Check if the feature already exists
2. Search existing feature requests
3. Consider if the feature fits the project's scope

### Feature Request Template

- **Problem**: What problem does this solve?
- **Solution**: Proposed solution
- **Alternatives**: Alternative solutions considered
- **Additional Context**: Use cases, examples, etc.

## Release Process

### Versioning

This project follows [Semantic Versioning](https://semver.org/):

- **MAJOR**: Breaking changes
- **MINOR**: New features (backward compatible)
- **PATCH**: Bug fixes (backward compatible)

### Release Workflow

1. Changes are merged to `main` branch
2. CI/CD pipeline runs automatically
3. Docker images are built and pushed
4. Release notes are generated

## Getting Help

### Community Support

- **GitHub Discussions**: For questions and community interaction
- **Issues**: For bug reports and feature requests
- **Pull Requests**: For code contributions

### Maintainer Contact

For urgent issues or security concerns, contact the maintainers directly.

## Recognition

Contributors are recognized in:

- GitHub contributors list
- Release notes for significant contributions
- Special recognition for outstanding contributions

---

Thank you for contributing to Turbo Base! Your contributions help make this project better for everyone.
