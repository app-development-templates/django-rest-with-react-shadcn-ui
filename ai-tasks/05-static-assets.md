# Task: Finalize Static Asset Pipeline

## Goal
Prepare static files for production delivery via WhiteNoise or the edge CDN.

## Prerequisites
- Access to Docker build configuration for the backend service.

## Steps
1. **Audit Static Directories**
   - Confirm all static assets live under `django-rest-api/backend/static/` or app-specific `static/` folders.
   - Remove the committed `django-rest-api/backend/staticfiles/` directory from source control; rely on build output instead.
2. **Build Step Integration**
   - Add `python manage.py collectstatic --noinput` to the production image build or deployment pipeline.
   - Ensure the build environment provides necessary env vars (e.g., `DATABASE_URL` if storage backends require it).
3. **WhiteNoise Verification**
   - Confirm `STATICFILES_STORAGE = 'whitenoise.storage.CompressedManifestStaticFilesStorage'` remains in `settings.py`.
   - Run the app locally with `DEBUG=False` to ensure static files are served correctly.
4. **CDN/Proxy Configuration**
   - If serving static assets through a CDN or reverse proxy, document cache headers and invalidation process.
   - Validate that `WHITENOISE_MAX_AGE` matches the CDN caching policy.
