# 1. Builder stage
FROM node:20-alpine AS builder

WORKDIR /app

# RUN apk add --no-cache libc6-compat

COPY package.json package-lock.json ./
# COPY package.json package-lock.json* pnpm-lock.yaml* yarn.lock* ./

RUN npm install

COPY . .

# Set environment variable for NEXT_PUBLIC API
ARG NEXT_PUBLIC_API_URL
ENV NEXT_PUBLIC_API_URL=$NEXT_PUBLIC_API_URL

# Build Next.js app
RUN npm run build

# 2. Runner stage
FROM node:20-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production
ENV PORT=3000

# Copy the standalone build
COPY --from=builder /app/.next/standalone ./ 
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/public ./public
COPY --from=builder /app/package.json ./package.json

# Expose port (Next.js defaults to 3000)
EXPOSE 3000

CMD ["node", "server.js"]