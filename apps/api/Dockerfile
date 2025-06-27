FROM oven/bun:1.2.17-alpine AS base
WORKDIR /app
COPY package.json .
RUN apk add --no-cache libc6-compat && \
  TURBO_VERSION=$(sed -n 's/.*"turbo": *"\([^"]*\)".*/\1/p' package.json) && \
  bun i -g turbo@$TURBO_VERSION

# ==============================================================================

FROM base AS source
COPY . .
RUN turbo prune @app/api --docker

# ==============================================================================

FROM base AS dependencies
COPY --from=source /app/out/json/ .
RUN --mount=type=cache,id=bun-pm,target=/root/.bun/install/cache \
  bun i --frozen-lockfile --ignore-scripts

# ==============================================================================

FROM base AS build
ARG APP_NAME
COPY --from=dependencies /app/ .
COPY --from=source /app/out/full/ .
RUN bun i --frozen-lockfile --ignore-scripts && \
  turbo build --filter=@app/api... -- --bytecode --minify --prefix='entry'

# ==============================================================================

FROM alpine:3.22.0
WORKDIR /app
ENV DO_NOT_TRACK='1' \
  NODE_ENV='production' \
  PORT='3000'
RUN apk add --no-cache libstdc++ && \
  addgroup --system --gid 1000 bun && adduser --system --uid 1000 bun
COPY --from=build --chown=bun:bun \
  /app/apps/api/dist/entry-bun-linux-arm64-musl ./entry
USER bun
EXPOSE ${PORT}
CMD ["./entry"]
