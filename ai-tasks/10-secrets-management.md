# Task: Centralize Secrets Management

## Goal
Store and rotate all sensitive configuration required by the Django backend.

## Prerequisites
- Organization-approved secrets manager (AWS Secrets Manager, Vault, Doppler, etc.).

## Steps
1. **Inventory Secrets**
   - Catalog all sensitive values consumed by the Django backend: `SECRET_KEY`, database credentials, JWT signing keys, third-party API tokens, email SMTP settings.
2. **Centralize Storage**
   - Load the cataloged secrets into the organization-approved vault and grant Dokploy read-only access for the production stack.
   - Configure automatic rotation where supported (database passwords, JWT signing keys with key IDs, etc.).
3. **Wire Secrets to Dokploy**
   - Map the stored secrets to the `backend` service environment variables referenced in `docker-compose.prod.yml` so Dokploy injects them during deploy.
   - Remove any lingering `.env` files from build contexts and rely solely on Dokploy-managed values.
4. **Incident Response Plan**
   - Document rotation procedures for compromised secrets.
   - Schedule periodic audits to verify access logs and rotation cadence.
