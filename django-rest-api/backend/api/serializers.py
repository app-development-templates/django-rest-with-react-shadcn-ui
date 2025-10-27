from django.contrib.auth.models import User
from rest_framework import serializers
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer, TokenRefreshSerializer


class UserRegistrationSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["username", "password", "email", "first_name", "last_name"]
        extra_kwargs = {
            "password": {"write_only": True},
            "email": {"required": False, "allow_blank": True},
            "first_name": {"required": False, "allow_blank": True},
            "last_name": {"required": False, "allow_blank": True},
        }

    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        return user


class UserSummarySerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["username", "email", "first_name", "last_name"]
        read_only_fields = fields


class AuthTokenResponseSerializer(serializers.Serializer):
    refresh = serializers.CharField(read_only=True)
    access = serializers.CharField(read_only=True)
    user = UserSummarySerializer(read_only=True)


class TokenPairRequestSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField()


class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    """Attach additional user metadata to issued JWTs."""

    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        token["username"] = user.username
        token["email"] = user.email or ""
        token["first_name"] = user.first_name or ""
        token["last_name"] = user.last_name or ""
        return token

    @staticmethod
    def _user_snapshot(user):
        return {
            "username": user.username,
            "email": user.email or "",
            "first_name": user.first_name or "",
            "last_name": user.last_name or "",
        }

    @classmethod
    def build_response_payload(cls, user):
        refresh = cls.get_token(user)
        return {
            "refresh": str(refresh),
            "access": str(refresh.access_token),
            "user": cls._user_snapshot(user),
        }

    def validate(self, attrs):
        data = super().validate(attrs)
        # Surface the same metadata alongside the token response for convenience.
        data["user"] = self._user_snapshot(self.user)
        return data