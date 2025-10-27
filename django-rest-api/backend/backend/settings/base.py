"""Base settings shared across all environments."""

from __future__ import annotations

from datetime import timedelta
from pathlib import Path
from typing import List
import os
import secrets

from django.core.exceptions import ImproperlyConfigured
from dotenv import load_dotenv

load_dotenv()

BASE_DIR = Path(__file__).resolve().parent.parent.parent

ENVIRONMENT = os.getenv("ENVIRONMENT", "development").lower()
VALID_ENVIRONMENTS = {"development", "production", "test"}
if ENVIRONMENT not in VALID_ENVIRONMENTS:
    raise ImproperlyConfigured(
        "ENVIRONMENT must be one of 'development', 'production', or 'test'"
    )

DEBUG = ENVIRONMENT != "production"

SECRET_KEY = os.getenv("SECRET_KEY")
if not SECRET_KEY:
    if ENVIRONMENT == "production":
        raise ImproperlyConfigured("SECRET_KEY environment variable is required")
    SECRET_KEY = secrets.token_urlsafe(64)


def _split_env_list(value: str) -> List[str]:
    return [item.strip() for item in value.split(",") if item.strip()]


def env_bool(name: str, default: bool) -> bool:
    return os.getenv(name, str(default)).lower() in {"true", "1", "yes", "on"}


ALLOWED_HOSTS_RAW = os.getenv("ALLOWED_HOSTS", "").strip()
if ALLOWED_HOSTS_RAW:
    ALLOWED_HOSTS: List[str] = _split_env_list(ALLOWED_HOSTS_RAW)
elif DEBUG:
    ALLOWED_HOSTS = ["localhost", "127.0.0.1", "[::1]"]
else:
    ALLOWED_HOSTS = []

if ENVIRONMENT == "production" and any(host in {"*", ""} for host in ALLOWED_HOSTS):
    raise ImproperlyConfigured("ALLOWED_HOSTS cannot contain '*' or be empty in production")

INSTALLED_APPS = [
    "django.contrib.admin",
    "django.contrib.auth",
    "django.contrib.contenttypes",
    "django.contrib.sessions",
    "django.contrib.messages",
    "django.contrib.staticfiles",
    "api",
    "rest_framework",
    "corsheaders",
    'drf_spectacular',
]

MIDDLEWARE = [
    "django.middleware.security.SecurityMiddleware",
    "whitenoise.middleware.WhiteNoiseMiddleware",
    "django.contrib.sessions.middleware.SessionMiddleware",
    "django.middleware.common.CommonMiddleware",
    "django.middleware.csrf.CsrfViewMiddleware",
    "django.contrib.auth.middleware.AuthenticationMiddleware",
    "django.contrib.messages.middleware.MessageMiddleware",
    "django.middleware.clickjacking.XFrameOptionsMiddleware",
    "corsheaders.middleware.CorsMiddleware",
]

ROOT_URLCONF = "backend.urls"

TEMPLATES = [
    {
        "BACKEND": "django.template.backends.django.DjangoTemplates",
        "DIRS": [],
        "APP_DIRS": True,
        "OPTIONS": {
            "context_processors": [
                "django.template.context_processors.request",
                "django.contrib.auth.context_processors.auth",
                "django.contrib.messages.context_processors.messages",
            ],
        },
    },
]

WSGI_APPLICATION = "backend.wsgi.application"

def _build_postgres_settings() -> dict | None:
    required = {
        "NAME": os.getenv("DB_NAME"),
        "USER": os.getenv("DB_USER"),
        "PASSWORD": os.getenv("DB_PASSWORD"),
        "HOST": os.getenv("DB_HOST"),
    }
    missing = [key for key, value in required.items() if not value]
    if missing:
        return None

    return {
        "ENGINE": "django.db.backends.postgresql",
        "NAME": required["NAME"],
        "USER": required["USER"],
        "PASSWORD": required["PASSWORD"],
        "HOST": required["HOST"],
        "PORT": os.getenv("DB_PORT", "5432"),
        "CONN_MAX_AGE": int(os.getenv("DB_CONN_MAX_AGE", "60")),
    }


postgres_conf = _build_postgres_settings()
if postgres_conf:
    DATABASES = {"default": postgres_conf}
else:
    if ENVIRONMENT == "production":
        raise ImproperlyConfigured(
            "PostgreSQL connection settings are required in production"
        )
    DATABASES = {
        "default": {
            "ENGINE": "django.db.backends.sqlite3",
            "NAME": BASE_DIR / "db.sqlite3",
        }
    }

DATABASES["default"]["ATOMIC_REQUESTS"] = env_bool("DB_ATOMIC_REQUESTS", True)

