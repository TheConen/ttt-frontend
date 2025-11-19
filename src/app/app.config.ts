import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { providePrimeNG } from 'primeng/config';
import { tttPrimeNgTheme } from './themes.config';
import { securityInterceptor } from './core/interceptors/security.interceptor';

/**
 * Application configuration
 *
 * CSP: Content Security Policy should be configured via server headers (nginx/Apache).
 * Angular supports CSP nonces via CSP_NONCE injection token for SSR.
 */
export const appConfig: ApplicationConfig = {
    providers: [
        provideZoneChangeDetection({ eventCoalescing: true }),
        provideRouter(routes, withComponentInputBinding()),
        provideClientHydration(),
        // Note: PrimeNG requires animations despite deprecation warning
        // See: https://github.com/primefaces/primeng/issues/18863
        provideAnimationsAsync(),
        providePrimeNG({
            theme: tttPrimeNgTheme,
        }),
        provideHttpClient(withInterceptors([securityInterceptor])),
    ],
};
