import { Injectable, inject } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Injectable({
    providedIn: 'root',
})
export class PageTitleService {
    private readonly baseTitle = 'Tactical Training Team';
    private readonly titleService = inject(Title);

    setTitle(pageTitle?: string): void {
        if (pageTitle) {
            this.titleService.setTitle(`${pageTitle} - ${this.baseTitle}`);
        } else {
            this.titleService.setTitle(this.baseTitle);
        }
    }

    setBaseTitle(): void {
        this.titleService.setTitle(this.baseTitle);
    }

    getTitle(): string {
        return this.titleService.getTitle();
    }
}
