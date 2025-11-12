import { HttpInterceptorFn } from '@angular/common/http';

/**
 * Adds security headers and blocks insecure HTTP requests in HTTPS context
 */
export const securityInterceptor: HttpInterceptorFn = (req, next) => {
    if (req.url.startsWith('http://') && location.protocol === 'https:') {
        console.warn('Blocking insecure HTTP request in HTTPS context:', req.url);
        throw new Error('Insecure HTTP request blocked');
    }

    const secureReq = req.clone({
        setHeaders: {
            'X-Requested-With': 'XMLHttpRequest',
            'Cache-Control': 'no-cache',
            Pragma: 'no-cache',
        },
    });

    return next(secureReq);
};
