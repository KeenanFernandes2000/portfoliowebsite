# syntax=docker/dockerfile:1
# Multi-stage build for the Next.js 16 (standalone) portfolio.
# deps + build run on Bun (matches bun.lock); runtime is a minimal Node image.

# ---- deps: install dependencies with Bun ----
FROM oven/bun:1.3-alpine AS deps
WORKDIR /app
COPY package.json bun.lock ./
RUN bun install --frozen-lockfile

# ---- builder: produce .next/standalone ----
FROM oven/bun:1.3-alpine AS builder
WORKDIR /app
ENV NEXT_TELEMETRY_DISABLED=1
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN bun run build

# ---- runner: tiny production image serving the standalone server ----
FROM node:22-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production \
    NEXT_TELEMETRY_DISABLED=1 \
    PORT=3000 \
    HOSTNAME=0.0.0.0

# run as non-root
RUN addgroup -g 1001 -S nodejs && adduser -S nextjs -u 1001

# standalone bundles its own minimal node_modules + server.js
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
# static assets + public are NOT bundled into standalone — copy them in
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static
COPY --from=builder --chown=nextjs:nodejs /app/public ./public

USER nextjs
EXPOSE 3000
CMD ["node", "server.js"]
