# TTT Frontend

Angular 20 application for Tactical Training Team website.

## Project Structure

```
src/app/
├── core/
│   ├── services/          # Singleton services
│   ├── guards/           # Route guards
│   ├── interceptors/     # HTTP interceptors
│   └── config/          # Application configuration
├── shared/
│   └── utils/           # Utility functions
└── components/          # Feature components
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

## Technology Stack

- Angular 20
- PrimeNG 20
- TailwindCSS 4
- TypeScript

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
