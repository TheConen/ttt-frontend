import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { Menubar } from 'primeng/menubar';
import { ButtonDirective } from 'primeng/button';

@Component({
    selector: 'ttt-header',
    imports: [RouterLink, Menubar, ButtonDirective],
    templateUrl: './header.component.html',
    styleUrl: './header.component.css',
})
export class HeaderComponent implements OnInit {
    items: MenuItem[] | undefined;

    ngOnInit(): void {
        this.items = [
            {
                label: 'Home',
                icon: 'pi pi-home',
                styleClass: 'font-heading',
            },
            {
                label: 'Events',
                icon: 'pi pi-calendar',
                styleClass: 'font-heading',
            },
            {
                label: 'Discord',
                icon: 'pi pi-discord',
                styleClass: 'font-heading',
            },
            {
                label: 'TS3',
                icon: 'pi pi-microphone',
                styleClass: 'font-heading',
            },
            {
                label: 'Wiki',
                icon: 'pi pi-book',
                styleClass: 'font-heading',
            },
            {
                label: 'Über uns',
                styleClass: 'font-heading',
                items: [
                    {
                        label: 'Ansprechpartner',
                        styleClass: 'font-heading',
                    },
                    {
                        label: 'Livestreams',
                        styleClass: 'font-heading',
                    },
                    {
                        label: 'Newsletter',
                        styleClass: 'font-heading',
                    },
                    {
                        label: 'Shop',
                        styleClass: 'font-heading',
                    },
                    {
                        label: '10 Jahre TTT',
                        styleClass: 'font-heading',
                    },
                ],
            },
        ];
    }
}
