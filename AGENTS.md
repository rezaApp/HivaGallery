<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.

<!-- END:nextjs-agent-rules -->

# Repository Guidelines

HIVA is a multilingual storefront for art, antiques, and patina pieces. Keep changes focused on the requested behavior and preserve the existing localization, RTL, and visual patterns.

## Project Structure & Module Organization

This Next.js 16 storefront uses TypeScript, React 19, Tailwind CSS v4, `next-intl`, Zustand, React Hook Form, and Zod. Routes live in `src/app`; user-facing routes are nested under `src/app/[locale]` for English, Persian, and Arabic. Keep route helpers beside their page, using `_view.tsx` and `_form.tsx`.

Shared UI belongs in `src/components`, by feature (`auth/`, `products/`, `checkout/`) or `ui/` for primitives. Put stores in `src/store`, helpers and schemas in `src/lib`, types in `src/types`, translations in `messages/<locale>.json`, and static assets in `public/` or `fonts/`.

Use `src/i18n/navigation.ts` for links, routing, redirects, and pathname access so locale handling remains consistent. The locale configuration is in `src/i18n/routing.ts`: `fa` is the default locale without a URL prefix, while `en` and `ar` use prefixes. Every user-facing string must come from the matching `messages/<locale>.json` namespace; keep `dir="ltr"` for values such as phone numbers, postal codes, OTPs, and map coordinates when appropriate.

Keep pages server-rendered by default. Add `"use client"` only for browser state, effects, event handlers, or persisted Zustand stores. Use `dynamic(..., { ssr: false })` for browser-only Leaflet code. Authentication and account pages currently use the persisted mock auth store and redirect unauthenticated users client-side; do not assume server session behavior without adding that integration deliberately.

Use React Hook Form with Zod schemas from `src/lib/validations` for forms, and translate validation keys through the `validation` message namespace. Use existing UI primitives and `cn` rather than introducing duplicate controls or styling patterns. Product and account data are currently local mock data, so keep data access behind the existing `src/lib` modules and stores.

## Build, Lint, and Development Commands

- `npm run dev` starts the local development server.
- `npm run build` creates a production build and performs Next.js type validation.
- `npm run start` serves a completed production build.
- `npm run lint` checks the repository with ESLint.
- `npm run lint:fix` applies safe ESLint fixes.
- `npm run format:check` verifies Prettier formatting; `npm run format` rewrites files.

Run `npm run lint`, `npm run format:check`, and `npm run build` before review. No automated test framework is configured; manually verify affected routes in `/fa`, `/en`, and `/ar`, including RTL behavior. Husky runs `lint-staged` on commits.

## Coding Style & Naming Conventions

Use strict TypeScript and the `@/` alias for `src` imports. Use PascalCase React exports (`ProductCard`), kebab-case files (`product-card.tsx`) and route helpers (`_view.tsx`), and camelCase functions, variables, and Zustand stores. Prefer named types and Zod-inferred form values over `any`.

Prettier is authoritative: two-space indentation, double quotes, semicolons, trailing commas, and 80-character lines. Keep Tailwind class lists in the order produced by `prettier-plugin-tailwindcss`. Use server components by default; add `"use client"` only where browser state or effects require it.

## Commits & Pull Requests

Keep commit summaries concise and focused on the user-visible change. Pull requests should describe the user-visible change, list validation run, link the issue when available, and include screenshots or a recording for visual, responsive, or RTL changes. Note translation, environment, and migration impacts.
