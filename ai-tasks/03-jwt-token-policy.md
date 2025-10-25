# Task: Reinstate JWT Token Lifetimes

## Goal
Match the JWT access and refresh token lifetimes to the security baseline defined in repository instructions.

## Prerequisites
- Familiarity with `django-rest-framework-simplejwt` settings in `settings.py`.

## Steps
1. **Update Token Lifetimes**
   - Open `django-rest-api/backend/backend/settings.py`.
   - Adjust `SIMPLE_JWT` to use `ACCESS_TOKEN_LIFETIME = timedelta(minutes=30)` and `REFRESH_TOKEN_LIFETIME = timedelta(days=1)`.
2. **Review Related SimpleJWT Settings**
   - Confirm other options (`ROTATE_REFRESH_TOKENS`, `BLACKLIST_AFTER_ROTATION`, etc.) match organizational policy; document deviations if required.
3. **Regression Testing**
   - Run the authentication test suite: `python manage.py test api.tests`.
   - Manually obtain and refresh tokens using existing API clients to verify expiry behavior.
4. **Communicate Change**
   - Notify frontend team of the reduced access token window so they can confirm silent refresh logic handles the 30-minute expiry.
