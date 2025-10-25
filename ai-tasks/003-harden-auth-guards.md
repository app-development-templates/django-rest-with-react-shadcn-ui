# Task 003: Harden Auth Guard Components

## Goal
Remove redundant logic and debug noise from `ProtectedRoute` and `PublicOnlyRoute` while keeping JWT refresh behavior consistent.

## Steps
- Eliminate the `console.log(decoded);` call in `ProtectedRoute.jsx`.
- DRY up the shared token/refresh logic by extracting a reusable helper or hook consumed by both guard components.
- Ensure both guards gracefully handle missing refresh tokens (avoid POSTing `null`).
- Verify navigation between protected and public routes still works after refactor.

## Acceptance Criteria
- Both guard components share a single source of truth for token validation and refresh logic.
- No JWT payloads are printed to the console during auth checks.
- Manual smoke test confirms protected pages redirect correctly when the access token is invalid or missing.
