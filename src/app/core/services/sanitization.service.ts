import { Injectable, inject, SecurityContext } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

/**
 * Sanitizes HTML content and validates URLs to prevent XSS attacks
 */
@Injectable({
  providedIn: 'root'
})
export class SanitizationService {
  private readonly sanitizer = inject(DomSanitizer);

  /**
   * Sanitizes HTML content for safe template rendering
   */
  sanitizeHtml(html: string): SafeHtml {
    return this.sanitizer.sanitize(SecurityContext.HTML, html) || '';
  }

  /**
   * Strips all HTML tags and returns plain text
   */
  stripHtml(html: string): string {
    const doc = new DOMParser().parseFromString(html, 'text/html');
    return doc.body.textContent || '';
  }

  /**
   * Validates URL is safe for navigation (blocks javascript:, data:, etc.)
   */
  isSafeUrl(url: string): boolean {
    const safeUrlPattern = /^https?:\/\//i;
    const dangerousPatterns = [
      /^javascript:/i,
      /^data:/i,
      /^vbscript:/i,
      /^file:/i
    ];

    if (!safeUrlPattern.test(url) && !url.startsWith('/') && !url.startsWith('#')) {
      return false;
    }

    return !dangerousPatterns.some(pattern => pattern.test(url));
  }

  /**
   * Returns sanitized URL or empty string if unsafe
   */
  sanitizeUrl(url: string): string {
    return this.isSafeUrl(url) ? url : '';
  }
}
