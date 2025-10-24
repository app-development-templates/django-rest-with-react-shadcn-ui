#!/bin/bash

# Stop script for Docker deployment

set -e

echo "🛑 Stopping Docker services..."

# Stop all services
docker compose down

echo "✅ All services stopped successfully!"
echo ""
echo "💡 To start again, run: ./start.sh"
echo "🗑️  To remove volumes and clean up, run: docker compose down -v"