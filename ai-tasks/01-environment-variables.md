# Task: Harden Critical Environment Variables

## Goal
Ensure all sensitive Django settings for the backend container are sourced from Dokploy-managed environment variables exposed via `docker-compose.prod.yml`.

## Prerequisites
- Access to Dokploy environment configuration for the `backend` service.
- Ability to edit `django-rest-api/backend/backend/settings.py` when defaults need tightening.

## Steps
1. **Populate Dokploy Variables**
   - In Dokploy, define values for `SECRET_KEY`, `DEBUG`, `ALLOWED_HOSTS`, `CSRF_TRUSTED_ORIGINS`, and `CORS_ALLOWED_ORIGINS` to override the defaults specified in `docker-compose.prod.yml`.
   - Use production domains (e.g., `api.example.com`) and disable debug (`DEBUG=0`).
2. **Harden Settings Fallbacks**
   - Update `django-rest-api/backend/backend/settings.py` so production-critical values fail fast when not provided (e.g., raise an exception if `SECRET_KEY` still equals the development placeholder while `DEBUG` is false).
3. **Document Runtime Expectations**
   - Record the required variable names and formats in .env-example in django-rest-api folder so future Dokploy deployments supply the same contract.
4. **Runtime Verification**
   - Deploy a staging stack through Dokploy with only the Dokploy-provided variables and confirm Django starts without relying on hard-coded fallbacks.
