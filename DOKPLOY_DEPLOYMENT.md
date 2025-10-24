# Dokploy Deployment Guide

This guide provides instructions for deploying the training management system to Dokploy.

## Issues Fixed

The original deployment failed due to several issues that have been resolved:

1. **Port Conflicts**: Fixed hardcoded port mappings that conflicted with existing services
2. **Environment Configuration**: Added proper environment variable management for production
3. **Database Access**: Removed external database port exposure for security
4. **CORS Settings**: Made CORS configuration environment-based
5. **Security Settings**: Added proper Django security configuration

## Deployment Options

### Option 1: Using Production Docker Compose (Recommended)

Use the `docker-compose.prod.yml` file which is optimized for Dokploy:

1. In Dokploy, create a new application
2. Set the repository URL: `https://github.com/app-development-templates/django-rest-with-react-shadcn-ui.git`
3. Set the docker-compose file path: `docker-compose.prod.yml`
4. Configure environment variables (see below)
5. Deploy

### Option 2: Using Standard Docker Compose

Use the updated `docker-compose.yml` which now supports environment-based port configuration:

1. In Dokploy, create a new application
2. Set the repository URL: `https://github.com/app-development-templates/django-rest-with-react-shadcn-ui.git`
3. Use the default `docker-compose.yml`
4. Configure environment variables (see below)
5. Deploy

## Required Environment Variables

Configure these in Dokploy's environment variables section:

```bash
# Database Configuration
DB_NAME=postgres
DB_USER=postgres
DB_PASSWORD=your-secure-password

# Application Security
DEBUG=0
SECRET_KEY=your-very-secure-random-secret-key-here
ALLOWED_HOSTS=*

# CORS Configuration
CORS_ALLOWED_ORIGINS=*

# API URL (Dokploy will set this automatically based on your domain)
VITE_API_URL=https://your-backend-domain.com
```

## Important Notes

1. **Database Password**: Change the default database password to something secure
2. **Secret Key**: Generate a new Django secret key for production
3. **Domain Configuration**: Update `VITE_API_URL` to match your actual backend domain
4. **CORS Origins**: In production, set `CORS_ALLOWED_ORIGINS` to your specific frontend domain instead of `*`

## Post-Deployment Steps

1. The application will automatically:
   - Wait for the database to be ready
   - Run database migrations
   - Collect static files
   - Create a default superuser (admin/admin)

2. Access your application:
   - Frontend: Your assigned frontend domain
   - Backend API: Your assigned backend domain
   - Admin panel: `https://your-backend-domain.com/admin/`

## Troubleshooting

If deployment fails:

1. Check Dokploy logs for specific error messages
2. Ensure all environment variables are set correctly
3. Verify that your domain configuration matches the CORS settings
4. Check that the database service starts successfully before the backend

## Security Recommendations

For production use:

1. Use a strong, unique `SECRET_KEY`
2. Set `DEBUG=0`
3. Configure specific `CORS_ALLOWED_ORIGINS` instead of using `*`
4. Use a secure database password
5. Set up proper SSL/TLS certificates through Dokploy
6. Regularly update dependencies and base images