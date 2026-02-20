FROM oven/bun:1.3.9-alpine AS base
WORKDIR /app
COPY package.json .
RUN apk add --no-cache libc6-compat && \
  TURBO_VERSION=$(sed -n 's/.*"turbo": *"\([^"]*\)".*/\1/p' package.json) && \
  bun install -g turbo@$TURBO_VERSION

# ==============================================================================

FROM base AS source
COPY . .
RUN turbo prune @app/api --docker

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
  turbo build --filter=@app/api... -- --bytecode --minify --prefix='entry'

# ==============================================================================

FROM alpine:3.23.3
WORKDIR /app
ENV DO_NOT_TRACK='1' \
  NODE_ENV='production' \
  PORT='3000'
RUN apk add --no-cache libstdc++ && \
  addgroup --system --gid 1000 bun && adduser --system --uid 1000 bun
COPY --from=build --chown=bun:bun \
  /app/apps/api/dist/entry-* ./entry
USER bun
EXPOSE ${PORT}
CMD ["./entry"]
