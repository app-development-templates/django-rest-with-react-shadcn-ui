"""Gunicorn configuration for the Django backend service."""

from __future__ import annotations

import multiprocessing
import os


def _parse_int(env_key: str, default: int) -> int:
    try:
        return int(os.getenv(env_key, default))
    except (TypeError, ValueError):
        return default


def _parse_bool(env_key: str, default: bool) -> bool:
    return os.getenv(env_key, str(default)).lower() in {"1", "true", "yes", "on"}


bind = os.getenv("GUNICORN_BIND", "0.0.0.0:8000")
workers = _parse_int("GUNICORN_WORKERS", (multiprocessing.cpu_count() * 2) + 1)
threads = _parse_int("GUNICORN_THREADS", 2)
worker_class = os.getenv("GUNICORN_WORKER_CLASS", "gthread")
preload_app = _parse_bool("GUNICORN_PRELOAD", True)
accesslog = "-"
errorlog = "-"
loglevel = os.getenv("GUNICORN_LOG_LEVEL", "info")
timeout = _parse_int("GUNICORN_TIMEOUT", 60)
graceful_timeout = _parse_int("GUNICORN_GRACEFUL_TIMEOUT", 30)
keepalive = _parse_int("GUNICORN_KEEPALIVE", 5)
forwarded_allow_ips = os.getenv("GUNICORN_FORWARDED_ALLOW_IPS", "*")

# Structured JSON access logs for easier ingestion by Dokploy / Traefik
access_log_format = (
    '{"ts":"%(t)s","remote":"%(h)s","status":"%(s)s","request":"%(r)s",'
    '"length":"%(B)s","duration_ms":"%(M)s","referer":"%(f)s","user_agent":"%(a)s"}'
)
