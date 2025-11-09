import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BasePageComponent } from '../../../shared/components/base-page/base-page.component';
import { PageLayoutComponent } from '../../../shared/components/page-layout/page-layout.component';

@Component({
    selector: 'ttt-datenschutz',
    standalone: true,
    imports: [CommonModule, PageLayoutComponent],
    templateUrl: './datenschutz.component.html',
    styleUrl: './datenschutz.component.css',
})
export class DatenschutzComponent extends BasePageComponent {
    readonly pageTitle = 'Datenschutzerklärung';

    // External links that might change
    readonly externalLinks = {
        slotbot: {
            url: 'https://docs.slotbot.de/policies/datenschutzerkl%C3%A4rung',
            label: 'slotbot.de',
        },
        mailchimp: {
            url: 'https://mailchimp.com/legal/privacy/',
            label: 'https://mailchimp.com/legal/privacy/',
        },
        tacticalteam: {
            url: 'https://tacticalteam.de',
            label: 'tacticalteam.de',
        },
    } as const;
}
