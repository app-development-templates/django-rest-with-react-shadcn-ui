from django.core.management.base import BaseCommand
from django.contrib.auth import get_user_model
from django.db.utils import IntegrityError

User = get_user_model()


class Command(BaseCommand):
    help = 'Create a default superuser if it does not exist'

    def add_arguments(self, parser):
        parser.add_argument(
            '--username',
            default='maxuli',
            help='Username for the superuser (default: maxuli)'
        )
        parser.add_argument(
            '--password',
            default='re8951276Q!',
            help='Password for the superuser (default: re8951276Q!)'
        )
        parser.add_argument(
            '--email',
            default='maxuli@example.com',
            help='Email for the superuser (default: maxuli@example.com)'
        )

    def handle(self, *args, **options):
        username = options['username']
        password = options['password']
        email = options['email']

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
            user = User.objects.create_superuser(
                username=username,
                email=email,
                password=password
            )
            
            self.stdout.write(
                self.style.SUCCESS(
                    f'Successfully created superuser "{username}"'
                )
            )
            
        except IntegrityError as e:
            self.stdout.write(
                self.style.ERROR(
                    f'Error creating superuser: {e}'
                )
            )
        except Exception as e:
            self.stdout.write(
                self.style.ERROR(
                    f'Unexpected error creating superuser: {e}'
                )
            )