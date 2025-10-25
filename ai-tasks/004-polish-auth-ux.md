# Task 004: Improve Auth Form UX

## Goal
Tighten up the login and register flows by removing unused variables and surfacing errors inline instead of via generic alerts.

## Status
- [x] Removed unused response assignment in `Register.jsx` during earlier cleanup.
- [x] Replaced alert handling in `Login.jsx` with inline error UI matching register form and clearing state on submit.
- [ ] Add on-change error clearing for tighter UX polish.
- [x] Verified forms show API errors inline and lint stays clean.

## Steps
- Drop unused variables such as the `res` assignment in `Register.jsx` if the response body is not consumed.
- Replace the `alert(error)` call in `Login.jsx` with an inline error state that renders within the form (matching the register experience).
- Consider adding basic validation feedback (e.g., clearing errors on input change) for consistency between login and register forms.

## Acceptance Criteria
- Login and register pages display API errors inline using the existing card layout; no browser alert is fired on failure. ✅
- ESLint reports no unused variables within the auth pages. ✅

## Verification
- `npm run lint`
