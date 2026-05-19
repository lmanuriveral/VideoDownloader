FROM node:20-slim AS base

# Instalar dependencias del sistema
RUN apt-get update && apt-get install -y \
    python3 python3-pip ffmpeg curl \
    && pip3 install --break-system-packages yt-dlp \
    && apt-get clean && rm -rf /var/lib/apt/lists/*

WORKDIR /app

# Stage de dependencias
FROM base AS deps
COPY package*.json ./
RUN npm ci --only=production

# Stage de build
FROM base AS builder
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# Stage final
FROM base AS runner
COPY --from=deps /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist

RUN mkdir -p /app/temp && chmod 755 /app/temp

EXPOSE 3001
CMD ["node", "dist/main.js"]