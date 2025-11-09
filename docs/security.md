# Security Documentation

## Security Headers

Configured in `src/index.html`:

- `X-Content-Type-Options: nosniff`
- `X-Frame-Options: DENY`
- `X-XSS-Protection: 1; mode=block`
- `Referrer-Policy: strict-origin-when-cross-origin`
- `Permissions-Policy: camera=(), microphone=(), geolocation=()`

### Route Protection

- Guard: `SecurityGuard` (`src/app/core/guards/security.guard.ts`)
- Features:
    - XSS pattern detection in route parameters
    - Rate limiting (100ms minimum between route changes)
- Applied to: All application routes via `canActivate`
- Note: Route validation removed (redundant with Angular router's wildcard route)

### HTTP Security

- Interceptor: `SecurityInterceptor`
- Features: HTTPS enforcement, security headers

### ESLint Security Rules

- `no-eval`, `no-implied-eval`, `no-new-func`
- `no-script-url`
- `@typescript-eslint/no-explicit-any`

## Trusted External Sources

### Discord

- Main: `https://discord.com`
- CDN: `https://cdn.discordapp.com`
- Assets: `https://*.discordapp.com`
- Gateway: `wss://gateway.discord.gg`

### Google Services

- Fonts: `https://fonts.googleapis.com`
- Static: `https://fonts.gstatic.com`

## Known Vulnerabilities

### Dependencies (Dev-only)

- `@babel/helpers`: Moderate - RegExp complexity
- `brace-expansion`: Low - ReDoS vulnerability
- `on-headers`: Low - Header manipulation
- `tmp`: Low - Symbolic link vulnerability

Status: No impact on production build
