import os

from django.conf import settings
from django.contrib.auth import get_user_model
from django.core.management import CommandError
from django.core.management.base import BaseCommand
from django.db.utils import IntegrityError

User = get_user_model()


class Command(BaseCommand):
    help = "Create a default superuser if it does not exist"

    def add_arguments(self, parser):
        parser.add_argument(
            "--username",
            help="Optional override for DJANGO_SUPERUSER_USERNAME",
        )
        parser.add_argument(
            "--password",
            help="Optional override for DJANGO_SUPERUSER_PASSWORD",
        )
        parser.add_argument(
            "--email",
            help="Optional override for DJANGO_SUPERUSER_EMAIL",
        )

    def handle(self, *args, **options):
        environment = getattr(settings, "ENVIRONMENT", "development").lower()
        if environment == "production":
            self.stdout.write(
                self.style.WARNING(
                    "ENVIRONMENT is 'production'; proceeding with superuser creation using provided credentials."
                )
            )

        username = os.getenv("DJANGO_SUPERUSER_USERNAME") or options.get("username")
        password = os.getenv("DJANGO_SUPERUSER_PASSWORD") or options.get("password")
        email = os.getenv("DJANGO_SUPERUSER_EMAIL") or options.get("email")

        missing = [
            name
            for name, value in (
                ("DJANGO_SUPERUSER_USERNAME", username),
                ("DJANGO_SUPERUSER_PASSWORD", password),
                ("DJANGO_SUPERUSER_EMAIL", email),
            )
            if not value
        ]

        if missing:
            self.stdout.write(
                self.style.WARNING(
                    "Skipping superuser creation; missing required env vars: "
                    + ", ".join(missing)
                )
            )
            return

        try:
            # Check if superuser already exists
            if User.objects.filter(username=username).exists():
                self.stdout.write(
                    self.style.SUCCESS(
                        f'Superuser "{username}" already exists. Skipping creation.'
                    )
                )
                return

            # Create the superuser
            User.objects.create_superuser(
                username=username,
                email=email,
                password=password,
            )

            self.stdout.write(
                self.style.SUCCESS(
                    f'Successfully created superuser "{username}"'
                )
            )

        except IntegrityError as e:
            raise CommandError(f"Error creating superuser: {e}") from e
        except Exception as e:
            raise CommandError(f"Unexpected error creating superuser: {e}") from e