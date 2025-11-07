import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BasePageComponent, PageLayoutComponent } from '../../../shared/utils';

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
