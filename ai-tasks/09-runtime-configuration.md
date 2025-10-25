# Task: Harden Runtime Configuration

## Goal
Deploy the Django backend with a production-ready process manager and startup sequence.

## Prerequisites
- Container or hosting environment ready to run Gunicorn/ASGI.

## Steps
1. **Gunicorn Settings**
   - Review `django-rest-api/backend/gunicorn.conf.py` for worker class, timeout, and keep-alive values; adjust for production load profiles.
   - Ensure worker count is derived from CPU availability (e.g., `workers = 2 * cores + 1`).
2. **Startup Scripts**
   - Confirm `wait-for-db.sh` or `wait-for-db.py` is invoked before Gunicorn starts to avoid race conditions.
   - Validate the script handles PostgreSQL connection retries with exponential backoff.
3. **Static and Media Delivery**
   - If media uploads will be introduced, plan for dedicated object storage and update Django settings accordingly.
4. **Process Supervision**
   - For container deployments, ensure the entrypoint runs Gunicorn in the foreground and that the orchestrator (Docker/Kubernetes) handles restarts.
   - Document health probes (HTTP/TCP) aligned with `07-logging-and-monitoring.md` recommendations.
