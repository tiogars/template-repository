# ── Stage 1 : build the React/Vite app ──────────────────────────────────────
FROM node:20-alpine AS builder

WORKDIR /app

# Install pnpm and project dependencies first (layer cache)
RUN corepack enable && corepack prepare pnpm@latest --activate
COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

# Copy source and build
COPY . .
RUN pnpm build

# ── Stage 2 : serve the static build with nginx ──────────────────────────────
FROM nginx:1.27-alpine

# Copy the compiled assets
COPY --from=builder /app/dist /usr/share/nginx/html

# Optional: replace the default nginx config (SPA routing support)
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
