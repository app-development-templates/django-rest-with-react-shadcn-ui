from django.contrib.auth.models import User
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase
from rest_framework_simplejwt.state import token_backend


class TestTokenClaims(APITestCase):
	def setUp(self):
		self.user = User.objects.create_user(
			username="jdoe",
			email="jdoe@example.com",
			password="s3cret-pass",
			first_name="John",
			last_name="Doe",
		)

	def test_access_token_includes_user_metadata(self):
		url = reverse("get_token")
		response = self.client.post(
			url,
			{"username": "jdoe", "password": "s3cret-pass"},
			format="json",
		)

		self.assertEqual(response.status_code, status.HTTP_200_OK)
		access = response.data.get("access")
		self.assertIsNotNone(access)

		payload = token_backend.decode(access, verify=True)
		self.assertEqual(payload["username"], "jdoe")
		self.assertEqual(payload["email"], "jdoe@example.com")
		self.assertEqual(payload["first_name"], "John")
		self.assertEqual(payload["last_name"], "Doe")

	def test_token_response_returns_user_snapshot(self):
		url = reverse("get_token")
		response = self.client.post(
			url,
			{"username": "jdoe", "password": "s3cret-pass"},
			format="json",
		)

		self.assertEqual(response.status_code, status.HTTP_200_OK)
		self.assertIn("user", response.data)
		self.assertEqual(
			response.data["user"],
			{
				"id": self.user.id,
				"username": "jdoe",
				"email": "jdoe@example.com",
				"first_name": "John",
				"last_name": "Doe",
			},
		)
