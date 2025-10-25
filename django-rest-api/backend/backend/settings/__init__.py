"""Select settings module based on ENVIRONMENT."""

import os

environment = os.getenv("ENVIRONMENT", "development").lower()

if environment == "production":
	from .production import *  # noqa: F403,F401
elif environment in {"development", "test"}:
	from .development import *  # noqa: F403,F401
else:
	raise RuntimeError(
		"Unknown ENVIRONMENT value. Expected 'development', 'production', or 'test'."
	)
