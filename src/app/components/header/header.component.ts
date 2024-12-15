import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Button } from 'primeng/button';

@Component({
    selector: 'ttt-header',
    imports: [RouterLink, Button],
    templateUrl: './header.component.html',
    styleUrl: './header.component.css',
})
export class HeaderComponent {}
