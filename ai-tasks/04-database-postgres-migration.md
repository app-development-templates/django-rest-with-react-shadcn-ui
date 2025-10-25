# Task: Migrate Database to Managed PostgreSQL

## Goal
Run the Django backend against PostgreSQL for production reliability and scaling.

## Prerequisites
- Provisioned PostgreSQL instance with network access from the deployment environment.
- Credentials stored via secrets manager (see `01-environment-variables.md`).

## Steps
1. **Configure Environment**
   - In Dokploy, set `DEBUG=0` for the `backend` service so the PostgreSQL branch in `settings.py` activates.
   - Provide `DB_NAME`, `DB_USER`, `DB_PASSWORD`, and `DB_HOST` overrides for the backend container; Dokploy automatically links the service hostname `db` from `docker-compose.prod.yml`.
2. **Install Dependencies**
   - Ensure the runtime image installs `psycopg2-binary` from `requirements.txt`.
   - For Alpine-based images, switch to the compiled `psycopg2` package with system dependencies.
3. **Initialize Schema**
   - Run `python manage.py migrate` against the new database.
   - Seed required baseline data (e.g., default admin) using management commands or fixtures.
4. **Data Migration (Optional)**
   - If existing SQLite data must be preserved, export via `manage.py dumpdata` and import into PostgreSQL, resolving any compatibility issues.
5. **Connection Health Checks**
   - Execute `python manage.py dbshell` (with Postgres client installed) or a simple read/write smoke test to confirm connectivity.
   - Verify `wait-for-db` script in the Docker entrypoint references the correct host and port.
