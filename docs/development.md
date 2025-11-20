# Development Guide

Best practices, patterns, and guidelines for development.

## Available Scripts

```bash
npm run dev          # Start development server (Turbopack)
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run Biome linter
npm run format       # Format code with Biome
```

## TypeScript Guidelines

### Strict Mode

The project uses **strict TypeScript**. All types must be explicitly defined.

### Type Imports

Use `type` imports for types:

```tsx
import type { Word } from '@/types';
import { getWords } from '@/lib/api/words';
```

### Avoid `any`

Never use `any`. Use `unknown` if type is truly unknown:

```tsx
// ❌ Bad
function parse(data: any) { }

// ✅ Good
function parse(data: unknown) {
  if (typeof data === 'string') {
    // Type narrowing
  }
}
```

## React Patterns

### Server vs Client Components

**Use Server Components by default:**

```tsx
// app/page.tsx
export default async function Page() {
  const data = await fetchData(); // Direct API call
  return <UI data={data} />;
}
```

**Use Client Components only when needed:**

```tsx
'use client';

import { useState } from 'react';

export function InteractiveComponent() {
  const [state, setState] = useState(0);
  return <button onClick={() => setState(s => s + 1)}>{state}</button>;
}
```

### React Compiler

**Automatic optimization is enabled.** Avoid manual optimization unless profiling shows a problem.

❌ **Don't** use these unless necessary:
- `useMemo`
- `useCallback`
- `memo()`

The compiler handles this automatically.

## Styling Guidelines

### Tailwind CSS

Use utility classes:

```tsx
<div className="flex items-center gap-4 rounded-lg bg-card p-6">
  <h2 className="text-2xl font-bold">Title</h2>
</div>
```

### Design Tokens

For repeated patterns, use design tokens:

```tsx
import { CONTAINER, TYPOGRAPHY } from '@/constants/design-tokens';

<h1 className={TYPOGRAPHY.h1}>Title</h1>
```

### shadcn/ui Components

Prefer shadcn/ui components over custom ones:

```tsx
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
```

Add new components as needed:

```bash
npx shadcn@latest add dialog
npx shadcn@latest add dropdown-menu
```

### Dark Mode

All components support dark mode automatically via CSS variables.

```tsx
// Light: bg-background, text-foreground
// Dark: Automatically switches
<div className="bg-background text-foreground">Content</div>
```

## Code Organization

### Component Structure

```tsx
'use client'; // Only if needed

import { } from '...'; // External
import { } from '@/...'; // Internal
import type { } from '@/types'; // Types

interface ComponentProps {
  // Props definition
}

export function Component({ }: ComponentProps) {
  // Logic
  return (
    // JSX
  );
}
```

### File Naming

- **Components**: PascalCase (`WordCard.tsx`)
- **Utilities**: camelCase (`apiClient.ts`)
- **Types**: camelCase (`word.ts`)
- **Constants**: camelCase (`design-tokens.ts`)

### Barrel Exports

Use `index.ts` for barrel exports:

```tsx
// types/index.ts
export * from './word';
export * from './api';
export * from './ui';
```

## Adding New Features

### 1. Add Types

```tsx
// types/feature.ts
export interface Feature {
  id: number;
  name: string;
}
```

### 2. Add API Endpoint

```tsx
// lib/api/features.ts
import type { Feature } from '@/types';

export const getFeatures = async (): Promise<Feature[]> => {
  return apiClient('/features');
};
```

### 3. Create Hook

```tsx
// lib/api/hooks/use-features.ts
import { useQuery } from '@tanstack/react-query';
import { getFeatures } from '../features';

export function useFeatures() {
  return useQuery({
    queryKey: ['features'],
    queryFn: getFeatures,
  });
}
```

### 4. Add Component

```tsx
// components/features/feature-list.tsx
'use client';

import { useFeatures } from '@/lib/api/hooks/use-features';

export function FeatureList() {
  const { data, isLoading } = useFeatures();
  
  if (isLoading) return <div>Loading...</div>;
  
  return (
    <ul>
      {data?.map(feature => (
        <li key={feature.id}>{feature.name}</li>
      ))}
    </ul>
  );
}
```

## Testing (Future)

The project is ready for testing with:
- **Vitest** for unit tests
- **Playwright** for E2E tests

## Performance Tips

### 1. Use Server Components

Fetch data on server when possible → Less JavaScript to client.

### 2. Dynamic Imports

Code-split heavy components:

```tsx
import dynamic from 'next/dynamic';

const HeavyComponent = dynamic(() => import('./HeavyComponent'), {
  loading: () => <p>Loading...</p>
});
```

### 3. Image Optimization

Use Next.js `Image` component:

```tsx
import Image from 'next/image';

<Image 
  src="/image.png" 
  alt="Description" 
  width={500} 
  height={300} 
/>
```

## Debugging

### React DevTools

Install extension and use Components/Profiler tabs.

### Network Tab

Check API calls in browser DevTools → Network.

### Next.js DevTools

Available at: `/_next/devtools` in development.

## Common Patterns

### Conditional Rendering

```tsx
{isLoading && <Spinner />}
{error && <ErrorMessage error={error} />}
{data && <Content data={data} />}
```

### Lists with Keys

```tsx
{items.map(item => (
  <Item key={item.id} {...item} />
))}
```

### Forms

Use React Hook Form (to be added):

```tsx
import { useForm } from 'react-hook-form';

function Form() {
  const { register, handleSubmit } = useForm();
  
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register('name')} />
      <button type="submit">Submit</button>
    </form>
  );
}
```
