import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ButtonDirective } from 'primeng/button';

import { PageTitleService } from '../../../core/services/page-title.service';

@Component({
    selector: 'ttt-home',
    imports: [CommonModule, RouterLink, ButtonDirective],
    templateUrl: './home.component.html',
    styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
    private readonly pageTitleService = inject(PageTitleService);

    // Community statistics (könnte später aus API kommen)
    readonly communityStats = [
        { value: '80+', label: 'Mitglieder' },
        { value: '2013', label: 'Gegründet' },
        { value: '2x', label: 'Events/Woche' }
    ];

    ngOnInit(): void {
        this.pageTitleService.setBaseTitle(); // Set base title for home page
    }
}
