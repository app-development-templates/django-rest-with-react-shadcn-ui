# Task 001: Fix ESLint Flat Config Compatibility

## Goal
Ensure `npm run lint` executes successfully by updating the flat ESLint config to use plugin objects instead of string arrays per ESLint 9 requirements.

## Steps
- Audit `react-shadcn-ui/eslint.config.js` (and any other config files) for `plugins` arrays or legacy sections.
- Register `react-hooks` and `react-refresh` plugins via the flat-config `plugins` object.
- Re-run `npm run lint` to confirm the configuration now loads without fatal errors.

## Acceptance Criteria
- `npm run lint` completes without the "plugins key defined as an array" error.
- The lint command exits with code 0 (or only reports legitimate lint findings).
