# Build stage
FROM node:20-alpine AS builder

WORKDIR /app

# Declare build argument for API key
ARG VITE_API_KEY

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy source code
COPY . .

# Set environment variable for build (Vite requires VITE_ prefix)
ENV VITE_API_KEY=${VITE_API_KEY}

# Build the application
RUN npm run build

# Production stage
FROM node:20-alpine

WORKDIR /app

# Copy built files from builder
COPY --from=builder /app/dist ./dist

# Copy server file
COPY server.mjs ./

# Install only express for the server
RUN npm install express

# Expose port
EXPOSE 3000

# Start the application with our custom server
CMD ["node", "server.mjs"]
