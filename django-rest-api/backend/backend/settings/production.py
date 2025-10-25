"""Production settings for the backend project."""

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
