import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageLayoutComponent } from '../../../shared/components/page-layout/page-layout.component';

@Component({
    selector: 'ttt-impressum',
    standalone: true,
    imports: [CommonModule, PageLayoutComponent],
    templateUrl: './impressum.component.html',
    styleUrl: './impressum.component.css',
})
export class ImpressumComponent {
    readonly pageTitle = 'Impressum';
}
