# Task: Enforce Production Security Settings

## Goal
Align Django security configuration with production best practices to prevent common attack vectors.

## Prerequisites
- Completion of `01-environment-variables.md`.
- HTTPS termination available at the load balancer or reverse proxy.

## Steps
1. **Cookie Security Flags**
   - Set `SESSION_COOKIE_SECURE = True` and `CSRF_COOKIE_SECURE = True` in `django-rest-api/backend/backend/settings.py` when `DEBUG` is `False`.
   - Add `SESSION_COOKIE_SAMESITE = 'Lax'` and ensure CSRF cookies match expected settings for your SPA frontend.
2. **HSTS and SSL Proxy Headers**
   - Configure `SECURE_HSTS_SECONDS` (recommendation: `31536000`), `SECURE_HSTS_INCLUDE_SUBDOMAINS = True`, and `SECURE_HSTS_PRELOAD = True` for production environments.
   - If behind a proxy, set `SECURE_PROXY_SSL_HEADER = ('HTTP_X_FORWARDED_PROTO', 'https')` and confirm the proxy forwards the header.
3. **Frame and Content Security Policies**
   - Enable `X_FRAME_OPTIONS = 'DENY'` unless iframe embedding is required.
   - Define a CSP via middleware or reverse proxy if applicable; document decisions.
4. **Django `check --deploy` Compliance**
   - After applying changes, run `python manage.py check --deploy` and resolve any remaining warnings related to security configuration.
