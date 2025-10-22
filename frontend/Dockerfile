# Step 1 — Build stage
FROM node:24.10.0-alpine AS builder

WORKDIR /app

# Copy and install deps
COPY package*.json ./
RUN npm ci

# Copy app code
COPY . .

# Optional: set build-time env vars
# (Only if needed for build — like NEXT_PUBLIC_API_URL)
ARG NEXT_PUBLIC_API_URL
ENV NEXT_PUBLIC_API_URL=$NEXT_PUBLIC_API_URL

ARG NEXT_PUBLIC_API_BASE_URL
ENV NEXT_PUBLIC_API_BASE_URL=$NEXT_PUBLIC_API_BASE_URL

ARG NEXT_PUBLIC_LOGOUT_URL
ENV NEXT_PUBLIC_LOGOUT_URL=$NEXT_PUBLIC_LOGOUT_URL

ARG NEXT_PUBLIC_POST_LOGOUT_REDIRECT_URI
ENV NEXT_PUBLIC_POST_LOGOUT_REDIRECT_URI=$NEXT_PUBLIC_POST_LOGOUT_REDIRECT_URI

RUN npm run build

# Step 2 — Runtime stage
FROM node:24.10.0-alpine AS runner

WORKDIR /app
ENV NODE_ENV=production

# Copy build artifacts and deps
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/node_modules ./node_modules

# Runtime envs (set dynamically at container start)
# Example placeholders:
ENV PORT=3000

EXPOSE 3000
CMD ["npm", "run", "start"]
