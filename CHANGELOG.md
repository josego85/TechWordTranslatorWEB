# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

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
