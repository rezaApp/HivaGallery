<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.

<!-- END:nextjs-agent-rules -->

# Repository Guidelines

## Project Structure & Module Organization

This Next.js 16 storefront uses TypeScript, React 19, Tailwind CSS, and `next-intl`. Routes live in `src/app`; user-facing routes are nested under `src/app/[locale]` for English, Persian, and Arabic. Keep route helpers beside their page, using `_view.tsx` and `_form.tsx`.

Shared UI belongs in `src/components`, by feature (`auth/`, `products/`, `checkout/`) or `ui/` for primitives. Put stores in `src/store`, helpers and schemas in `src/lib`, types in `src/types`, translations in `messages/<locale>.json`, and static assets in `public/` or `fonts/`.

## Build, Lint, and Development Commands

- `npm run dev` starts the local development server.
- `npm run build` creates a production build and performs Next.js type validation.
- `npm run start` serves a completed production build.
- `npm run lint` checks the repository with ESLint.
- `npm run lint:fix` applies safe ESLint fixes.
- `npm run format:check` verifies Prettier formatting; `npm run format` rewrites files.

Run lint, formatting checks, and a build before review. Husky runs `lint-staged` on commits.

## Coding Style & Naming Conventions

Use strict TypeScript and the `@/` alias for `src` imports. Use PascalCase React exports (`ProductCard`), kebab-case files (`product-card.tsx`) and route helpers (`_view.tsx`), and camelCase functions, variables, and Zustand stores. Prefer named types and Zod-inferred form values over `any`.

Prettier is authoritative: two-space indentation, double quotes, semicolons, trailing commas, and 80-character lines. Keep Tailwind class lists in the order produced by `prettier-plugin-tailwindcss`. Use server components by default; add `"use client"` only where browser state or effects require it.

## Testing Guidelines

No automated test framework or coverage target is configured. For every change, run lint, formatting checks, and a production build. Manually verify affected routes at `/en`, `/fa`, and `/ar`, including RTL layout. When introducing tests, place them beside the code or in `src/**/__tests__/` and name them `*.test.ts(x)`.

## Commits & Pull Requests

Every commit message must use the format `YYYY/MM/DD HH:MM - concise English summary`, using the commit's local date and time converted to the Persian Hijri (Jalali) calendar, followed by a hyphen and an English summary.

Keep summaries concise and focused on the user-visible change.

Pull requests should describe the user-visible change, list validation run, link the issue when available, and include screenshots or a recording for visual, responsive, or RTL changes. Note translation, environment, and migration impacts.
