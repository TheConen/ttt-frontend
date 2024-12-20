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
                url: 'https://events.tacticalteam.de'
            },
            {
                label: 'Discord',
                icon: 'pi pi-discord',
                styleClass: 'font-heading',
                url: 'https://discord.tacticalteam.de'
            },
            {
                label: 'TS3',
                icon: 'pi pi-microphone',
                styleClass: 'font-heading',
                url: 'ts3server://ts3.tacticalteam.de'
            },
            {
                label: 'Wiki',
                icon: 'pi pi-book',
                styleClass: 'font-heading',
                url: 'https://wiki.tacticalteam.de'
            },
            {
                label: 'Medien',
                icon: 'pi pi-images',
                styleClass: 'font-heading',
            },
            {
                label: 'Über uns',
                styleClass: 'font-heading',
                items: [
                    {
                        label: 'Aufstellung',
                        styleClass: 'font-heading',
                    },
                    {
                        label: 'Unsere Geschichte',
                        styleClass: 'font-heading',
                    },
                    {
                        label: 'Shop',
                        styleClass: 'font-heading',
                        url: 'https://tacticalteam.myspreadshop.de'
                    },
                ],
            },
        ];
    }
}
