import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

/**
 * Security guard to prevent unauthorized access
 * This can be extended to include authentication and authorization logic
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

  // 2. Rate limiting check (simple implementation)
  const now = Date.now();
  const lastAccess = localStorage.getItem('lastRouteAccess');
  const minInterval = 100; // Minimum 100ms between route changes

  if (lastAccess && (now - parseInt(lastAccess)) < minInterval) {
    console.warn('Too many rapid route changes detected');
    return false;
  }

  localStorage.setItem('lastRouteAccess', now.toString());

  // 3. Check for valid routes only
  const validRoutes = ['', 'impressum', 'datenschutz', 'chronik'];
  const currentRoute = route.routeConfig?.path || '';
  
  if (!validRoutes.includes(currentRoute)) {
    console.warn('Invalid route detected, redirecting to home');
    router.navigate(['/']);
    return false;
  }

  return true;
};