# Task 001: Fix ESLint Flat Config Compatibility

## Goal
Ensure `npm run lint` executes successfully by updating the flat ESLint config to use plugin objects instead of string arrays per ESLint 9 requirements.

## Status
- [x] Converted `react-shadcn-ui/eslint.config.js` to register `react-hooks` and `react-refresh` via the flat-config `plugins` object.
- [x] Re-ran `npm run lint`; the configuration now loads correctly and surfaces code issues instead of the previous fatal error.
- [x] Resolved the outstanding lint violations so the command exits cleanly.

## Steps
- Audit `react-shadcn-ui/eslint.config.js` (and any other config files) for `plugins` arrays or legacy sections.
- Register `react-hooks` and `react-refresh` plugins via the flat-config `plugins` object.
- Re-run `npm run lint` to confirm the configuration now loads without fatal errors.

## Acceptance Criteria
- `npm run lint` completes without the "plugins key defined as an array" error. ✅
- The lint command exits with code 0 (or only reports legitimate lint findings). ✅
