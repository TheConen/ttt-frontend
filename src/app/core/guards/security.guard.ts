import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

// Security configuration constants
const SECURITY_CONFIG = {
  MIN_ROUTE_INTERVAL: 100,
  RADIX: 10
} as const;

/**
 * Security guard to prevent unauthorized access
 */
export const securityGuard: CanActivateFn = (route) => {
  const router = inject(Router);

  // Basic security checks
  
  // 1. Check for suspicious route parameters
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

  // 2. Rate limiting check
  const now = Date.now();
  const lastAccess = localStorage.getItem('lastRouteAccess');

  if (lastAccess && (now - +lastAccess) < SECURITY_CONFIG.MIN_ROUTE_INTERVAL) {
    console.warn('Too many rapid route changes detected');
    return false;
  }

  localStorage.setItem('lastRouteAccess', now.toString());

  // 3. Check for valid routes only
  const validRoutes = ['', 'impressum', 'datenschutz', 'chronik', 'mitmachen', 'medien', 'aufstellung'];
  const currentRoute = route.routeConfig?.path || '';
  
  if (!validRoutes.includes(currentRoute)) {
    console.warn('Invalid route detected, redirecting to home');
    router.navigate(['/']);
    return false;
  }

  return true;
};