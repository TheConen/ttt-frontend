import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { providePrimeNG } from 'primeng/config';
import { tttPrimeNgTheme } from './themes.config';
import { CSPInitService } from './core/services/csp-init.service';
import { securityInterceptor } from './core/interceptors/security.interceptor';


export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideClientHydration(),
    providePrimeNG({
      theme: tttPrimeNgTheme,
    }),
  provideHttpClient(withInterceptors([securityInterceptor])),
    // CSPInitService is injected at app start for CSP initialization
    CSPInitService
  ],
};
