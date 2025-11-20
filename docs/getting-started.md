# Getting Started

Complete setup guide for TechWordTranslator Web.

## Prerequisites

- **Node.js** 20.9 or higher
- **npm**, **pnpm**, or **yarn**
- **Laravel API** running ([TechWordTranslatorAPI](https://github.com/josego85/TechWordTranslatorAPI))

## Installation

### 1. Clone and Install

```bash
git clone https://github.com/josego85/TechWordTranslatorWEB.git
cd TechWordTranslatorWEB
npm install
```

### 2. Environment Configuration

Copy the example environment file:

```bash
cp .env.example .env.local
```

Edit `.env.local` and configure the API URL:

```env
NEXT_PUBLIC_API_URL=http://localhost:8000/api/v1
```

> **Note:** The API URL should point to your running Laravel backend.

### 3. Run Development Server

```bash
npm run dev
```

The application will be available at:
- English: http://localhost:3000/en
- Spanish: http://localhost:3000/es
- German: http://localhost:3000/de

### 4. Build for Production

```bash
npm run build
npm run start
```

## Troubleshooting

### API Connection Issues

If you see "Failed to fetch" errors:
1. Verify the API is running: `curl http://localhost:8000/api/health`
2. Check CORS configuration in Laravel API
3. Verify `NEXT_PUBLIC_API_URL` in `.env.local`

### Port Already in Use

If port 3000 is busy:
```bash
PORT=3001 npm run dev
```

### Turbopack Issues

If you encounter build errors with Turbopack, try:
```bash
rm -rf .next
npm run dev
```

## Next Steps

- [Architecture Overview](./architecture.md)
- [Development Guide](./development.md)
- [API Integration](./api-integration.md)
