# Task 003: Harden Auth Guard Components

## Goal
Remove redundant logic and debug noise from `ProtectedRoute` and `PublicOnlyRoute` while keeping JWT refresh behavior consistent.

## Status
- [x] Removed the console debug logging from the guard components and ensured missing refresh tokens short-circuit.
- [x] Extracted shared `useAuthGuard` hook consumed by both guard components.
- [x] Re-ran lint/build and smoke tests to confirm redirects behave correctly.

## Steps
- Eliminate the `console.log(decoded);` call in `ProtectedRoute.jsx`.
- DRY up the shared token/refresh logic by extracting a reusable helper or hook consumed by both guard components.
- Ensure both guards gracefully handle missing refresh tokens (avoid POSTing `null`).
- Verify navigation between protected and public routes still works after refactor.

## Acceptance Criteria
- Both guard components share a single source of truth for token validation and refresh logic. ✅
- No JWT payloads are printed to the console during auth checks. ✅
- Manual smoke test confirms protected pages redirect correctly when the access token is invalid or missing. ✅

## Verification
- `npm run lint`
- `npm run build`
- `npm run preview -- --host 127.0.0.1 --port 4173 --strictPort`
