FROM oven/bun:1.2.18-alpine AS base
WORKDIR /app
COPY package.json .
RUN apk add --no-cache libc6-compat && \
  TURBO_VERSION=$(sed -n 's/.*"turbo": *"\([^"]*\)".*/\1/p' package.json) && \
  bun install -g turbo@$TURBO_VERSION

# ==============================================================================

FROM base AS source
COPY . .
RUN turbo prune @app/web --docker

# ==============================================================================

FROM base AS dependencies
COPY --from=source /app/out/json/ .
RUN --mount=type=cache,id=bun-pm,target=/root/.bun/install/cache \
  bun install --frozen-lockfile --ignore-scripts

# ==============================================================================

FROM base AS build
COPY --from=dependencies /app/ .
COPY --from=source /app/out/full/ .
RUN --mount=type=secret,id=TURBO_API \
  --mount=type=secret,id=TURBO_TEAM \
  --mount=type=secret,id=TURBO_TOKEN \
  set -euo pipefail && \
  bun install --frozen-lockfile --ignore-scripts && \
  export TURBO_API="$(cat /run/secrets/TURBO_API)" && \
  export TURBO_TEAM="$(cat /run/secrets/TURBO_TEAM)" && \
  export TURBO_TOKEN="$(cat /run/secrets/TURBO_TOKEN)" && \
  export TURBO_REMOTE_CACHE_SIGNATURE_KEY="$TURBO_TOKEN" && \
  turbo build --filter=@app/web...

# ==============================================================================

FROM oven/bun:1.2.18-alpine
WORKDIR /app
ENV DO_NOT_TRACK='1' \
  NODE_ENV='production' \
  PORT='3000'
COPY --from=build --chown=bun:bun \
  /app/apps/web/.output/ .
USER bun
EXPOSE ${PORT}
CMD ["bun", "--bun", "server/index.mjs"]
