import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'ttt-footer',
    imports: [CommonModule, RouterLink],
    templateUrl: './footer.component.html',
    styleUrl: './footer.component.css',
})
export class FooterComponent {
    socialLinks = [
        { 
            name: 'Discord', 
            url: 'https://discord.tacticalteam.de', 
            icon: 'pi pi-discord' 
        },
        { 
            name: 'YouTube', 
            url: 'https://www.youtube.com/c/TacticalteamDe', 
            icon: 'pi pi-youtube' 
        },
        { 
            name: '𝕏 (Twitter)', 
            url: 'https://x.com/TTT_ArmA', 
            icon: 'pi pi-twitter' 
        },
        { 
            name: 'Mastodon', 
            url: 'https://mastodon.social/@tacticaltrainingteam', 
            icon: 'pi pi-at' 
        }
    ];

    partners = [
        {
            name: 'Gruppe W',
            url: 'https://www.gruppe-w.de/',
            description: 'Partnerschaft seit 2014'
        },
        {
            name: 'Gruppe Adler',
            url: 'https://gruppe-adler.de/',
            description: 'Partnerschaft seit 2022'
        },
        {
            name: 'Praetorianische Garde™',
            url: 'https://prae-garde.de/',
            description: 'Partnerschaft seit 2025'
        },
        {
            name: 'Electronic Sports Masters™',
            url: 'https://esportsmasters.org',
            description: 'Partnerschaft seit 20xx'
        }
    ];

    quickLinks = [
        { name: 'Wiki', url: 'https://wiki.tacticalteam.de/' },
        { name: 'Slottung', url: 'https://events.tacticalteam.de/events' },
        { name: 'Replay', url: 'https://replay.tacticalteam.de' }
    ];

    legalLinks = [
        { name: 'Datenschutz', url: '/datenschutz' },
        { name: 'Impressum', url: '/impressum' }
    ];
}
