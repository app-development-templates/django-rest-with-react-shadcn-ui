# Task 002: Update Navigation for Real Routes

## Goal
Align the top navigation with actual router paths and remove broken asset references that trigger 404s.

## Steps
- Replace `/page1` and `/page2` links in `react-shadcn-ui/src/components/Navigation.jsx` with valid destinations (e.g., `/`, `/settings`, `/boilerplate`) or make the menu configurable.
- Remove or replace the `/placeholder-avatar.png` reference; either add a real asset under `public/` or rely solely on the fallback initials.
- Manually test the nav items in the Vite preview build to ensure they no longer lead to 404 pages.

## Acceptance Criteria
- All navigation links map to existing routes and render pages without hitting the 404 screen.
- The browser no longer logs missing `/placeholder-avatar.png` asset requests.
