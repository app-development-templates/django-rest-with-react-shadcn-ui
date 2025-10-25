import { Navigate } from "react-router-dom";
import { useCallback, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import api from "../api";
import { REFRESH_TOKEN, ACCESS_TOKEN } from "../constants";

function ProtectedRoute({ children }) {
    const [isAuthorized, setIsAuthorized] = useState(null);

    const refreshAccessToken = useCallback(async () => {
        const refreshToken = localStorage.getItem(REFRESH_TOKEN);
        if (!refreshToken) {
            return false;
        }

        try {
            const res = await api.post("/api/token/refresh/", {
                refresh: refreshToken,
            });

            if (res.status === 200) {
                localStorage.setItem(ACCESS_TOKEN, res.data.access);
                return true;
            }
        } catch (error) {
            console.error("Failed to refresh access token", error);
        }

        return false;
    }, []);

    const evaluateAuthorization = useCallback(async () => {
        const token = localStorage.getItem(ACCESS_TOKEN);
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

    useEffect(() => {
        let isMounted = true;

        evaluateAuthorization()
            .then((authorized) => {
                if (isMounted) {
                    setIsAuthorized(authorized);
                }
            })
            .catch(() => {
                if (isMounted) {
                    setIsAuthorized(false);
                }
            });

        return () => {
            isMounted = false;
        };
    }, [evaluateAuthorization]);

    if (isAuthorized === null) {
        return <div>Loading...</div>;
    }

    return isAuthorized ? children : <Navigate to="/login" />;
}

export default ProtectedRoute;