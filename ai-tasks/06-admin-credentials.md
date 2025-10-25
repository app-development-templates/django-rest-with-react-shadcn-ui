# Task: Secure Administrative Access

## Goal
Ensure Django admin access uses production-grade credentials and provisioning.

## Prerequisites
- PostgreSQL or target production database ready (see `04-database-postgres-migration.md`).

## Steps
1. **Review Automation**
   - Inspect `django-rest-api/backend/api/management/commands/create_default_superuser.py` for hard-coded credentials.
   - Update the command to pull username/email/password from environment variables or secrets manager.
2. **Create Production Admin**
   - Run the management command (or `python manage.py createsuperuser`) in the production environment using secure credentials.
   - Enforce password complexity and rotate secrets prior to go-live.
3. **Limit Surface Area**
   - Restrict admin URL access via network ACLs or reverse proxy rules where possible.
   - Configure Django admin to use 2FA or SSO if company policy requires it.
4. **Audit Admin Permissions**
   - Review admin group memberships and ensure least-privilege access for staff accounts.
