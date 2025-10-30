import { Component, OnInit, inject } from '@angular/core';
import { PageTitleService } from '../../../core/services/page-title.service';

/**
 * Base component for pages that need page title management
 * Provides common OnInit logic for setting page titles
 */
@Component({
  template: '',
})
export abstract class BasePageComponent implements OnInit {
  protected readonly pageTitleService = inject(PageTitleService);

  /**
   * Override this property in child components to set the page title
   */
  protected abstract readonly pageTitle: string;

  ngOnInit(): void {
    this.pageTitleService.setTitle(this.pageTitle);
  }
}