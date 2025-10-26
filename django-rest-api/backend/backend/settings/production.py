"""Production settings for the backend project."""

import os

from django.core.exceptions import ImproperlyConfigured

from .base import *  # noqa

ENVIRONMENT = "production"
DEBUG = False


def _require_origins(origins: list[str], setting_name: str) -> None:
    if not origins:
        raise ImproperlyConfigured(f"{setting_name} must define at least one entry in production")
    for origin in origins:
        if origin == "*":
            raise ImproperlyConfigured(f"{setting_name} cannot include '*' in production")
        if "//" not in origin:
            raise ImproperlyConfigured(
                f"{setting_name} entry '{origin}' must include an explicit scheme (e.g. https://example.com)"
            )


if not ALLOWED_HOSTS:
    raise ImproperlyConfigured("ALLOWED_HOSTS must define at least one host in production")

_require_origins(CORS_ALLOWED_ORIGINS, "CORS_ALLOWED_ORIGINS")
_require_origins(CSRF_TRUSTED_ORIGINS, "CSRF_TRUSTED_ORIGINS")

if DATABASES["default"]["ENGINE"] != "django.db.backends.postgresql":
    raise ImproperlyConfigured("Production environment requires PostgreSQL configuration")


SECURE_SSL_REDIRECT = env_bool("SECURE_SSL_REDIRECT", True)
SECURE_PROXY_SSL_HEADER = ("HTTP_X_FORWARDED_PROTO", "https")

SESSION_COOKIE_SECURE = True
SESSION_COOKIE_HTTPONLY = env_bool("SESSION_COOKIE_HTTPONLY", True)
SESSION_COOKIE_SAMESITE = os.getenv("SESSION_COOKIE_SAMESITE", "Lax")

CSRF_COOKIE_SECURE = True
CSRF_COOKIE_HTTPONLY = env_bool("CSRF_COOKIE_HTTPONLY", True)
CSRF_COOKIE_SAMESITE = os.getenv("CSRF_COOKIE_SAMESITE", "Lax")

SECURE_REFERRER_POLICY = os.getenv("SECURE_REFERRER_POLICY", "strict-origin-when-cross-origin")

_allowed_frame_options = {"DENY", "SAMEORIGIN"}
_configured_frame_option = os.getenv("X_FRAME_OPTIONS", "DENY").upper()
if _configured_frame_option not in _allowed_frame_options:
    raise ImproperlyConfigured(
        "X_FRAME_OPTIONS must be either 'DENY' or 'SAMEORIGIN' in production. Use 'SAMEORIGIN' if future iframe "
        "support from the same site is required."
    )
X_FRAME_OPTIONS = _configured_frame_option


_enable_hsts = env_bool("ENABLE_HSTS", False)
if _enable_hsts:
    SECURE_HSTS_SECONDS = int(os.getenv("SECURE_HSTS_SECONDS", "31536000"))
    SECURE_HSTS_INCLUDE_SUBDOMAINS = env_bool("SECURE_HSTS_INCLUDE_SUBDOMAINS", True)
    SECURE_HSTS_PRELOAD = env_bool("SECURE_HSTS_PRELOAD", True)
else:
    SECURE_HSTS_SECONDS = 0
    SECURE_HSTS_INCLUDE_SUBDOMAINS = False
    SECURE_HSTS_PRELOAD = False

SECURE_CONTENT_TYPE_NOSNIFF = True
