# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Common Commands

All commands use **Bun** as the runtime and package manager. Run from the repo root unless noted.

```bash
# Development
bun dev                  # Start all apps in parallel (API: 3000, Web: 3001)
bun run build            # Build all apps via Turbo

# Type checking & linting
bun ts:check             # TypeScript check across all workspaces (Turbo affected)
bun biome:check          # Check formatting + linting (Biome)
bun biome:fix            # Auto-fix formatting + linting
bun knip:check           # Detect unused dependencies/exports
bun packages:check       # Validate package.json consistency (sort + sherif)

# Cleanup
bun clean                # Remove build artifacts and node_modules
bun clean:all            # Also wipe Turbo cache

# UI
bun ui:add               # Add shadcn components to @pkg/ui
```

**Running a single app:**
```bash
cd apps/api && bun run dev    # API only
cd apps/web && bun run dev    # Web only
```

## Architecture

### Monorepo Layout

```
apps/api       — Elysia (Bun) REST API, port 3000, Swagger docs at /api/docs
apps/web       — React 19 + TanStack Start (SSR), Vite, port 3001
packages/ui    — Shared Radix UI + Tailwind component library (@pkg/ui)
packages/shared — Placeholder for future shared utilities (@pkg/shared)
tools/cli      — Internal CLI for project automation and binary compilation (@tool/cli)
tools/tailwind — Shared Tailwind configs for web and mobile (@tool/tailwind-config)
tools/tsconfig — Shared TypeScript configs: base, react, bun (@tool/tsconfig)
```

### Dependency Catalog System

Root `package.json` uses Bun workspaces with **version catalogs** (`catalog:react`, `catalog:tooling`). When adding deps to an app/package, prefer referencing the catalog over pinning versions directly to keep versions synchronized.

### Turbo Pipeline

`turbo.json` defines task dependencies: `build` depends on `^build` (dependencies must build first). Remote caching is enabled — the CI uses `TURBO_API`, `TURBO_TOKEN`, and `TURBO_REMOTE_CACHE_SIGNATURE_KEY` secrets.

### API App (`apps/api`)

- **Elysia** framework on Bun runtime
- Modular structure: `/modules`, `/libs`, `/utils`
- Environment validation via `@yolk-oss/elysia-env`
- Compiled to a single binary for Docker via `@tool/cli`

### Web App (`apps/web`)

- **TanStack Start** for SSR with **TanStack Router** for file-based routing
- Uses `@pkg/ui` for components; Tailwind via `@tool/tailwind-config/web`
- Fonts: Geist + Geist Mono (variable)

### Code Quality

- **Biome** handles formatting (2-space, single quotes, LF) and linting — not ESLint/Prettier
- **Lefthook** runs pre-commit: spell check, Biome, Knip, and package sort
- **Commitlint** enforces conventional commits: `<type>(<scope>): <description>`
  - Valid types: `feat`, `fix`, `docs`, `style`, `refactor`, `test`, `chore`, `ci`
  - Valid scopes: `api`, `web`, `ui`, `cli`, `config`, `deps`

### CI/CD

The `.github/workflows/ci.yml` pipeline:
1. Runs lint checks in parallel (`ts:check`, `biome:check`, `knip:check`, `packages:check`)
2. Determines affected apps via `.github/scripts/prepare.sh` + Turbo
3. Builds multi-platform Docker images (`linux/amd64`, `linux/arm64`) and pushes to `ghcr.io`

Releases only happen on `main` when the app version changes.

### Package Naming Conventions

| Prefix | Meaning |
|--------|---------|
| `@app/*` | Deployable applications |
| `@pkg/*` | Shared packages consumed by apps |
| `@tool/*` | Development tooling (not shipped to production) |

Renovate is configured to skip `@pkg/*` updates (internal, managed manually) and group `@app/*` and `@tool/*` updates.
