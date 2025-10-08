import { ApplicationConfig, provideZoneChangeDetection, APP_INITIALIZER } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { providePrimeNG } from 'primeng/config';
import { tttPrimeNgTheme } from './themes.config';
import { CSPService } from './core/services/csp.service';

/**
 * Initialize CSP on app startup
 */
function initializeCSP(cspService: CSPService) {
  return () => {
    cspService.updateCSP();
  };
}

export const appConfig: ApplicationConfig = {
    providers: [
        provideZoneChangeDetection({ eventCoalescing: true }),
        provideRouter(routes),
        provideAnimationsAsync(),
        providePrimeNG({
            theme: tttPrimeNgTheme,
        }),
        // Initialize CSP on app startup
        {
          provide: APP_INITIALIZER,
          useFactory: initializeCSP,
          deps: [CSPService],
          multi: true
        }
    ],
};
