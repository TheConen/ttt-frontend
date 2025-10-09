import { Injectable, inject, SecurityContext } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

/**
 * Service for sanitizing HTML content and preventing XSS attacks
 * This service provides secure methods for handling dynamic HTML content
 */
@Injectable({
  providedIn: 'root'
})
export class SanitizationService {
  private readonly sanitizer = inject(DomSanitizer);

  /**
   * Sanitizes HTML content and returns SafeHtml for Angular templates
   * This prevents XSS attacks while allowing safe HTML formatting
   * @param html - The HTML string to sanitize
   * @returns SafeHtml object that can be used with [innerHTML]
   */
  sanitizeHtml(html: string): SafeHtml {
    // Angular's DomSanitizer automatically removes dangerous content
    // like <script> tags, javascript: URLs, and event handlers
    return this.sanitizer.sanitize(SecurityContext.HTML, html) || '';
  }

  /**
   * Strips all HTML tags and returns plain text
   * Use this when you want to display user content without any HTML formatting
   * @param html - The HTML string to strip
   * @returns Plain text with all HTML tags removed
   */
  stripHtml(html: string): string {
    const doc = new DOMParser().parseFromString(html, 'text/html');
    return doc.body.textContent || '';
  }

  /**
   * Validates that a URL is safe for navigation
   * Prevents javascript: and data: URLs that could execute malicious code
   * @param url - The URL to validate
   * @returns True if the URL is safe, false otherwise
   */
  isSafeUrl(url: string): boolean {
    const safeUrlPattern = /^https?:\/\//i;
    const dangerousPatterns = [
      /^javascript:/i,
      /^data:/i,
      /^vbscript:/i,
      /^file:/i
    ];

    // Check if URL starts with safe protocol
    if (!safeUrlPattern.test(url) && !url.startsWith('/') && !url.startsWith('#')) {
      return false;
    }

    // Check for dangerous patterns
    return !dangerousPatterns.some(pattern => pattern.test(url));
  }

  /**
   * Sanitizes a URL for safe navigation
   * @param url - The URL to sanitize
   * @returns Safe URL or empty string if unsafe
   */
  sanitizeUrl(url: string): string {
    return this.isSafeUrl(url) ? url : '';
  }
}