import { useCallback } from "react";
import { jwtDecode } from "jwt-decode";
import api from "../api";
import { REFRESH_TOKEN_KEY, ACCESS_TOKEN_KEY } from "../constants";

/**
 * Shared logic to validate and refresh JWT tokens for route guards.
 */
export function useAuthGuard() {
  const refreshAccessToken = useCallback(async () => {
  const refreshToken = localStorage.getItem(REFRESH_TOKEN_KEY);
    if (!refreshToken) {
      return false;
    }

    try {
      const res = await api.post("/api/token/refresh/", {
        refresh: refreshToken,
      });

      if (res.status === 200) {
  localStorage.setItem(ACCESS_TOKEN_KEY, res.data.access);
        return true;
      }
    } catch (error) {
      console.error("Failed to refresh access token", error);
    }

    return false;
  }, []);

  const evaluateAuthorization = useCallback(async () => {
  const token = localStorage.getItem(ACCESS_TOKEN_KEY);
    if (!token) {
      return false;
    }

    try {
      const decoded = jwtDecode(token);
      const now = Date.now() / 1000;

      if (decoded.exp < now) {
        return refreshAccessToken();
      }

      return true;
    } catch (error) {
      console.error("Error decoding access token", error);
      return false;
    }
  }, [refreshAccessToken]);

  return { evaluateAuthorization };
}
