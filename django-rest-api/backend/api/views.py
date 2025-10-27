from django.contrib.auth.models import User
from drf_spectacular.utils import extend_schema, extend_schema_view
from rest_framework import generics, status
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework_simplejwt.serializers import TokenRefreshSerializer
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

from .serializers import (
    AuthTokenResponseSerializer,
    CustomTokenObtainPairSerializer,
    TokenPairRequestSerializer,
    UserRegistrationSerializer,
    UserSummarySerializer,
)


# Create your views here.
@extend_schema(
    request=UserRegistrationSerializer,
    responses={201: AuthTokenResponseSerializer},
)
class CreateUserView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserRegistrationSerializer
    permission_classes = [AllowAny]  # Allow any user (authenticated or not) to access this view

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        payload = CustomTokenObtainPairSerializer.build_response_payload(user)
        headers = self.get_success_headers(UserSummarySerializer(user).data)
        return Response(payload, status=status.HTTP_201_CREATED, headers=headers)


@extend_schema_view(
    post=extend_schema(
        request=TokenPairRequestSerializer,
        responses={200: AuthTokenResponseSerializer},
    )
)
class CustomTokenObtainPairView(TokenObtainPairView):
    serializer_class = CustomTokenObtainPairSerializer


@extend_schema_view(
    post=extend_schema(
        request=TokenRefreshSerializer,
        responses={200: TokenRefreshSerializer},
    )
)
class CustomTokenRefreshView(TokenRefreshView):
    """Issue a new access token from a refresh token."""

