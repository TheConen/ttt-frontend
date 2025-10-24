import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageTitleService } from '../../../core/services/page-title.service';

@Component({
  selector: 'ttt-datenschutz',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './datenschutz.component.html',
  styleUrl: './datenschutz.component.css'
})
export class DatenschutzComponent implements OnInit {
  readonly pageTitle = 'Datenschutzerklärung';
  private readonly pageTitleService = inject(PageTitleService);

  ngOnInit(): void {
    this.pageTitleService.setTitle(this.pageTitle);
  }

  // External links that might change
  readonly externalLinks = {
    slotbot: {
      url: 'https://docs.slotbot.de/policies/datenschutzerkl%C3%A4rung',
      label: 'slotbot.de'
    },
    mailchimp: {
      url: 'https://mailchimp.com/legal/privacy/',
      label: 'https://mailchimp.com/legal/privacy/'
    },
    tacticalteam: {
      url: 'https://tacticalteam.de',
      label: 'tacticalteam.de'
    }
  } as const;
}
