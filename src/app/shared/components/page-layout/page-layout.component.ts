import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

/**
 * Reusable page layout component for consistent page structure
 * Provides common layout with header and content area
 */
@Component({
    selector: 'ttt-page-layout',
    standalone: true,
    imports: [CommonModule],
    template: `
        <section class="bg-tttBlack min-h-screen py-12">
            <div class="ttt-page-container">
                <!-- Header -->
                <div class="ttt-text-center mb-8" *ngIf="pageTitle">
                    <h1 class="ttt-hero-title mb-2">{{ pageTitle }}</h1>
                    <p class="ttt-hero-text text-tttGray-200 mb-4" *ngIf="pageSubtitle">{{ pageSubtitle }}</p>
                </div>

                <!-- Content -->
                <div class="space-y-8">
                    <ng-content></ng-content>
                </div>
            </div>
        </section>
    `,
    styleUrl: './page-layout.component.css',
})
export class PageLayoutComponent {
    @Input() pageTitle?: string;
    @Input() pageSubtitle?: string;
}
