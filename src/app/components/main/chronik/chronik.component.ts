import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TrackByUtils, BasePageComponent, PageLayoutComponent } from '../../../shared/utils';
import { SanitizationService } from '../../../core/services/sanitization.service';

interface TimelineEvent {
    id: string;
    title: string;
    date: string;
    type: string;
    icon: string;
    color: string;
    description: string;
    details: string[];
    expanded?: boolean;
}

@Component({
    selector: 'ttt-chronik',
    standalone: true,
    imports: [CommonModule, PageLayoutComponent],
    templateUrl: './chronik.component.html',
    styleUrl: './chronik.component.css',
})
export class ChronikComponent extends BasePageComponent implements OnInit {
    // Services
    private readonly sanitizationService = inject(SanitizationService);

    // Public readonly properties
    readonly pageTitle = 'Chronik';
    readonly pageSubtitle = 'Geschichte des Tactical Training Teams';
    readonly trackByIndex = TrackByUtils.trackByIndex;
    readonly fictionDocumentationLink = 'https://drive.google.com/file/d/1QpkevojoID6-HfPsp5GIW3OUmUjnfOSd/view';

    // Private readonly properties
    private readonly eventTypeConfig = {
        anniversary: { color: 'border-tttRed bg-tttRed text-tttWhite', label: 'Jubiläum' },
        milestone: { color: 'border-blue-500 bg-blue-500/20 text-blue-300', label: 'Meilenstein' },
        system: { color: 'border-orange-500 bg-orange-500/20 text-orange-300', label: 'System' },
        default: { color: 'border-tttGray-500 bg-tttGray-500/20 text-tttGray-300', label: 'Event' },
    };

    // Public properties
    timelineEvents: TimelineEvent[] = [
        this.createTimelineEvent(
            'genesis',
            'OP Genesis',
            '11. November 2013',
            'anniversary',
            'pi-flag',
            'Offizielle Gründung des Tactical Training Teams',
            [
                'Nachfolger des GT-Kommando-Projekts',
                'Marktanalyse der Arma3-Community durchgeführt',
                'Kombination aus Training, Teamspiel und offener Community',
            ]
        ),
        this.createTimelineEvent(
            'intel',
            'OP Intel',
            'März 2014',
            'milestone',
            'pi-file-edit',
            'Veröffentlichung des ersten TTT-Newsletters',
            ['Erste offizielle Kommunikation an die Mitglieder', 'Etablierung regelmäßiger Informationskanäle']
        ),
        this.createTimelineEvent(
            'rookie',
            'OP Rookie',
            'Mai 2015',
            'system',
            'pi-users',
            'Einführung von Einsteiger-Events und Managementposten',
            [
                'Strukturierte Ausbildungsprogramme entwickelt',
                'Managementposten zur besseren Organisation',
                'Fokus auf Einsteiger-freundliche Events',
            ]
        ),
        this.createTimelineEvent(
            'handover',
            'OP Handover',
            'Juni 2016',
            'system',
            'pi-server',
            'Beendigung des TTT-Public-Servers und Übertragung an ArmaWorld',
            ['Strategische Neuausrichtung der Community', 'Fokus auf Events statt Public Gaming']
        ),
        this.createTimelineEvent(
            'gladiator',
            'OP Gladiator',
            'September 2018',
            'milestone',
            'pi-trophy',
            'Neue Sparte im TTT: TVT-Team und E-Sport-Ära',
            ['Electronic Sports Masters™ (ESM)', 'Wettkampforientierte Missionsformate', 'Professionelle E-Sport-Aktivitäten']
        ),
        this.createTimelineEvent(
            'rebrand',
            'OP Rebrand',
            'Januar 2019',
            'milestone',
            'pi-palette',
            'Das neue Corporate-Design wird eingeführt',
            ['Moderne visuelle Identität entwickelt', 'Einheitliches Branding für alle Plattformen', 'Professioneller Auftritt etabliert']
        ),
        this.createTimelineEvent(
            'hierarchy',
            'OP Hierarchy',
            'März 2019',
            'system',
            'pi-sitemap',
            'TTT-Rangneustrukturierung zu Soldat, Veteran und Gast',
            ['Vereinfachte Rangstruktur eingeführt', 'Etablierung von Offiziersposten']
        ),
        this.createTimelineEvent(
            'digital',
            'OP Digital',
            'September 2020',
            'milestone',
            'pi-globe',
            'Neuer TTT-Webauftritt mit modernem Design',
            ['Responsive Design für alle Geräte', 'Verbesserte Navigation', 'Integration moderner Webtechnologien']
        ),
        this.createTimelineEvent(
            'knowledge',
            'OP Knowledge',
            'Oktober 2021',
            'milestone',
            'pi-book',
            'TTT-Wiki mit über 150 Informationsseiten veröffentlicht',
            [
                'Umfassende Wissensdatenbank erstellt',
                'Taktische Handbücher und Guides',
                'Ablösung der alten Taktik-Fibel',
                'Community-basierte Inhaltserstellung',
            ]
        ),
        this.createTimelineEvent(
            'decade',
            'OP Decade',
            '11. November 2023',
            'anniversary',
            'pi-star',
            '10 Jahre TTT - Eine erfolgreiche Dekade der taktischen Exzellenz',
            [
                'Eine der ältesten deutschsprachigen Arma3-Communities',
                'Über 1000 durchgeführte Events und Missionen',
                'Hunderte ausgebildete Community-Mitglieder',
            ]
        ),
    ];

    // Public methods
    toggleEventDetails(event: TimelineEvent): void {
        if (event.expanded) {
            event.expanded = false;
            return;
        }
        for (const e of this.timelineEvents) {
            e.expanded = false;
        }
        event.expanded = true;
    }

    handleEventKeyboard(eventObj: TimelineEvent, event: KeyboardEvent): void {
        if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            this.toggleEventDetails(eventObj);
        }
    }

    getEventTypeColor(type: string): string {
        const config = this.eventTypeConfig[type as keyof typeof this.eventTypeConfig];
        return config?.color || this.eventTypeConfig.default.color;
    }

    getEventTypeLabel(type: string): string {
        const config = this.eventTypeConfig[type as keyof typeof this.eventTypeConfig];
        return config?.label || this.eventTypeConfig.default.label;
    }

    getEventIconClasses(icon: string): string {
        return `pi ${icon} text-inherit`;
    }

    getCleanTitle(title: string): string {
        return this.sanitizationService.stripHtml(title);
    }

    // Private methods
    private createTimelineEvent(
        id: string,
        title: string,
        date: string,
        type: 'anniversary' | 'milestone' | 'system',
        icon: string,
        description: string,
        details: string[]
    ): TimelineEvent {
        const typeColors = {
            anniversary: 'border-tttRed bg-tttRed text-tttWhite',
            milestone: 'border-blue-500 bg-blue-500/20 text-blue-300',
            system: 'border-orange-500 bg-orange-500/20 text-orange-300',
        };

        return {
            id,
            title,
            date,
            type,
            icon,
            color: typeColors[type],
            description,
            details,
            expanded: false,
        };
    }
}
