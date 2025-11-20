# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

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
- **License**: Released under GNU GPL v3.0.
