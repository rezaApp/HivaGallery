# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

## Architecture notes (supplementing AGENTS.md)

**Next.js 16 breaking change — `proxy.ts`, not `middleware.ts`.** Locale routing lives in `src/proxy.ts` (not `middleware.ts` — that file no longer exists in this version; Middleware was renamed to Proxy in Next.js 16, same behavior). It wraps `next-intl`'s `createMiddleware(routing)`. Before relying on any Next.js API, check `node_modules/next/dist/docs/` for this version's conventions rather than assuming prior Next.js knowledge, per `AGENTS.md`.

**i18n plumbing** (`src/i18n/`):

- `routing.ts` — defines locales (`en`, `fa`, `ar`), default locale `fa` (no URL prefix), `localePrefix: "as-needed"`.
- `navigation.ts` — re-exports `Link`, `useRouter`, `usePathname`, `redirect`, `permanentRedirect` from `createNavigation(routing)`. Always import these instead of `next/link` or `next/navigation`.
- `request.ts` — resolves the active locale and loads `messages/<locale>.json` for `next-intl`'s server config.
- `src/app/[locale]/layout.tsx` wires `NextIntlClientProvider`, a `DirectionProvider` (RTL/LTR), and `Providers` (theme, etc.) around every page, and renders the shared `Header`.

**State and data layers:**

- `src/store/` — Zustand stores: `auth.ts` (persisted mock auth + mock OTP flow — `MOCK_USER`/`MOCK_OTP`), `cart.ts`, `addresses.ts`, `locale.ts`, `theme.ts`, `toast.ts`. Persisted stores must stay client components.
- `src/lib/` — non-component logic: `auth.ts`, `account-data.ts`, `mock-products.ts`, `product-data.ts` (all mock data, no backend), `currency.ts`, `seo.ts`, `utils.ts` (includes `cn`), and `validations/` (Zod schemas for `auth`, `checkout`, `contact` forms, paired with the `validation` message namespace).
- `src/types/` — shared types, with request/response shapes under `types/dto/`.
- There is one real backend integration: `src/app/api/auth/[...nextauth]` (NextAuth). Everything else under `account`/`checkout`/`products` is mock data behind `src/lib`/`src/store` — don't assume a server session or real persistence without adding that integration deliberately.

**Path alias:** `@/*` maps to `src/*` (see `tsconfig.json`).
