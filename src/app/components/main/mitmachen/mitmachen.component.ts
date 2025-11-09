import { Component, OnInit, OnDestroy, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonDirective } from 'primeng/button';
import { TrackByUtils } from '../../../shared/utils/trackby.utils';
import { BasePageComponent } from '../../../shared/components/base-page/base-page.component';
import { SanitizationService } from '../../../core/services/sanitization.service';

const MITMACHEN_CONFIG = {
    PAGE_TITLE: 'Mitmachen - Werde Teil des TTT',
    SECURITY: {
        MIN_LINK_INTERVAL: 1000,
        RADIX: 10,
        WINDOW_FEATURES: 'noopener,noreferrer',
    },
    EXTERNAL_LINKS: {
        DISCORD: 'https://discord.tacticalteam.de',
        EVENTS: 'https://events.tacticalteam.de/events/',
        ARMA3SYNC_GUIDE: 'https://wiki.tacticalteam.de/Technik/ArmA3Sync',
        ARMA3SYNC_VIDEO: 'https://www.youtube.com/watch?v=lJ2DYk7SMPY&source_ve_path=MjM4NTE',
        ARMA3SYNC_TIPS: 'https://www.youtube.com/watch?v=mFCTQJLqQNY',
    },
} as const;

@Component({
    selector: 'ttt-mitmachen',
    standalone: true,
    imports: [CommonModule, ButtonDirective],
    templateUrl: './mitmachen.component.html',
    styleUrl: './mitmachen.component.css',
})
export class MitmachenComponent extends BasePageComponent implements OnInit, OnDestroy {
    // Services
    private readonly sanitizationService = inject(SanitizationService);

    // Public readonly properties
    readonly pageTitle = 'Mitmachen beim TTT';
    readonly pageSubtitle =
        'Wir veranstalten regelmäßig Events für Arma 3 und Arma Reforger – von Training über Missionen bis zu taktischen Gefechten ist alles dabei.';
    readonly eventSchedule = 'dienstags und freitags von 19:30 bis 23:30 Uhr';
    readonly trackByIndex = TrackByUtils.trackByIndex;
    readonly securityUtils = {
        sanitizeHtml: (html: string) => this.sanitizationService.sanitizeHtml(html),
        stripHtml: (html: string) => this.sanitizationService.stripHtml(html),
        isSafeUrl: (url: string) => this.sanitizationService.isSafeUrl(url),
    };

    readonly externalLinks = {
        discord: MITMACHEN_CONFIG.EXTERNAL_LINKS.DISCORD,
        events: MITMACHEN_CONFIG.EXTERNAL_LINKS.EVENTS,
        arma3SyncGuide: MITMACHEN_CONFIG.EXTERNAL_LINKS.ARMA3SYNC_GUIDE,
        arma3SyncVideo: MITMACHEN_CONFIG.EXTERNAL_LINKS.ARMA3SYNC_VIDEO,
        arma3SyncTips: MITMACHEN_CONFIG.EXTERNAL_LINKS.ARMA3SYNC_TIPS,
    } as const;

    // Lifecycle hooks
    override ngOnInit(): void {
        super.ngOnInit();
    }

    ngOnDestroy(): void {
        localStorage.removeItem('lastLinkAccess');
    }

    // Public methods
    openDiscord = () => this.openExternalLink(this.externalLinks.discord);
    openEvents = () => this.openExternalLink(this.externalLinks.events);
    openArma3SyncGuide = () => this.openExternalLink(this.externalLinks.arma3SyncGuide);
    openArma3SyncVideo = () => this.openExternalLink(this.externalLinks.arma3SyncVideo);
    openArma3SyncTips = () => this.openExternalLink(this.externalLinks.arma3SyncTips);

    // Private methods
    private openExternalLink(url: string): void {
        try {
            if (!this.sanitizationService.isSafeUrl(url)) {
                console.warn('Attempted to open unsafe URL:', url);
                return;
            }

            // Rate limiting check
            const now = Date.now();
            const lastLinkAccess = localStorage.getItem('lastLinkAccess');

            if (lastLinkAccess) {
                const lastLinkAccessInt = Number.parseInt(lastLinkAccess, 10);
                if (!Number.isNaN(lastLinkAccessInt) && now - lastLinkAccessInt < MITMACHEN_CONFIG.SECURITY.MIN_LINK_INTERVAL) {
                    console.warn('Too many rapid link access attempts');
                    return;
                }
            }

            localStorage.setItem('lastLinkAccess', now.toString());

            try {
                const newWindow = window.open(url, '_blank', MITMACHEN_CONFIG.SECURITY.WINDOW_FEATURES);

                if (newWindow) {
                    newWindow.opener = null;
                } else {
                    // Fallback: Create invisible link and click it
                    const link = document.createElement('a');
                    link.href = url;
                    link.target = '_blank';
                    link.rel = 'noopener noreferrer';
                    document.body.appendChild(link);
                    link.click();
                    link.remove();
                }
            } catch (popupError) {
                console.error('Window.open failed, using link fallback:', popupError);
                // Fallback: Create invisible link and click it
                const link = document.createElement('a');
                link.href = url;
                link.target = '_blank';
                link.rel = 'noopener noreferrer';
                document.body.appendChild(link);
                link.click();
                link.remove();
            }
        } catch (error) {
            console.error('Failed to open external link:', error);
        }
    }
}
