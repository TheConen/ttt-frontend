import { Component, OnInit, inject } from '@angular/core';
import { PageTitleService } from '../../../core/services/page-title.service';

/**
 * Base component for page title management
 */
@Component({
    template: '',
})
export abstract class BasePageComponent implements OnInit {
    protected readonly pageTitleService = inject(PageTitleService);
    protected abstract readonly pageTitle: string;

    ngOnInit(): void {
        this.pageTitleService.setTitle(this.pageTitle);
    }
}
