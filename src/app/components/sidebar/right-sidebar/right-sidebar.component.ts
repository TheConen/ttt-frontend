import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';

interface DiscordConfig {
    serverId: string;
    theme: 'dark' | 'light';
    widgetUrl: string;
    directUrl: string;
    widgetTitle: string;
}

@Component({
    selector: 'ttt-right-sidebar',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './right-sidebar.component.html',
    styleUrl: './right-sidebar.component.css',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RightSidebarComponent {
    readonly discordConfig: DiscordConfig = {
        serverId: '121399943393968128',
        theme: 'dark',
        widgetUrl: 'https://discord.com/widget?id=121399943393968128&theme=dark',
        directUrl: 'https://discord.tacticalteam.de',
        widgetTitle: 'TTT Discord Server',
    };

    readonly discordIcon = {
        class: 'pi pi-discord text-tttRed mr-2',
        colors: {
            primary: 'bg-tttRed',
            hover: 'hover:bg-tttRed-600',
        },
    } as const;
}
