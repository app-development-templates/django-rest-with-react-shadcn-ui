# WhiteNoise Static File Serving

This Django project is configured to use WhiteNoise for serving static files in both development and production environments.

## Configuration

WhiteNoise has been configured in `backend/settings.py` with the following settings:

### Key Settings

- **STATICFILES_STORAGE**: `whitenoise.storage.CompressedManifestStaticFilesStorage`
  - Enables compression and cache-busting for static files
  - Automatically generates manifest files for asset versioning

- **WHITENOISE_USE_FINDERS**: `True`
  - Allows WhiteNoise to serve static files directly from source directories in development
  - Eliminates the need to run `collectstatic` during development

- **WHITENOISE_AUTOREFRESH**: `DEBUG`
  - Auto-refreshes static files in development mode
  - Disabled in production for better performance

- **WHITENOISE_MAX_AGE**: `31536000` in production, `0` in development
  - Sets cache headers for static files (1 year in production)
  - No caching in development for easier debugging

## Static File Directories

1. **STATIC_ROOT**: `backend/staticfiles/`
   - Where `collectstatic` places all collected static files
   - Used by WhiteNoise to serve files in production

2. **STATICFILES_DIRS**: `backend/static/`
   - Additional directory for project-level static files
   - Files here are collected into STATIC_ROOT during deployment

3. **App Static Files**: Each Django app can have its own `static/` directory
   - Automatically discovered by Django's static file finders

## How It Works

### Development Mode (DEBUG=True)
- WhiteNoise serves static files directly from source directories
- No need to run `collectstatic` manually
- Files are served without compression or caching for easier development
- Static file changes are automatically detected

### Production Mode (DEBUG=False)
- Static files are collected using `collectstatic` during deployment
- WhiteNoise serves compressed and versioned static files
- Files are cached for 1 year with proper cache-busting
- Optimized for performance and CDN compatibility

## Middleware Configuration

WhiteNoise middleware is configured in `MIDDLEWARE` setting:

```python
MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'whitenoise.middleware.WhiteNoiseMiddleware',  # Must be after SecurityMiddleware
    # ... other middleware
]
```

## Docker Integration

Both development and production Docker configurations include:

```bash
python manage.py collectstatic --noinput
```

This ensures static files are properly collected before the application starts.

## Benefits

1. **Simplified Deployment**: No need for separate web server to serve static files
2. **Performance**: Compressed files with proper caching headers
3. **Development Friendly**: No collectstatic required during development
4. **Cache Busting**: Automatic versioning prevents stale cache issues
5. **Security**: Proper security headers for static files

## Testing WhiteNoise

To verify WhiteNoise is working correctly:

1. **Development**: Start the development server and verify static files load
2. **Production**: Check that static files are served with proper cache headers
3. **Admin Interface**: Verify Django admin CSS/JS files load correctly

## File Structure

```
backend/
├── static/                 # Project-level static files
│   └── css/
│       └── project.css
├── staticfiles/           # Collected static files (generated)
├── api/
│   └── static/           # App-level static files (if any)
└── backend/
    └── settings.py       # WhiteNoise configuration
```

## Environment Variables

WhiteNoise behavior is automatically adjusted based on:
- `DEBUG`: Controls auto-refresh and caching behavior
- No additional environment variables required for basic usage

## Troubleshooting

If static files are not loading:

1. Check that WhiteNoise middleware is properly configured
2. Verify `STATIC_URL` and `STATIC_ROOT` settings
3. Ensure `collectstatic` runs successfully in production
4. Check browser developer tools for 404 errors on static file requests