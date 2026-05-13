# syntax=docker/dockerfile:1.7

FROM oven/bun:1.2.10-alpine AS builder
WORKDIR /app

COPY package.json bun.lock bunfig.toml ./
RUN bun install --frozen-lockfile

COPY tsconfig.json bun-env.d.ts ./
COPY scripts ./scripts
COPY src ./src

RUN bun run build

FROM nginx:1.27-alpine AS runtime
COPY docker/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
