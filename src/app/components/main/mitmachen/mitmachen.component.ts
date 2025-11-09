import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'ttt-mitmachen',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './mitmachen.component.html',
    styleUrl: './mitmachen.component.css',
})
export class MitmachenComponent {
    // Public readonly properties
    readonly pageSubtitle =
        'Wir veranstalten regelmäßig Events für Arma 3 und Arma Reforger – von Training über Missionen bis zu taktischen Gefechten ist alles dabei.';
    readonly eventSchedule = 'dienstags und freitags von 19:30 bis 23:30 Uhr';

    readonly externalLinks = {
        discord: 'https://discord.tacticalteam.de',
        events: 'https://events.tacticalteam.de/events/',
        arma3SyncGuide: 'https://wiki.tacticalteam.de/Technik/ArmA3Sync',
        arma3SyncVideo: 'https://www.youtube.com/watch?v=lJ2DYk7SMPY&source_ve_path=MjM4NTE',
        arma3SyncTips: 'https://www.youtube.com/watch?v=mFCTQJLqQNY',
    } as const;
}
