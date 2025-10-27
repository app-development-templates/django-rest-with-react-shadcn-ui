import { useEffect, useMemo, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { ACCESS_TOKEN_KEY } from "../constants";

export const AUTH_TOKEN_EVENT = "auth-token-change";

function decodeToken(token) {
    if (!token) {
        return null;
    }

    try {
        const payload = jwtDecode(token);
        const displayName = payload.first_name || payload.last_name
            ? `${payload.first_name || ""} ${payload.last_name || ""}`.trim()
            : payload.username || "";

        return {
            id: payload.user_id ?? null,
            username: payload.username || "",
            email: payload.email || "",
            firstName: payload.first_name || "",
            lastName: payload.last_name || "",
            displayName: displayName || payload.email || payload.username || "",
        };
    } catch (error) {
        console.warn("Failed to decode access token", error);
        return null;
    }
}

export function useCurrentUser() {
    const [tokenSnapshot, setTokenSnapshot] = useState(() => localStorage.getItem(ACCESS_TOKEN_KEY));

    useEffect(() => {
        const handleTokenChange = (event) => {
            if (!event || event.key === ACCESS_TOKEN_KEY || event.type === AUTH_TOKEN_EVENT) {
                setTokenSnapshot(localStorage.getItem(ACCESS_TOKEN_KEY));
            }
        };

        window.addEventListener("storage", handleTokenChange);
        window.addEventListener(AUTH_TOKEN_EVENT, handleTokenChange);

        return () => {
            window.removeEventListener("storage", handleTokenChange);
            window.removeEventListener(AUTH_TOKEN_EVENT, handleTokenChange);
        };
    }, []);

    const user = useMemo(() => decodeToken(tokenSnapshot), [tokenSnapshot]);

    return user;
}
