import { Component } from '@angular/core';
import { MatToolbar } from '@angular/material/toolbar';
import { MatAnchor, MatFabButton } from '@angular/material/button';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-header',
    imports: [MatToolbar, RouterLink, MatAnchor, MatFabButton],
    templateUrl: './header.component.html',
    styleUrl: './header.component.css',
})
export class HeaderComponent {}
