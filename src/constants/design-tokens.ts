/**
 * Design Tokens - Single Source of Truth for Design System
 *
 * PURE CONSTANTS ONLY - No logic, no functions
 * Following SRP (Single Responsibility Principle)
 *
 * Change these values to update the entire app's design
 */

export const CONTAINER = {
  // Responsive padding for pages
  padding: "px-4 py-8 sm:px-6 sm:py-12 lg:px-8" as const,

  // Max widths for different content types
  maxWidth: {
    full: "max-w-7xl" as const, // Full width content (dashboards, lists)
    content: "max-w-4xl" as const, // Article/detail pages
    narrow: "max-w-2xl" as const, // Forms, focused content
  },

  // Vertical spacing
  spacing: {
    section: "space-y-6" as const,
    sectionLarge: "space-y-8" as const,
  },
} as const;

export const TYPOGRAPHY = {
  // Headings with responsive scaling
  h1: "text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl" as const,
  h2: "text-2xl font-bold sm:text-3xl lg:text-4xl" as const,
  h3: "text-xl font-semibold sm:text-2xl" as const,

  // Body text
  body: "text-base" as const,
  bodyLarge: "text-lg" as const,
  bodySmall: "text-sm" as const,

  // Special text
  muted: "text-muted-foreground" as const,
  lead: "text-lg text-muted-foreground" as const,
} as const;

export const LAYOUT = {
  // Flexbox utilities
  flexBetween: "flex items-center justify-between" as const,
  flexCenter: "flex items-center justify-center" as const,
  flexCol: "flex flex-col" as const,

  // Grid utilities
  gridCols: {
    responsive:
      "grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4" as const,
    cards: "grid gap-4 md:grid-cols-3" as const,
  },
} as const;

export const TRANSITIONS = {
  default: "transition-all duration-300" as const,
  fast: "transition-all duration-150" as const,
  slow: "transition-all duration-500" as const,
} as const;
