import { Injectable } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { inject } from '@angular/core';
import { CSP_CONFIG, PRODUCTION_CSP_CONFIG, generateCSPString, CSPConfig } from '../config/csp.config';

/**
 * Service for managing Content Security Policy dynamically
 * Allows runtime updates and environment-specific configurations
 */
@Injectable({
  providedIn: 'root'
})
export class CSPService {
  private document = inject(DOCUMENT);
  private currentConfig: CSPConfig = CSP_CONFIG;

  /**
   * Updates CSP meta tag with current configuration
   * Call this after modifying CSP configuration
   */
  updateCSP(): void {
    const existingCSP = this.document.querySelector('meta[http-equiv="Content-Security-Policy"]');
    
    if (existingCSP) {
      existingCSP.setAttribute('content', generateCSPString(this.currentConfig));
    } else {
      const cspMeta = this.document.createElement('meta');
      cspMeta.setAttribute('http-equiv', 'Content-Security-Policy');
      cspMeta.setAttribute('content', generateCSPString(this.currentConfig));
      this.document.head.appendChild(cspMeta);
    }
  }

  /**
   * Adds a new trusted domain to frame-src
   * @param domain Domain to add (e.g., 'https://example.com')
   */
  addTrustedFrame(domain: string): void {
    if (!this.currentConfig.frameSrc.includes(domain)) {
      this.currentConfig.frameSrc.push(domain);
      this.currentConfig.childSrc.push(domain);
      this.updateCSP();
      console.log(`Added trusted frame source: ${domain}`);
    }
  }

  /**
   * Adds a new trusted domain to script-src
   * @param domain Domain to add
   */
  addTrustedScript(domain: string): void {
    if (!this.currentConfig.scriptSrc.includes(domain)) {
      this.currentConfig.scriptSrc.push(domain);
      this.updateCSP();
      console.log(`Added trusted script source: ${domain}`);
    }
  }

  /**
   * Adds a new trusted domain to img-src
   * @param domain Domain to add
   */
  addTrustedImage(domain: string): void {
    if (!this.currentConfig.imgSrc.includes(domain)) {
      this.currentConfig.imgSrc.push(domain);
      this.updateCSP();
      console.log(`Added trusted image source: ${domain}`);
    }
  }

  /**
   * Removes a trusted domain from all CSP directives
   * @param domain Domain to remove
   */
  removeTrustedDomain(domain: string): void {
    Object.keys(this.currentConfig).forEach(key => {
      const directive = this.currentConfig[key as keyof CSPConfig] as string[];
      const index = directive.indexOf(domain);
      if (index > -1) {
        directive.splice(index, 1);
      }
    });
    this.updateCSP();
    console.log(`Removed trusted domain: ${domain}`);
  }

  /**
   * Applies production CSP configuration
   * Call this in production builds for stricter security
   */
  applyProductionCSP(): void {
    this.currentConfig = { ...this.currentConfig, ...PRODUCTION_CSP_CONFIG };
    this.updateCSP();
    console.log('Applied production CSP configuration');
  }

  /**
   * Gets current CSP configuration
   * @returns Current CSP config object
   */
  getCurrentConfig(): CSPConfig {
    return { ...this.currentConfig };
  }

  /**
   * Validates if a domain is trusted in any CSP directive
   * @param domain Domain to check
   * @returns True if domain is trusted
   */
  isDomainTrusted(domain: string): boolean {
    return Object.values(this.currentConfig).some(directive => 
      Array.isArray(directive) && directive.includes(domain)
    );
  }
}