if DATABASES["default"]["ENGINE"] == "django.db.backends.postgresql":
    options = DATABASES["default"].setdefault("OPTIONS", {})
    options.setdefault("sslmode", os.getenv("DB_SSLMODE", "prefer"))
    target_session_attrs = os.getenv("DB_TARGET_SESSION_ATTRS")
    if target_session_attrs:
        options["target_session_attrs"] = target_session_attrs
else:
    # Use in-memory transactions per request for sqlite to avoid locking issues in dev
    DATABASES["default"]["CONN_MAX_AGE"] = 0

AUTH_PASSWORD_VALIDATORS = [
    {
        "NAME": "django.contrib.auth.password_validation.UserAttributeSimilarityValidator",
    },
    {
        "NAME": "django.contrib.auth.password_validation.MinimumLengthValidator",
    },
    {
        "NAME": "django.contrib.auth.password_validation.CommonPasswordValidator",
    },
    {
        "NAME": "django.contrib.auth.password_validation.NumericPasswordValidator",
    },
]

LANGUAGE_CODE = "en-us"

TIME_ZONE = "UTC"

USE_I18N = True

USE_TZ = True

STATIC_URL = "static/"
STATIC_ROOT = BASE_DIR / "staticfiles"

STATICFILES_DIRS = [
    BASE_DIR / "static",
]

STATICFILES_STORAGE = "whitenoise.storage.CompressedManifestStaticFilesStorage"
WHITENOISE_USE_FINDERS = True
WHITENOISE_AUTOREFRESH = DEBUG
WHITENOISE_MAX_AGE = 31536000 if not DEBUG else 0

DEFAULT_AUTO_FIELD = "django.db.models.BigAutoField"

REST_FRAMEWORK = {
    "DEFAULT_AUTHENTICATION_CLASSES": (
        "rest_framework_simplejwt.authentication.JWTAuthentication",
    ),
    "DEFAULT_PERMISSION_CLASSES": [
        "rest_framework.permissions.IsAuthenticated",
    ],
    "DEFAULT_THROTTLE_CLASSES": [
        "rest_framework.throttling.AnonRateThrottle",
        "rest_framework.throttling.UserRateThrottle",
    ],
    "DEFAULT_THROTTLE_RATES": {
        "anon": os.getenv("DRF_THROTTLE_RATE_ANON", "20/min"),
        "user": os.getenv("DRF_THROTTLE_RATE_USER", "120/min"),
    },
    'DEFAULT_SCHEMA_CLASS': 'drf_spectacular.openapi.AutoSchema',
}

default_server_urls = [url.strip() for url in os.getenv("OPENAPI_SERVER_URLS", "").split(",") if url.strip()]
if not default_server_urls:
    default_server_urls = [
        "http://127.0.0.1:8000",
        os.getenv("PUBLIC_API_BASE_URL", "https://backend.presentationlab.org"),
    ]

SPECTACULAR_SETTINGS = {
    "TITLE": "Your Project API",
    "DESCRIPTION": "Your project description",
    "VERSION": "1.0.0",
    "SERVE_INCLUDE_SCHEMA": False,
    "SERVERS": [{"url": url} for url in default_server_urls if url],
    # OTHER SETTINGS
}

SIMPLE_JWT = {
    "ACCESS_TOKEN_LIFETIME": timedelta(minutes=int(os.getenv("ACCESS_TOKEN_LIFETIME", "30"))),
    "REFRESH_TOKEN_LIFETIME": timedelta(days=int(os.getenv("REFRESH_TOKEN_LIFETIME", "7"))),
    "ALGORITHM": os.getenv("JWT_ALGORITHM", "HS256"),
    "SIGNING_KEY": os.getenv("JWT_SIGNING_KEY", SECRET_KEY),
}


cors_origins = os.getenv("CORS_ALLOWED_ORIGINS", "").strip()
if cors_origins:
    CORS_ALLOWED_ORIGINS = _split_env_list(cors_origins)
elif DEBUG:
    CORS_ALLOWED_ORIGINS = ["http://localhost:3000", "http://localhost:3001"]
else:
    CORS_ALLOWED_ORIGINS = []

if ENVIRONMENT == "production" and not CORS_ALLOWED_ORIGINS:
    raise ImproperlyConfigured("CORS_ALLOWED_ORIGINS must be set in production")

CORS_ALLOW_CREDENTIALS = True

csrf_origins = os.getenv("CSRF_TRUSTED_ORIGINS", "").strip()
if csrf_origins:
    CSRF_TRUSTED_ORIGINS = _split_env_list(csrf_origins)
elif DEBUG:
    CSRF_TRUSTED_ORIGINS = ["http://localhost:8000"]
else:
    CSRF_TRUSTED_ORIGINS = []

if ENVIRONMENT == "production" and not CSRF_TRUSTED_ORIGINS:
    raise ImproperlyConfigured("CSRF_TRUSTED_ORIGINS must be set in production")
