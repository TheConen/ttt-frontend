import { Injectable, inject } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})
export class PageTitleService {
  private readonly baseTitle = 'Tactical Training Team';
  private readonly titleService = inject(Title);

  /**
   * Sets the page title with the base title
   * @param pageTitle - The specific page title (e.g., 'Impressum', 'Datenschutz')
   */
  setTitle(pageTitle?: string): void {
    if (pageTitle) {
      this.titleService.setTitle(`${pageTitle} - ${this.baseTitle}`);
    } else {
      this.titleService.setTitle(this.baseTitle);
    }
  }

  /**
   * Sets only the base title (for home page)
   */
  setBaseTitle(): void {
    this.titleService.setTitle(this.baseTitle);
  }

  /**
   * Gets the current title
   */
  getTitle(): string {
    return this.titleService.getTitle();
  }
}