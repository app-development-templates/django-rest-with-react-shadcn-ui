# django-rest-api

## Features
- User authentication via Django REST Framework and SimpleJWT

## Local Setup

```bash
python3 -m venv .venv
source ./.venv/bin/activate
pip install -r backend/requirements.txt
python3 manage.py makemigrations
python3 manage.py migrate
python3 manage.py runserver
```

## Superuser Provisioning

The `create_default_superuser` management command reads credentials from environment variables and skips execution when they are missing. When `ENVIRONMENT=production`, it still runs but emits a warning so you can verify that secure secrets are configured before provisioning the account.

Set the credentials before running the command:

```bash
export DJANGO_SUPERUSER_USERNAME=admin
export DJANGO_SUPERUSER_PASSWORD='<secure-password>'
export DJANGO_SUPERUSER_EMAIL=admin@example.com
python3 manage.py create_default_superuser
```

You can optionally override the environment variables with command-line flags (`--username`, `--password`, `--email`) during local development. In production, source the variables from secured deployment secrets (e.g. Dokploy) before invoking the command.




