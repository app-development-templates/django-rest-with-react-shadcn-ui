---
applyTo: "react-shadcn-ui/**"
---

## ⚠️ CRITICAL RULES

**BEFORE MODIFYING ANY LIBRARIES, COMPONENTS, OR CONFIGURATIONS:**

1. **NEVER modify `package.json` dependencies without explicit user approval** - This project uses specific versions for compatibility
2. **NEVER change shadcn/ui configuration** in `components.json` without user consent - Breaking changes affect entire design system
3. **NEVER alter Tailwind CSS configuration** or path aliases without validation - May break existing components
4. **ALWAYS use existing UI components** from `src/components/ui/` before creating new ones
5. **PRESERVE authentication patterns** - JWT handling and Axios interceptors are critical for security
6. **FOLLOW established patterns** for new components (use cva for variants, cn for className merging)
7. **MAINTAIN accessibility standards** - All Radix UI components must remain accessible

**When adding new functionality:** Use existing libraries and patterns. Only suggest new dependencies if absolutely necessary and explain the rationale.

## Libraries

### Core Framework & Build Tools
- **React 19** (`react`, `react-dom`) - Frontend framework with latest concurrent features
- **Vite 7** - Fast build tool and development server
- **React Router Dom 7** - Client-side routing and navigation

### UI Components & Design System
- **shadcn/ui** - Reusable component collection built on top of Radix UI
- **Radix UI** - Unstyled, accessible UI primitives:
  - `@radix-ui/react-avatar` - Avatar components
  - `@radix-ui/react-dropdown-menu` - Dropdown menu components
  - `@radix-ui/react-label` - Label components
  - `@radix-ui/react-slot` - Slot components for composition patterns
- **Lucide React** - Beautiful icon library with React components

### Styling & CSS
- **Tailwind CSS 4** - Utility-first CSS framework
- **Class Variance Authority (cva)** - Component variant management
- **clsx** - Conditional className utility
- **tailwind-merge** - Merge Tailwind CSS classes without conflicts
- **tw-animate-css** - Additional animation utilities for Tailwind

### HTTP & Authentication
- **Axios** - HTTP client for API requests with interceptors
- **jwt-decode** - JWT token decoding for authentication

### Development Tools
- **ESLint 9** - Code linting with React-specific rules:
  - `eslint-plugin-react-hooks` - React Hooks linting rules
  - `eslint-plugin-react-refresh` - React Fast Refresh linting
- **TypeScript types** - Type definitions for React components
- **Vite React Plugin** - React support for Vite

### Configuration
- **Path aliases** configured via `@/` prefix for clean imports
- **shadcn/ui configuration** in `components.json` with:
  - New York style variant
  - Stone base color theme
  - CSS variables enabled
  - Lucide icon library integration