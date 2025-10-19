import { HttpInterceptorFn } from '@angular/common/http';

/**
 * Security interceptor for HTTP requests
 * Adds security headers and validates requests
 */
export const securityInterceptor: HttpInterceptorFn = (req, next) => {
  // Only allow HTTPS in production
  if (req.url.startsWith('http://') && location.protocol === 'https:') {
    console.warn('Blocking insecure HTTP request in HTTPS context:', req.url);
    throw new Error('Insecure HTTP request blocked');
  }

  // Add security headers to requests
  const secureReq = req.clone({
    setHeaders: {
      'X-Requested-With': 'XMLHttpRequest',
      'Cache-Control': 'no-cache',
      'Pragma': 'no-cache'
    }
  });

  return next(secureReq);
};