import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BasePageComponent } from '../../../shared/components/base-page/base-page.component';
import { PageLayoutComponent } from '../../../shared/components/page-layout/page-layout.component';

@Component({
    selector: 'ttt-impressum',
    standalone: true,
    imports: [CommonModule, PageLayoutComponent],
    templateUrl: './impressum.component.html',
    styleUrl: './impressum.component.css',
})
export class ImpressumComponent extends BasePageComponent {
    readonly pageTitle = 'Impressum';
}
