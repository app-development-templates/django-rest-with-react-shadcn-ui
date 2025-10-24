from django.apps import AppConfig
from django.core.management import call_command
from django.db.models.signals import post_migrate
from django.dispatch import receiver


class ApiConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'api'

    def ready(self):
        # Connect the post_migrate signal
        post_migrate.connect(create_default_superuser, sender=self)


@receiver(post_migrate)
def create_default_superuser(sender, **kwargs):
    """
    Create default superuser after migrations are complete.
    This ensures the database is ready before attempting to create the user.
    """
    if sender.name == 'api':
        try:
            call_command('create_default_superuser')
        except Exception as e:
            print(f"Error creating default superuser: {e}")
