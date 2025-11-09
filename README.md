# TTT Frontend

Angular 20 application for Tactical Training Team website.

## Project Structure

```
src/app/
├── core/
│   ├── services/          # Singleton services (API, CSP, events, medien, members)
│   ├── guards/           # Route guards (security)
│   ├── interceptors/     # HTTP interceptors (security)
│   └── config/          # Application configuration (CSP)
├── shared/
│   ├── components/       # Shared components (base-page, page-layout)
│   ├── types/           # TypeScript type definitions
│   └── utils/           # Barrel exports for shared utilities
├── components/
│   ├── header/          # Header component
│   ├── footer/          # Footer component
│   ├── sidebar/         # Left and right sidebars
│   └── main/            # Main content pages (home, aufstellung, chronik, medien, etc.)
└── environments/        # Environment configurations
```

## Development

```bash
pnpm install
pnpm run start
```

## Build

```bash
pnpm run build
```

## Documentation

- [Security](docs/security.md) - Security implementation details
- [CSP Management](docs/csp-management.md) - Content Security Policy configuration
- [Backend Overview](docs/backend-overview.md) - Backend API integration

## Technology Stack

- **Angular 20** - Frontend framework
- **PrimeNG 20** - UI component library with @primeuix/themes
- **TailwindCSS 4** - Utility-first CSS framework
- **RxJS 7** - Reactive programming library
- **TypeScript 5.9** - Type-safe JavaScript

## Testing

```bash
pnpm run test        # Run unit tests
pnpm run lint        # Run ESLint
```

## Code Quality

```bash
pnpm run prettier        # Format code
pnpm run prettier:check  # Check code formatting
```

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
