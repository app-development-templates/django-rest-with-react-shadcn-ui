# Task 002: Update Navigation for Real Routes

## Goal
Align the top navigation with actual router paths and remove broken asset references that trigger 404s.

## Status
- [x] Identified the invalid `/page1` and `/page2` links and the missing `/placeholder-avatar.png` asset.
- [x] Update navigation menu items to point at real routes.
- [x] Remove or replace the broken avatar image reference.
- [x] Smoke-test the nav in a preview build.

## Verification
- `npm run build`
- `npm run preview -- --host 127.0.0.1 --port 4173 --strictPort`

## Steps
- Replace `/page1` and `/page2` links in `react-shadcn-ui/src/components/Navigation.jsx` with valid destinations (e.g., `/`, `/settings`, `/boilerplate`) or make the menu configurable.
- Remove or replace the `/placeholder-avatar.png` reference; either add a real asset under `public/` or rely solely on the fallback initials.
- Manually test the nav items in the Vite preview build to ensure they no longer lead to 404 pages.

## Acceptance Criteria
- All navigation links map to existing routes and render pages without hitting the 404 screen. ✅
- The browser no longer logs missing `/placeholder-avatar.png` asset requests. ✅
