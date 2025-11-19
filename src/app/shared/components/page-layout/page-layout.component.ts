import { Component, Input } from '@angular/core';

/**
 * Reusable page layout component for consistent page structure
 * Provides common layout with header and content area
 */
@Component({
    selector: 'ttt-page-layout',
    standalone: true,
    imports: [],
    templateUrl: './page-layout.component.html',
    styleUrl: './page-layout.component.css',
})
export class PageLayoutComponent {
    @Input() pageTitle?: string;
    @Input() pageSubtitle?: string;
}
