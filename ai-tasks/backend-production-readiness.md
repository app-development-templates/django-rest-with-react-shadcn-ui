1. Lock Down Runtime Configuration
	- [x] Convert `backend/backend/settings.py` into an environment-aware settings package (e.g. `settings/base.py`, `settings/production.py`) so production imports a profile that forces secure defaults.
	- [x] Remove the hard-coded fallback `SECRET_KEY` and raise `ImproperlyConfigured` whenever the variable is missing in production profiles.
	- [x] Collapse `DEBUG` and `DEBUG_MODE` into a single flag sourced from `ENVIRONMENT` (`development`/`production`) and fail fast if `DEBUG` is still `True` when `ENVIRONMENT=production`.

2. Require Explicit Host & Origin Whitelists
	- [x] Update `ALLOWED_HOSTS` in `backend/backend/settings.py` to reject `*`; load comma-separated hosts from `ALLOWED_HOSTS` and validate the list at boot time.
	- [x] Replace the `CORS_ALLOW_ALL_ORIGINS` path with `CORS_ALLOWED_ORIGINS` only; ingest these from `CORS_ALLOWED_ORIGINS` and error when unset in production.
	- [x] Add validation around `CSRF_TRUSTED_ORIGINS` to ensure schemes are present (`https://`), especially for Dokploy deployments.

3. Switch the Container Entry Point to Gunicorn
	- [x] Add a `gunicorn.conf.py` (or equivalent CLI flags) in `django-rest-api/backend/` to define workers, threads, timeouts, and access/error log locations.
	- [x] Update `django-rest-api/Dockerfile` and `docker-compose.prod.yml` commands so the container executes `gunicorn backend.wsgi:application --config gunicorn.conf.py` after migrations and static collection.
	- [x] Ensure the container exposes Prometheus-style Gunicorn metrics or logs compatible with Dokploy monitoring (stdout JSON or log files mounted to a volume).

4. Harden Django Security Settings
	- Set `SECURE_SSL_REDIRECT=True`, `SECURE_PROXY_SSL_HEADER=('HTTP_X_FORWARDED_PROTO', 'https')`, and enable `SESSION_COOKIE_SECURE`, `CSRF_COOKIE_SECURE`, and `CSRF_COOKIE_HTTPONLY` in the production settings profile.
	- Configure `SECURE_HSTS_SECONDS` (e.g. 31536000), `SECURE_HSTS_INCLUDE_SUBDOMAINS`, and `SECURE_HSTS_PRELOAD` once TLS is confirmed; gate these behind an env var for staged rollout.
	- Enable `SECURE_REFERRER_POLICY='strict-origin-when-cross-origin'` and `X_FRAME_OPTIONS='DENY'` if iframe support is not required.

5. Tighten JWT & Authentication Defaults
	- Parameterize `SIMPLE_JWT` lifetimes via env vars (`ACCESS_TOKEN_LIFETIME`, `REFRESH_TOKEN_LIFETIME`) and shorten production tokens (e.g. 15 minutes / 7 days) for better revocation posture.
	- Configure `SIGNING_KEY` to use the Django `SECRET_KEY` or an isolated secret and ensure `ALGORITHM` is consistent across environments.
	- Add DRF throttling classes (e.g. `UserRateThrottle`, `AnonRateThrottle`) to `REST_FRAMEWORK` with env-configurable rates to protect login and registration endpoints.

6. Fortify Database Configuration
	- Drop the SQLite branch in `backend/backend/settings.py` for production runs; instead rely on a single Postgres configuration sourced from either discrete vars or `DATABASE_URL`.
	- Provide an explicit `CONN_MAX_AGE` (>0) and `OPTIONS` (sslmode, target session attrs) tuned for managed Postgres services.
	- Add a `DATABASES['default']['ATOMIC_REQUESTS']=True` toggle to simplify transaction handling for the API layer.

7. Replace Insecure Superuser Bootstrap
	- Refactor `api/management/commands/create_default_superuser.py` to read credentials from env vars (e.g. `DJANGO_SUPERUSER_USERNAME`, etc.) and exit early when absent.
	- Guard the command behind `ENVIRONMENT != 'production'` or convert it to an idempotent signal executed during deploys with secure passwords provided by Dokploy secrets.
	- Remove the hard-coded default password and document the new provisioning flow in `django-rest-api/README.md`.

8. Introduce Structured Logging & Health Probes
	- Define a `LOGGING` dict in settings that emits JSON-formatted logs for `django`, `gunicorn`, and application namespaces; route access logs to stdout for Dokploy ingestion.
	- Implement a lightweight `/healthz` endpoint (or reuse `django-prometheus`) that checks database connectivity; expose it through `urls.py` guarded by a simple shared secret header.
	- Add application-level alerts for migration failures and superuser provisioning by surfacing `command` output to the orchestrator (non-zero exit on failure).

9. Document Operational Requirements
	- Create `.env.production.example` capturing all required secrets (database, JWT, security toggles) and link it from `django-rest-api/README.md`.
	- Update deployment docs to include `python manage.py check --deploy`, `collectstatic`, and `migrate` steps plus any manual verification (admin login, health endpoint).
	- List Dokploy-specific annotations (Traefik labels, secrets) and how they map to the Django settings introduced above.
