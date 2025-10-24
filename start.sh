#!/bin/bash

# Quick start script for Docker deployment

set -e

echo "🚀 Starting Docker deployment..."

# Check if Docker is running
if ! docker info > /dev/null 2>&1; then
    echo "❌ Docker is not running. Please start Docker and try again."
    exit 1
fi

# Check if Docker Compose is available
if ! docker compose version &> /dev/null; then
    echo "❌ docker compose not found. Please install Docker Compose."
    exit 1
fi

echo "🔧 Building and starting services..."

# Build and start all services
docker compose up --build -d

echo "⏳ Waiting for services to start..."
sleep 10

# Check if services are running
echo "📊 Service Status:"
docker compose ps

echo ""
echo "✅ Deployment complete!"
echo ""
echo "🌐 Access your applications:"
echo "   Frontend (React): http://localhost:3000"
echo "   Backend (Django): http://localhost:8000"
echo "   API Documentation: http://localhost:8000/api/"
echo ""
echo "📝 Useful commands:"
echo "   View logs: docker compose logs"
echo "   Stop services: docker compose down"
echo "   Restart services: docker compose restart"
echo ""
echo "🔍 To create a Django superuser, run:"
echo "   docker compose exec backend python manage.py createsuperuser"