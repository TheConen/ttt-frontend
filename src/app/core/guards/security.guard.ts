import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

const SECURITY_CONFIG = {
  MIN_ROUTE_INTERVAL: 100,
  RADIX: 10
} as const;

/**
 * Route guard with XSS protection and rate limiting
 */
export const securityGuard: CanActivateFn = (route) => {
  const router = inject(Router);

  const suspiciousPatterns = [
    /<script/i,
    /javascript:/i,
    /vbscript:/i,
    /onload=/i,
    /onerror=/i,
    /onclick=/i
  ];

  const routeString = JSON.stringify(route.params) + JSON.stringify(route.queryParams);
  const hasSuspiciousContent = suspiciousPatterns.some(pattern => pattern.test(routeString));

  if (hasSuspiciousContent) {
    console.warn('Suspicious route parameters detected, redirecting to home');
    router.navigate(['/']);
    return false;
  }

  const now = Date.now();
  const lastAccess = localStorage.getItem('lastRouteAccess');

  if (lastAccess) {
    const lastAccessInt = Number.parseInt(lastAccess, SECURITY_CONFIG.RADIX);
    if (!Number.isNaN(lastAccessInt) && (now - lastAccessInt) < SECURITY_CONFIG.MIN_ROUTE_INTERVAL) {
      console.warn('Too many rapid route changes detected');
      return false;
    }
  }

  localStorage.setItem('lastRouteAccess', now.toString());

  const validRoutes = ['', 'impressum', 'datenschutz', 'chronik', 'mitmachen', 'medien', 'aufstellung'];
  const currentRoute = route.routeConfig?.path || '';

  if (!validRoutes.includes(currentRoute)) {
    console.warn('Invalid route detected, redirecting to home');
    router.navigate(['/']);
    return false;
  }

  return true;
};