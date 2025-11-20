# API Integration

Guide to integrating with the TechWordTranslator API using the built-in client and hooks.

## Overview

The project uses a centralized API client based on `fetch` and custom React Query hooks for data fetching.

- **Base URL**: Configured via `NEXT_PUBLIC_API_URL`
- **Authentication**: Bearer token (handled in hooks)
- **State Management**: TanStack Query (React Query)

## API Client

The core client is located at `src/lib/api/client.ts`. It handles:
- Base URL configuration
- Default headers (Content-Type, Accept)
- Error handling (throwing errors on non-2xx responses)

```typescript
import { apiClient } from "@/lib/api/client";

// Direct usage (Server Components)
const data = await apiClient("/endpoint");
```

## Available Hooks

Hooks are located in `src/lib/api/hooks/`.

### useWords

Fetch a paginated list of words.

```typescript
import { useWords } from "@/lib/api/hooks/use-words";

const { data, isLoading, error } = useWords(page, search);
```

- **page**: `number` (default: 1)
- **search**: `string` (optional)
- **Returns**: `PaginatedResponse<WordWithTranslations>`

### useWord

Fetch a single word by ID.

```typescript
import { useWord } from "@/lib/api/hooks/use-words";

const { data: word, isLoading } = useWord(id);
```

- **id**: `number`
- **Returns**: `WordWithTranslations`

### useCreateWord

Create a new word (requires authentication).

```typescript
import { useCreateWord } from "@/lib/api/hooks/use-words";

const mutation = useCreateWord(token);

mutation.mutate({ word: "New Word" });
```

### useUpdateWord

Update an existing word.

```typescript
import { useUpdateWord } from "@/lib/api/hooks/use-words";

const mutation = useUpdateWord(token);

mutation.mutate({ 
  id: 123, 
  data: { word: "Updated Word" } 
});
```

### useDeleteWord

Delete a word.

```typescript
import { useDeleteWord } from "@/lib/api/hooks/use-words";

const mutation = useDeleteWord(token);

mutation.mutate(123);
```

## Adding New Endpoints

Follow this workflow to add new API integration:

### 1. Define Types

Add response types in `src/types/api.ts` or `src/types/domain.ts`.

```typescript
// src/types/domain.ts
export interface Category {
  id: number;
  name: string;
}
```

### 2. Create API Function

Add the fetch function in `src/lib/api/categories.ts`.

```typescript
import { apiClient } from "./client";
import type { Category } from "@/types";

export const getCategories = async (): Promise<Category[]> => {
  return apiClient("/categories");
};
```

### 3. Create React Query Hook

Add the hook in `src/lib/api/hooks/use-categories.ts`.

```typescript
import { useQuery } from "@tanstack/react-query";
import { getCategories } from "../categories";

export function useCategories() {
  return useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
  });
}
```

## Error Handling

The `apiClient` throws errors automatically for non-2xx responses. React Query catches these errors.

```tsx
const { error, isError } = useWords();

if (isError) {
  return <div>Error: {error.message}</div>;
}
```

## Authentication

For protected endpoints, pass the JWT token to the hook or API function.

```typescript
// In API function
headers: {
  Authorization: `Bearer ${token}`,
}
```

Currently, the token is expected to be passed from the component/page. Future improvements may include a centralized auth provider.
