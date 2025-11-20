# Architecture Overview

Project structure, design decisions, and architectural patterns.

## Project Structure

```
src/
├── app/
│   ├── [locale]/          # Internationalized routes
│   │   ├── layout.tsx     # Root layout with providers
│   │   ├── page.tsx       # Home page
│   │   └── words/         # Words pages
│   └── globals.css        # Global styles
├── components/
│   ├── ui/                # shadcn/ui components
│   ├── layout/            # Layout components (PageContainer, Navbar)
│   ├── home/              # Home page components
│   └── words/             # Words-specific components
├── constants/
│   └── design-tokens.ts   # Design system constants
├── i18n/
│   ├── config.ts          # Locale configuration
│   ├── request.ts         # next-intl config
│   ├── routing.ts         # Routing helpers
│   └── locales/           # Translation files
│       ├── en.json
│       ├── es.json
│       └── de.json
├── lib/
│   ├── api/
│   │   ├── client.ts      # API client
│   │   ├── words.ts       # Words API endpoints
│   │   └── hooks/         # React Query hooks
│   └── utils.ts           # Utility functions
├── providers/
│   └── query-provider.tsx # React Query provider
└── types/
    ├── index.ts           # Barrel export
    ├── word.ts            # Domain types
    ├── api.ts             # API response types
    └── ui.ts              # Shared UI types
```

## Design Decisions

### Why `/constants` for Design Tokens?

Design tokens are **static configuration** for the design system. They belong in `/constants` rather than `/lib` because:
- `/lib` is for utilities (functions)
- `/constants` is for configuration (data)
- **SRP**: Separation of data from behavior

### Why `/types` Centralized?

Shared types are centralized to:
- **DRY**: Single source of truth
- **Type Safety**: Consistent interfaces across the app
- **Discoverability**: Easy to find domain types

Component-specific types (props) remain **local** next to their components.

### Why `/i18n/locales` Together?

High cohesion: All internationalization concerns in one place.
- Config + translations together
- Easy to add new languages
- Clear module boundary

## Tech Stack Rationale

### Next.js 16 + App Router

- **Server Components by default** → Better performance
- **Streaming SSR** → Faster perceived load time
- **Turbopack** → 2-5x faster builds

### React 19 + Compiler

- **Automatic memoization** → No manual optimization needed
- **Server Actions** → Type-safe API calls
- **use() hook** → Simplified async

### TanStack Query

- **Declarative data fetching**
- **Automatic caching & revalidation**
- **Optimistic updates**

### shadcn/ui

- **Copy-paste components** → Full control
- **Radix UI primitives** → Accessibility built-in
- **Tailwind-based** → Customizable

## Patterns

### Server vs Client Components

**Server Components (default):**
- Fetch data on server
- No JavaScript bundle
- Better SEO

**Client Components (`"use client"`):**
- Interactive UI
- React hooks
- Browser APIs

### Data Fetching Pattern

```tsx
// Server Component
async function WordsPage() {
  const words = await getWords(); // Direct API call
  return <WordsList words={words} />;
}

// Client Component with hooks
'use client';
function WordsList() {
  const { data } = useWords(); // React Query hook
  return <div>{/* ... */}</div>;
}
```

## Type System

### Centralized Types (`/types`)

- `Word`, `Translation`, `WordWithTranslations` → Domain models
- `PaginatedResponse<T>` → Generic API responses
- `ViewMode` → Shared UI types

### Local Types

- Component Props → Next to component
- Module-specific enums → In module file

## Design System

### Design Tokens (`/constants/design-tokens.ts`)

Centralized constants for:
- Container sizing and padding
- Typography scales
- Layout utilities
- Transitions

### Usage

```tsx
import { CONTAINER, TYPOGRAPHY } from '@/constants/design-tokens';

<h1 className={TYPOGRAPHY.h1}>Title</h1>
<section className={CONTAINER.padding}>...</section>
```

**Benefits:**
- Single source of truth
- Easy theme changes
- Consistent spacing

## Folder Philosophy

**Golden Rules:**
1. **High cohesion**: Related code together
2. **Single Responsibility**: One purpose per folder/file
3. **Locality of Reference**: Code used together lives together
4. **DRY**: No duplication

**Example:** `/i18n` contains ALL i18n concerns (config + translations).
