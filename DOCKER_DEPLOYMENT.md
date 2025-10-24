# Docker Deployment Guide

This guide explains how to deploy the Django REST API backend, React frontend, and PostgreSQL database locally using Docker Compose.

## Prerequisites

- Docker and Docker Compose installed on your system
- Git (to clone the repository)

## Quick Start

1. **Clone the repository and navigate to the root directory**:
   ```bash
   cd /home/alex/github-repos/app-development-templates
   ```

2. **Build and start all services**:
   ```bash
   docker-compose up --build
   ```

3. **Access the applications**:
   - **Frontend (React)**: http://localhost:3000
   - **Backend API (Django)**: http://localhost:8000
   - **Database (PostgreSQL)**: localhost:5432

## Services

### PostgreSQL Database
- **Version**: PostgreSQL 17 (Alpine Linux)
- **Port**: 5432
- **Database**: postgres
- **Username**: postgres
- **Password**: postgres
- **Data persistence**: Stored in Docker volume `postgres_data`

### Django Backend
- **Port**: 8000
- **Framework**: Django 5.2.7 with Django REST Framework
- **Authentication**: JWT with SimpleJWT
- **Database**: PostgreSQL (configured automatically)

### React Frontend
- **Port**: 3000
- **Framework**: React 19 with Vite
- **UI**: shadcn/ui components with Tailwind CSS
- **API Connection**: Automatically connects to backend at http://localhost:8000

## Development Commands

### Start services in detached mode
```bash
docker-compose up -d
```

### Stop all services
```bash
docker-compose down
```

### View logs
```bash
# All services
docker-compose logs

# Specific service
docker-compose logs backend
docker-compose logs frontend
docker-compose logs db
```

### Rebuild services after code changes
```bash
docker-compose up --build
```

### Run Django commands
```bash
# Create superuser
docker-compose exec backend python manage.py createsuperuser

# Run migrations
docker-compose exec backend python manage.py migrate

# Access Django shell
docker-compose exec backend python manage.py shell
```

### Access database
```bash
docker-compose exec db psql -U postgres -d postgres
```

## Environment Configuration

The `.env` file in the root directory contains the configuration for all services:

```env
# Database Configuration
DB_HOST=db
DB_PORT=5432
DB_NAME=postgres
DB_USER=postgres
DB_PASSWORD=postgres

# API Configuration
VITE_API_URL=http://localhost:8000
```

## File Structure

```
/
├── docker-compose.yml          # Main compose configuration
├── .env                       # Environment variables
├── django-rest-api/
│   ├── Dockerfile             # Django container configuration
│   ├── wait-for-db.sh        # Database readiness script
│   └── backend/               # Django application
└── react-shadcn-ui/
    ├── Dockerfile             # React container configuration
    └── src/                   # React application
```

## Troubleshooting

### Database connection issues
If you encounter database connection errors:
1. Ensure PostgreSQL service is running: `docker-compose logs db`
2. Check if the database is ready: `docker-compose exec db pg_isready -U postgres`

### Port conflicts
If ports are already in use, modify the ports in `docker-compose.yml`:
```yaml
ports:
  - "3001:3000"  # Change frontend port to 3001
  - "8001:8000"  # Change backend port to 8001
```

### Rebuilding after changes
When you make changes to the code:
```bash
docker-compose down
docker-compose up --build
```

## PostgreSQL Version Choice

We use **PostgreSQL 17-Alpine** for several production advantages:
- **Smaller footprint**: ~200MB smaller than standard images
- **Latest security patches**: Most up-to-date security fixes
- **Performance improvements**: Better query performance and memory usage
- **Alpine Linux**: Minimal, security-focused base image
- **Production-ready**: PostgreSQL 17 is stable and widely adopted

## Production Considerations

For production deployment, consider:
1. Set `DEBUG=False` in Django settings
2. Configure proper `ALLOWED_HOSTS`
3. Use environment-specific `.env` files
4. Set up proper volume mounts for static files
5. Configure reverse proxy (nginx) for serving static files
6. Use production-grade PostgreSQL configuration
7. Set up database backups and monitoring
8. Configure PostgreSQL performance tuning parameters