# 1. Builder stage
FROM node:20-alpine AS builder

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install

COPY . .

# Build Next.js app
RUN npm run build

# 2. Runner stage
FROM node:20-alpine AS runner

WORKDIR /app

# Copy the standalone build
COPY --from=builder /app/.next/standalone ./ 
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/public ./public
COPY --from=builder /app/package.json ./package.json

# Expose port (Next.js defaults to 3000)
EXPOSE 3000

CMD ["node", "server.js"]

