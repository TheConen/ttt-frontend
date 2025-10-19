# Security Documentation

## Content Security Policy (CSP)

### Implementation
- Service: `src/app/core/services/csp.service.ts`
- Configuration: `src/app/core/config/csp.config.ts`
- Initialization: Automatic via `APP_INITIALIZER`

### Security Headers
- `X-Content-Type-Options: nosniff`
- `X-Frame-Options: DENY`
- `X-XSS-Protection: 1; mode=block`
- `Referrer-Policy: strict-origin-when-cross-origin`
- `Permissions-Policy: camera=(), microphone=(), geolocation=()`

### HTML Sanitization
- Service: `SanitizationService`
- Methods: `sanitizeHtml()`, `stripHtml()`, `isSafeUrl()`
- Used for: Dynamic HTML content, URL validation

### Route Protection
- Guard: `SecurityGuard`
- Features: Parameter validation, rate limiting, route validation
- Applied to: All application routes

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