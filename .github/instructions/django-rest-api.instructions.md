---
applyTo: "django-rest-api/**"
---

# Django REST API Instructions

## Libraries and Dependencies

This project uses the following core libraries and their specific configurations:

### Core Framework
- **Django 5.2.7**: Main web framework
- **djangorestframework 3.16.1**: REST API framework for Django
- **asgiref 3.10.0**: ASGI reference implementation for Django

### Authentication & Security
- **djangorestframework-simplejwt 5.5.1**: JWT authentication for DRF
  - Access token lifetime: 30 minutes
  - Refresh token lifetime: 1 day
- **PyJWT 2.10.1**: Python JWT library (dependency of simplejwt)

### CORS Support
- **django-cors-headers 4.9.0**: Handles Cross-Origin Resource Sharing
  - Currently configured to allow all origins (`CORS_ALLOW_ALL_ORIGINS = True`)
  - Credentials are allowed (`CORS_ALLOW_CREDENTIALS = True`)

### Database
- **SQLite3**: Default database (built-in with Django)
- **psycopg2-binary 2.9.11**: PostgreSQL adapter (included for production readiness)

### Utilities
- **python-dotenv 1.1.1**: Environment variable management from .env files
- **pytz 2025.2**: Timezone support
- **sqlparse 0.5.3**: SQL parsing library (Django dependency)

## Current Project Structure

### API Configuration
- **Authentication**: JWT-based using SimpleJWT
- **Permissions**: `IsAuthenticated` by default, `AllowAny` for user registration
- **User Management**: Custom user creation view with password hashing
- **Admin Interface**: Enabled at `/admin/`

### URL Patterns
- `/api/user/register/` - User registration (AllowAny)
- `/api/token/` - JWT token obtain
- `/api/token/refresh/` - JWT token refresh
- `/api-auth/` - DRF browsable API auth (optional)

### Current Models
- Using Django's built-in `User` model
- No custom models defined yet

## CRITICAL RULES - MUST FOLLOW

⚠️ **IMPORTANT**: Before modifying any of the dependencies or configurations listed above, you MUST:

1. **Dependency Changes**: 
   - Always check compatibility between Django, DRF, and other packages
   - Update `requirements.txt` when adding/removing packages
   - Test all authentication flows after JWT library updates

2. **Authentication Settings**:
   - Never disable JWT authentication in production
   - Always maintain secure token lifetimes (current: 30min access, 1day refresh)
   - Preserve the JWT configuration in `settings.py`

3. **CORS Configuration**:
   - Review CORS settings before production deployment
   - `CORS_ALLOW_ALL_ORIGINS = True` is for development only
   - Update to specific origins for production

4. **Database Changes**:
   - Always create and run migrations for model changes
   - Keep both SQLite (dev) and PostgreSQL (prod) support
   - Never commit database files to version control

5. **Security**:
   - Replace `SECRET_KEY` with environment variable for production
   - Set `DEBUG = False` for production
   - Update `ALLOWED_HOSTS` appropriately

6. **Package Management**:
   - Pin exact versions in `requirements.txt`
   - Test thoroughly after any dependency updates
   - Document any breaking changes in version updates

**🔒 Any modifications to authentication, security settings, or core dependencies require thorough testing of all existing functionality.**
