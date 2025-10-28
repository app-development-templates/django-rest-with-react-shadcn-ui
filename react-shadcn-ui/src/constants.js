export const ACCESS_TOKEN_KEY = "access_token";
export const REFRESH_TOKEN_KEY = "refresh_token";
export const ACCESS_TOKEN_TTL_MINUTES = Number(import.meta.env.ACCESS_TOKEN_TTL_MINUTES || 15);
export const REFRESH_TOKEN_TTL_DAYS = Number(import.meta.env.REFRESH_TOKEN_TTL_DAYS || 7);