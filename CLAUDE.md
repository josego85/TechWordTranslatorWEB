# CLAUDE.md — TechWordTranslatorWEB

## Stack

| Layer | Tech |
|---|---|
| Framework | Next.js 16.2.0 (App Router) |
| UI | React 19.2.0 + Tailwind CSS v4 + shadcn/ui (new-york style) |
| State | TanStack Query v5 (server state) + next-themes (dark mode) |
| i18n | next-intl v4 — en, es, de |
| Forms | react-hook-form v7 + zod v4 |
| Icons | lucide-react |
| Lint/Format | Biome 2.2.0 (replaces ESLint + Prettier) |
| Language | TypeScript 5, strict mode |

---

## Commands

```bash
npm run dev          # dev server
npm run build        # production build
npm run lint         # biome check (read-only)
npm run format       # biome format --write (auto-fix format)
npm run pre-commit   # lint-staged (same as pre-commit hook)
```

> No test suite in this project. Lint + build must pass before committing.

---

## Environment

```bash
cp .env.example .env.local
# NEXT_PUBLIC_API_URL=http://localhost:8000/api/v1
```

The API is the Laravel app in `../TechWordTranslatorAPI/` — run it via Docker.

---

## Architecture

### Routing

All routes live under `src/app/[locale]/` — the `[locale]` segment is handled by next-intl middleware.

```
/             → app/[locale]/page.tsx
/words        → app/[locale]/words/page.tsx
/words/:id    → app/[locale]/words/[id]/page.tsx
```

**Never use `next/navigation` directly.** Use the i18n-aware wrappers:
```typescript
import { Link, useRouter, usePathname } from "@/i18n/routing";
```

### URL params pattern

All interactive state (search, filter, pagination) lives in the URL — no local state. This keeps views bookmarkable and shareable.

```typescript
const searchParams = useSearchParams();
const pathname = usePathname();
const router = useRouter();

const params = new URLSearchParams(searchParams);
params.set("category", value);
params.set("page", "1"); // always reset page when filter changes
router.replace(`${pathname}?${params.toString()}`);
```

### Data fetching

Use React Query hooks — never fetch directly in components.

```typescript
// src/lib/api/hooks/use-words.ts
const { data, isLoading, error } = useWords(page, search, category, sort);
```

Query key factory (`wordKeys`) must include every variable that changes the result:
```typescript
list: (page, search, category, sort) => [...wordKeys.lists(), page, search, category, sort]
```

### Component layers

```
app/[locale]/           ← pages: layout + composition only
components/layout/      ← Navbar, PageContainer (structural)
components/words/       ← domain components (WordCard, FilterBar…)
components/home/        ← home page sections
components/ui/          ← base Radix/shadcn primitives
```

Rule: `ui/` components are generic and reusable. `words/` and `home/` components are domain-specific.

---

## Design System

Use constants from `src/constants/design-tokens.ts` — do not hardcode spacing or typography:

```typescript
import { CONTAINER, TYPOGRAPHY, LAYOUT, TRANSITIONS } from "@/constants/design-tokens";

<h1 className={TYPOGRAPHY.h1}>...</h1>
<div className={CONTAINER.spacing.section}>...</div>
<PageContainer maxWidth="content">...</PageContainer>  // full | content | narrow
```

`PageContainer` wraps every page — use it instead of raw `<section>` + padding.

---

## Types

All shared types live in `src/types/` and are barrel-exported from `src/types/index.ts`.

```typescript
import type { WordWithTranslations, Category, PaginatedResponse, ViewMode } from "@/types";
```

**Rule:** Props interfaces and local-only types stay in the component file. Only types shared across 2+ files go to `src/types/`.

---

## i18n

Translation keys live in `src/i18n/locales/{en,es,de}.json`. Three top-level namespaces: `Common`, `Home`, `Words`.

```typescript
const t = useTranslations("Words");
t("title")                              // simple key
t(`category.${slug}` as Parameters<typeof t>[0])  // dynamic key (cast required)
```

**When adding keys:** always add to all three locale files simultaneously. Structure mirrors across all three — same keys, different values.

---

## Categories

13 predefined slugs: `networking`, `databases`, `security`, `algorithms`, `data-structures`, `operating-systems`, `programming-languages`, `web`, `cloud`, `devops`, `hardware`, `artificial-intelligence`, `other`.

Config (icon + color) lives in `src/constants/categories.ts`. Use `CategoryBadge` to render:

```typescript
import { CategoryBadge } from "@/components/words/category-badge";
<CategoryBadge slug={cat.slug} name={cat.name} />
```

---

## API Client

```typescript
import { apiClient } from "@/lib/api/client";
// Base URL: NEXT_PUBLIC_API_URL (default: http://localhost:8000/api/v1)
// Throws ApiError on non-2xx responses
```

Public endpoints (no auth): `getWords`, `getWord`.
Write endpoints require a JWT Bearer token passed explicitly.

---

## Code Quality

### Pre-commit hook

husky + lint-staged run `biome check --write` on staged files before every commit. This auto-fixes format and import order. If a non-fixable lint error is found, the commit is blocked.

### Biome rules

- Import order: external → internal (`@/`) — enforced automatically
- No explicit `any` (use `unknown` or a proper type)
- One exception: dynamic locale validation needs `as any` — add `// biome-ignore lint/suspicious/noExplicitAny: <reason>`

### CI checks (GitHub Actions)

All three must pass before merging:
1. `npm run lint` — Biome check
2. `npm run build` — Next.js build with `NEXT_PUBLIC_API_URL`

Workflows: `ci.yml` (push), `pr.yml` (PRs to main), `security.yml` (weekly audit + CodeQL), `release.yml` (on `v*.*.*` tags).

---

## Common Pitfalls

- **`next/link` vs `@/i18n/routing` Link**: always use the i18n one or locale prefix is lost
- **Biome import order fails CI**: VS Code auto-fixes on save locally — but files written by tools (AI, scripts) need `npm run format` before committing
- **`wordKeys.list()`** must include all query variables or React Query serves stale cache
- **Page reset on filter change**: always `params.set("page", "1")` when changing search/category/sort
- **`staleTime: 60_000`** in QueryClient — data is fresh for 1 min, no refetch on mount during that window
