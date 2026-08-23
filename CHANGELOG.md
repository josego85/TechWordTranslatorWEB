# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [0.4.4] - 2026-08-23

### Security

- **High**: Updated Next.js to 16.3.2 to fix multiple vulnerabilities: Middleware/Proxy bypass in App Router applications using Turbopack and single locale ([GHSA-6gpp-xcg3-4w24](https://github.com/advisories/GHSA-6gpp-xcg3-4w24)), Denial of Service in Server Actions ([GHSA-m99w-x7hq-7vfj](https://github.com/advisories/GHSA-m99w-x7hq-7vfj)), SSRF in Server Actions on custom servers ([GHSA-89xv-2m56-2m9x](https://github.com/advisories/GHSA-89xv-2m56-2m9x)), unauthenticated disclosure of internal Server Function endpoints ([GHSA-955p-x3mx-jcvp](https://github.com/advisories/GHSA-955p-x3mx-jcvp)), and others.
- **High**: Forced postcss to `8.5.26` via `overrides` to fix arbitrary file read and path traversal via attacker-controlled `sourceMappingURL` in CSS comments ([GHSA-6g55-p6wh-862q](https://github.com/advisories/GHSA-6g55-p6wh-862q), [GHSA-fxqj-rqcc-2cmp](https://github.com/advisories/GHSA-fxqj-rqcc-2cmp), [GHSA-r28c-9q8g-f849](https://github.com/advisories/GHSA-r28c-9q8g-f849)) — the previous `8.5.10` pin (set in 0.4.2) had itself become vulnerable.
- **High**: Resolved nanoid infinite-loop DoS with negative/zero size via `npm audit fix` ([GHSA-28wg-ghj8-5hjv](https://github.com/advisories/GHSA-28wg-ghj8-5hjv), [GHSA-2v37-7h3g-55p8](https://github.com/advisories/GHSA-2v37-7h3g-55p8)).
- **High**: Resolved sharp's inherited libvips vulnerabilities (CVE-2026-33327, CVE-2026-33328, CVE-2026-35590, CVE-2026-35591) via the Next.js bump.

### Changed

- Bumped minimum required Node.js to `>=20.9.0` (required by Next.js 16.3.2); added `.nvmrc` pinning Node 20.
- Added `AGENTS.md` to `.gitignore` — Next.js 16.3+ auto-generates/maintains this file on `next dev` for AI coding agent docs.

---

## [0.4.3] - 2026-05-16

### Security

- **High**: Updated Next.js to 16.2.6 to fix multiple vulnerabilities: Denial of Service with Server Components ([GHSA-8h8q-6873-q5fj](https://github.com/advisories/GHSA-8h8q-6873-q5fj)), Middleware/Proxy bypass via segment-prefetch routes ([GHSA-267c-6grr-h53f](https://github.com/advisories/GHSA-267c-6grr-h53f)), cache poisoning via React Server Component responses ([GHSA-wfc6-r584-vfw7](https://github.com/advisories/GHSA-wfc6-r584-vfw7)), and others.

### Changed

- Renamed `src/middleware.ts` → `src/proxy.ts` to follow Next.js 16 convention (the `middleware` file name is deprecated in favor of `proxy`).

---

## [0.4.2] - 2026-05-09

### Security

- **Moderate**: Updated next-intl to 4.11.1 to fix prototype pollution via `experimental.messages.precompile` ([GHSA-4c35-wcg5-mm9h](https://github.com/advisories/GHSA-4c35-wcg5-mm9h)).
- **Low**: Updated icu-minify via `npm audit fix` to fix DoS via unsanitized prototype lookup ([GHSA-r27j-894h-3w3p](https://github.com/advisories/GHSA-r27j-894h-3w3p)).
- **Moderate**: Forced postcss to `^8.5.10` via `overrides` to fix XSS via unescaped `</style>` in CSS Stringify output ([GHSA-qx2v-qp2m-jg93](https://github.com/advisories/GHSA-qx2v-qp2m-jg93)) — Next.js pins `postcss@8.4.31` internally; the override deduplicates to the safe root copy (`8.5.14`) without downgrading Next.js.

---

## [0.4.1] - 2026-04-13

### Security

- **High**: Updated Next.js to 16.2.3 to fix Denial of Service vulnerability with Server Components ([GHSA-q4gf-8mx6-v5v3](https://github.com/advisories/GHSA-q4gf-8mx6-v5v3)).
- **Moderate**: Updated next-intl to ^4.9.1 to fix open redirect vulnerability ([GHSA-8f24-v5vv-gm5j](https://github.com/advisories/GHSA-8f24-v5vv-gm5j)).

---

## [0.4.0] - 2026-04-09

### Added

- **Categories**: Visual category badges on word cards and word detail page, with distinct icon and color per category (13 total)
- **Filtering**: Category dropdown in filter bar synced to URL param `?category=` — filters via API, bookmarkable and shareable
- **i18n**: Category names translated in EN, ES, and DE
- **UI**: New `Badge` component and `CategoryBadge` component with dark mode support
- **DX**: Pre-commit hook with husky + lint-staged — runs `biome check --write` on staged files before every commit
- **Docs**: Added `CLAUDE.md` with architecture reference, conventions, and common pitfalls for AI-assisted development

### Changed

- **CI**: Bumped GitHub Actions dependencies to latest major versions ([#5](https://github.com/josego85/TechWordTranslatorWEB/pull/5))
  - `actions/checkout` v4 → v6
  - `actions/setup-node` v4 → v6
  - `actions/upload-artifact` v4 → v6
  - `github/codeql-action` v3 → v4
- **Docs**: `docs/api-integration.md` — `useWords` hook documenta los 4 parámetros (`page`, `search`, `category`, `sort`) y la regla de leerlos siempre desde URL params

### Fixed

- **Sort**: Sort by (A-Z / Z-A) in words list had no effect — the select called an unconnected prop callback instead of updating URL params; now synced to `?sort=` and propagated through `useWords` to the API

### Removed

- **Sort**: Removed "Newest first" and "Oldest first" sort options — not useful for a dictionary; `created_at` ordering has no meaningful value for end users browsing technical terms

---

## [0.3.1] - 2026-03-18

### Security
- **Moderate**: Updated Next.js from 16.1.6 to 16.2.0 to fix moderate severity vulnerabilities:
  - Null origin can bypass Server Actions CSRF checks ([GHSA-mq59-m269-xvcx](https://github.com/advisories/GHSA-mq59-m269-xvcx))
  - Null origin can bypass dev HMR websocket CSRF checks ([GHSA-jcc7-9wpm-mj36](https://github.com/advisories/GHSA-jcc7-9wpm-mj36))
  - HTTP request smuggling in rewrites ([GHSA-ggv3-7p47-pfv8](https://github.com/advisories/GHSA-ggv3-7p47-pfv8))
  - Unbounded `next/image` disk cache growth can exhaust storage ([GHSA-3x4c-7xq6-9pq8](https://github.com/advisories/GHSA-3x4c-7xq6-9pq8))
  - Unbounded postponed resume buffering can lead to DoS ([GHSA-h27x-g6w4-24gq](https://github.com/advisories/GHSA-h27x-g6w4-24gq))

---

## [0.3.0] - 2026-02-07

### Added
- **CI/CD**: Complete GitHub Actions workflow suite
  - `ci.yml`: Continuous integration (lint, build) on push to main and feature branches
  - `pr.yml`: Pull request validation with lint and build checks
  - `release.yml`: Automated GitHub releases on version tags with changelog generation
  - `security.yml`: Security scanning with npm audit and CodeQL analysis
- **Security**: Dependabot configuration for automated dependency updates
  - Weekly npm dependency updates (grouped by minor/patch)
  - Weekly GitHub Actions updates
  - Automatic PR creation with proper labels and commit prefixes

### Fixed
- **CI/CD**: Fix Dependabot configuration by removing invalid registries section

### Security
- **High**: Updated Next.js from 16.1.1 to 16.1.6 to fix high severity vulnerabilities:
  - DoS via Image Optimizer remotePatterns configuration ([GHSA-9g9p-9gw9-jx7f](https://github.com/advisories/GHSA-9g9p-9gw9-jx7f))
  - HTTP request deserialization can lead to DoS when using insecure React Server Components ([GHSA-h25m-26qc-wcjf](https://github.com/advisories/GHSA-h25m-26qc-wcjf))
  - Unbounded Memory Consumption via PPR Resume Endpoint ([GHSA-5f7q-jpqc-wp7h](https://github.com/advisories/GHSA-5f7q-jpqc-wp7h))

---

## [0.2.1] - 2026-01-04

### Security
- **Critical**: Updated Next.js from 16.0.7 to 16.1.1 to fix high severity vulnerabilities:
  - Next Server Actions Source Code Exposure ([GHSA-w37m-7fhw-fmv9](https://github.com/advisories/GHSA-w37m-7fhw-fmv9))
  - Next Vulnerable to Denial of Service with Server Components ([GHSA-mwv6-3258-q52c](https://github.com/advisories/GHSA-mwv6-3258-q52c))

### Changed
- **Dependencies**: Updated package version to 0.2.1
- **Dependencies**: Added `baseline-browser-mapping` dependency (^2.8.3) from Next.js 16.1.1
- **Code Quality**: Improved formatting in word type guards for better readability

---

## [0.2.0] - 2025-12-05

### Added
- **Documentation**: Professional screenshot gallery showcasing application features
  - 10 desktop screenshots (light/dark modes, multiple languages)
  - 2 mobile responsive screenshots
  - Organized in `/docs/screenshots/` with descriptive filenames
  - Complete gallery page with categorized sections
- **README**: Enhanced main README with visual preview section
  - Hero screenshot highlighting main interface
  - Side-by-side feature demonstration (grid view + dark mode)
  - Clean, borderless layout following modern UI/UX best practices
  - Link to full screenshot gallery

### Changed
- Improved repository presentation for better first impressions
- Applied professional naming convention to all screenshot files

---

## [0.1.1] - 2025-12-04

### Security
- **Critical**: Updated Next.js from 16.0.3 to 16.0.7 to fix RCE vulnerability in React flight protocol ([GHSA-9qr9-h5gf-34mp](https://github.com/advisories/GHSA-9qr9-h5gf-34mp))

### Changed
- **Code Quality**: Comprehensive linting audit (0 errors/warnings)
- **A11y**: Improved accessibility with proper ARIA roles for flags
- **Performance**: Optimized React rendering by replacing array index keys with unique IDs
- **Type Safety**: Enhanced word types with documentation and helper functions
  - Added API response structure comments after database normalization
  - Added ISO 639-1 language code documentation
  - Implemented `hasTranslations()` type guard for safer type narrowing
  - Implemented `getTranslationByLanguage()` helper for language-specific lookups
- **Refactor**: Removed unused imports/variables and enforced strict typing (replaced `any`)

---

## [0.1.0] - 2025-11-20

### Added
- **Core**: Initial release with Next.js 16, React 19, and TypeScript.
- **i18n**: Full internationalization support (EN, ES, DE) with automatic routing.
- **UI/UX**: Modern interface using Tailwind CSS 4 and shadcn/ui components.
- **Features**:
  - Real-time word search and filtering.
  - Grid/Table view toggle with persistence.
  - Detailed word view with translations.
  - Dark mode support.
- **Architecture**:
  - Centralized API client with TanStack Query.
  - Modular design system with tokens in `/constants`.
  - Strict type safety with centralized `/types` to enforce DRY.
- **Documentation**: Comprehensive guides in `/docs` and simplified README (SRP applied).
- **Config**: Added `.env.example` to repository for easier setup.
- **License**: Released under GNU GPL v3.0.
