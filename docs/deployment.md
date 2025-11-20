# Deployment

Guide for deploying TechWordTranslator Web to production.

## Vercel (Recommended)

The easiest way to deploy Next.js applications is via [Vercel](https://vercel.com).

### 1. Import Project

1. Push your code to GitHub/GitLab/Bitbucket.
2. Log in to Vercel and "Add New Project".
3. Select your repository.

### 2. Configure Build

Vercel automatically detects Next.js. Default settings usually work:

- **Framework Preset**: Next.js
- **Build Command**: `next build`
- **Output Directory**: `.next`

### 3. Environment Variables

Go to **Settings > Environment Variables** in Vercel and add:

| Variable | Description | Example |
|----------|-------------|---------|
| `NEXT_PUBLIC_API_URL` | URL of your production Laravel API | `https://api.yourdomain.com/api/v1` |

> **Important**: Ensure your API allows CORS requests from your Vercel domain.

### 4. Deploy

Click **Deploy**. Vercel will build and deploy your application.

## Docker Deployment

You can containerize the application for deployment on any platform (AWS, DigitalOcean, etc.).

### Dockerfile

Create a `Dockerfile` in the root:

```dockerfile
FROM node:20-alpine AS base

# Install dependencies only when needed
FROM base AS deps
WORKDIR /app
COPY package.json package-lock.json* ./
RUN npm ci

# Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
ENV NEXT_TELEMETRY_DISABLED 1
RUN npm run build

# Production image, copy all the files and run next
FROM base AS runner
WORKDIR /app
ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public

# Set the correct permission for prerender cache
RUN mkdir .next
RUN chown nextjs:nodejs .next

# Automatically leverage output traces to reduce image size
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000
ENV PORT 3000
ENV HOSTNAME "0.0.0.0"

CMD ["node", "server.js"]
```

### Build and Run

```bash
docker build -t tech-word-translator-web .
docker run -p 3000:3000 -e NEXT_PUBLIC_API_URL=https://api.example.com/api/v1 tech-word-translator-web
```

## Static Export (Optional)

If you don't need server-side features (like dynamic headers or cookies), you can export as a static site.

1. Update `next.config.ts`:
   ```typescript
   const nextConfig = {
     output: 'export',
   };
   ```

2. Run build:
   ```bash
   npm run build
   ```

3. The `out` directory will contain static files to host on Nginx, S3, GitHub Pages, etc.

> **Note**: `next-intl` middleware requires a server. For static export, you might need additional configuration or lose automatic locale detection.

## Performance Optimization

- **Caching**: Next.js automatically caches fetch requests.
- **Image Optimization**: Use `next/image`.
- **Bundle Analysis**: Run `npm run build` to see bundle sizes.
