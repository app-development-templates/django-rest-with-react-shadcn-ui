# Use Node.js 20 alpine image
FROM node:20-alpine

# Set working directory
WORKDIR /app

# Set environment variables to handle file watching
ENV CHOKIDAR_USEPOLLING=true \
	CHOKIDAR_INTERVAL=1000 \
	WATCHPACK_POLLING=true

# Copy package.json and package-lock.json (if available)
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy project files
COPY . .

# Set Vite API URL environment variable
ENV VITE_API_URL="http://localhost:8000"

# Expose port
EXPOSE 3000

# For production, use nginx to serve static files
# For development, use Vite dev server with polling enabled
CMD ["npm", "run", "dev"]