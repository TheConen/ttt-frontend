import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { Menubar } from 'primeng/menubar';
import { ButtonDirective } from 'primeng/button';

const HEADER_CONFIG = {
    LOGO_PATH: '/img/logo.webp',
    LOGO_ALT: 'Tactical Training Team Logo',
} as const;

@Component({
    selector: 'ttt-header',
    standalone: true,
    imports: [RouterLink, Menubar, ButtonDirective],
    templateUrl: './header.component.html',
    styleUrl: './header.component.css',
})
export class HeaderComponent {
    readonly logoPath = HEADER_CONFIG.LOGO_PATH;
    readonly logoAlt = HEADER_CONFIG.LOGO_ALT;

    readonly items: MenuItem[] = [
        {
            label: 'Home',
            icon: 'pi pi-home',
            styleClass: 'font-heading',
            routerLink: ['/'],
        },
        {
            label: 'Events',
            icon: 'pi pi-calendar',
            styleClass: 'font-heading',
            url: 'https://events.tacticalteam.de',
            target: '_blank',
            rel: 'noopener noreferrer',
        },
        {
            label: 'Discord',
            icon: 'pi pi-discord',
            styleClass: 'font-heading',
            url: 'https://discord.tacticalteam.de',
            target: '_blank',
            rel: 'noopener noreferrer',
        },
        {
            label: 'TS3',
            icon: 'pi pi-microphone',
            styleClass: 'font-heading',
            url: 'ts3server://ts3.tacticalteam.de',
        },
        {
            label: 'Wiki',
            icon: 'pi pi-book',
            styleClass: 'font-heading',
            url: 'https://wiki.tacticalteam.de',
            target: '_blank',
            rel: 'noopener noreferrer',
        },
        {
            label: 'Medien',
            icon: 'pi pi-images',
            styleClass: 'font-heading',
            routerLink: ['/medien'],
        },
        {
            label: 'Über uns',
            icon: 'pi pi-info-circle',
            styleClass: 'font-heading',
            items: [
                {
                    label: 'Aufstellung',
                    icon: 'pi pi-sitemap',
                    styleClass: 'font-heading',
                    routerLink: ['/aufstellung'],
                },
                {
                    label: 'Chronik',
                    icon: 'pi pi-history',
                    styleClass: 'font-heading',
                    routerLink: ['/chronik'],
                },
                {
                    label: 'Event-Replay',
                    icon: 'pi pi-play',
                    styleClass: 'font-heading',
                    url: 'https://replay.tacticalteam.de',
                    target: '_blank',
                    rel: 'noopener noreferrer',
                },
                {
                    label: 'Shop',
                    icon: 'pi pi-shopping-bag',
                    styleClass: 'font-heading',
                    url: 'https://tacticalteam.myspreadshop.de',
                    target: '_blank',
                    rel: 'noopener noreferrer',
                },
                {
                    label: 'Intern',
                    icon: 'pi pi-user',
                    styleClass: 'font-heading',
                    routerLink: ['/intern'],
                },
            ],
        },
    ];
}
