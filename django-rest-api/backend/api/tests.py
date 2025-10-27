from datetime import timedelta

from django.contrib.auth.models import User
from django.urls import reverse
from django.utils import timezone
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
				"username": "jdoe",
				"email": "jdoe@example.com",
				"first_name": "John",
				"last_name": "Doe",
			},
		)

		self.assertIn("refresh", response.data)
		self.assertIn("access", response.data)

	def test_token_request_updates_last_login(self):
		self.assertIsNone(self.user.last_login)
		url = reverse("get_token")
		response = self.client.post(
			url,
			{"username": "jdoe", "password": "s3cret-pass"},
			format="json",
		)

		self.assertEqual(response.status_code, status.HTTP_200_OK)
		self.user.refresh_from_db()
		self.assertIsNotNone(self.user.last_login)
		self.assertLess(abs(timezone.now() - self.user.last_login), timedelta(seconds=5))


class TestRegistrationResponse(APITestCase):
	def test_registration_returns_token_payload(self):
		url = reverse("create_user")
		response = self.client.post(
			url,
			{"username": "newbie", "password": "pass1234"},
			format="json",
		)

		self.assertEqual(response.status_code, status.HTTP_201_CREATED)
		self.assertTrue(User.objects.filter(username="newbie").exists())
		self.assertIn("refresh", response.data)
		self.assertIn("access", response.data)
		self.assertIn("user", response.data)
		self.assertEqual(
			response.data["user"],
			{
				"username": "newbie",
				"email": "",
				"first_name": "",
				"last_name": "",
			},
		)

		access = response.data["access"]
		payload = token_backend.decode(access, verify=True)
		self.assertEqual(payload["username"], "newbie")

	def test_registration_accepts_optional_profile_fields(self):
		url = reverse("create_user")
		payload = {
			"username": "profiled",
			"password": "pass1234",
			"email": "profiled@example.com",
			"first_name": "Profile",
			"last_name": "Dude",
		}

		response = self.client.post(url, payload, format="json")

		self.assertEqual(response.status_code, status.HTTP_201_CREATED)
		user = User.objects.get(username="profiled")
		self.assertEqual(user.email, "profiled@example.com")
		self.assertEqual(user.first_name, "Profile")
		self.assertEqual(user.last_name, "Dude")

		snapshot = {
			"username": "profiled",
			"email": "profiled@example.com",
			"first_name": "Profile",
			"last_name": "Dude",
		}
		self.assertEqual(response.data["user"], snapshot)
		payload_claims = token_backend.decode(response.data["access"], verify=True)
		self.assertEqual(payload_claims["email"], "profiled@example.com")
		self.assertEqual(payload_claims["first_name"], "Profile")
		self.assertEqual(payload_claims["last_name"], "Dude")
