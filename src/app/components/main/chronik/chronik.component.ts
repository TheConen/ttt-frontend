import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { TrackByUtils } from '../../../shared/utils/trackby.utils';
import { PageTitleService } from '../../../core/services/page-title.service';
import { SanitizationService } from '../../../core/services/sanitization.service';

interface TimelineEvent {
  id: string;
  date: string;
  title: string;
  description: string;
  type: 'milestone' | 'event' | 'system' | 'anniversary';
  icon: string;
  details?: string[];
}

interface HistorySection {
  title: string;
  subtitle: string;
  paragraphs: string[];
}

@Component({
  selector: 'ttt-chronik',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './chronik.component.html',
  styleUrl: './chronik.component.css'
})
export class ChronikComponent implements OnInit {
  readonly pageTitle = 'TTT-Chronik';
  private readonly pageTitleService = inject(PageTitleService);
  private readonly sanitizationService = inject(SanitizationService);

  ngOnInit(): void {
    this.pageTitleService.setTitle(this.pageTitle);
  }
  readonly pageSubtitle = 'Geschichte des Tactical Training Teams';
  
  readonly timelineSection = {
    title: 'TTT Timeline',
    subtitle: 'Meilensteine des Tactical Training Teams',
    detailsLabel: 'Weitere Details:'
  } as const;
  
  readonly historySection: HistorySection = {
    title: 'Warum gibt es ein TTT?',
    subtitle: 'Die Entstehungsgeschichte unserer Community',
    paragraphs: [
      'Das Tactical Training Team (TTT) ist der Nachfolger des Projekts "GT-Kommando", das Ende 2012 entwickelt wurde. Ursprünglich entstand GT-Kommando aus dem Frust über mangelnde Koordination in der Community. Es sollte ein Arma-Grundlagentraining basierend auf militärischen Unterlagen entstehen.',
      'Nach einigen erfolgreichen Monaten entwickelte sich jedoch Unbehagen, insbesondere zwischen trainierten und untrainierten Spielern. Daher wurde das GT-Kommando-Projekt eingestellt und später das TTT-Projekt ins Leben gerufen. Dieses konzentrierte sich auf paramilitärische Einheiten, aber mit einem ähnlichen Programm.',
      'Die Gründung des TTT war das Ergebnis einer Marktanalyse der Arma3-Community. Es wurde festgestellt, dass es keine Gruppe gab, die die gewünschte Kombination aus Training, realistischem Teamspiel und einer offenen Community bot. Die Arma-Communities wurden grob in Fun-Clans, Multigaming-Communities, MilSim-Einheiten mit realem Hintergrund und offene Arma-Communities unterteilt.',
      'Das TTT wurde gegründet, um diese Lücke zu füllen und sich auf Training, realistisches Teamspiel und eine offene Community zu konzentrieren. Es sollte eine flexible und zugängliche Einheit sein, unabhängig von einem spezifischen militärischen Vorbild.',
      'Obwohl diese Ausrichtung Herausforderungen mit sich bringt, wie den Bedarf an ständiger Abstimmung und klaren Strukturen, ist das Ziel des TTT, eine Community aufzubauen, die die Bedürfnisse der Spieler erfüllt.'
    ]
  };
  
  readonly founderInfo = {
    name: 'relain',
    retirementDate: 'April 2015',
    foundingText: 'Gegründet wurde das TTT von',
    retirementText: 'der im',
    retirementAction: 'von seiner Leitungsposition zurückgetreten ist.'
  };
  
  readonly fictionSection = {
    title: 'Fiktive Geschichte des TTT',
    subtitle: 'Abteilung 22 - Operative Geschichtsschreibung',
    documentationLink: 'https://drive.google.com/file/d/1QpkevojoID6-HfPsp5GIW3OUmUjnfOSd/view',
    documentationLabel: 'Vollständige Dokumentation'
  };
  
  readonly callToAction = {
    title: 'Werde Teil der Geschichte',
    subtitle: 'Die Chronik des TTT wird täglich fortgeschrieben.',
    links: [
      {
        url: 'https://discord.tacticalteam.de',
        label: 'Discord',
        icon: 'pi-discord',
        isPrimary: true
      },
      {
        routerLink: '/mitmachen',
        label: 'Mitmachen',
        icon: 'pi-users',
        isPrimary: false
      }
    ]
  };

  readonly timelineEvents: TimelineEvent[] = this.createTimelineEvents();

  private createTimelineEvents(): TimelineEvent[] {
    const eventData: (Omit<TimelineEvent, 'id'> & { id: string })[] = [
      { id: 'founding', date: '11. November 2013', title: 'Operation Genesis', description: 'Offizielle Gründung des Tactical Training Teams', type: 'anniversary', icon: 'pi-flag', details: ['Nachfolger des GT-Kommando-Projekts', 'Marktanalyse der Arma3-Community durchgeführt', 'Kombination aus Training, Teamspiel und offener Community'] },
      { id: 'newsletter-2014', date: 'März 2014', title: 'Operation Intel', description: 'Veröffentlichung des ersten TTT-Newsletters', type: 'milestone', icon: 'pi-file-edit', details: ['Erste offizielle Kommunikation an die Mitglieder', 'Etablierung regelmäßiger Informationskanäle'] },
      { id: 'rookie-events', date: 'Mai 2015', title: 'Operation Rookie', description: 'Einführung von Einsteiger-Events und Managementposten', type: 'system', icon: 'pi-users', details: ['Strukturierte Ausbildungsprogramme entwickelt', 'Managementposten zur besseren Organisation', 'Fokus auf Einsteiger-freundliche Events'] },
      { id: 'server-handover', date: 'Juni 2016', title: 'Operation Handover', description: 'Beendigung des TTT-Public-Servers und Übertragung an ArmaWorld', type: 'system', icon: 'pi-server', details: ['Strategische Neuausrichtung der Community', 'Fokus auf Events statt Public Gaming', 'Partnerschaft mit ArmaWorld etabliert'] },
      { id: 'tvt-era', date: 'September 2018', title: 'Operation Gladiator', description: 'Neue Sparte im TTT: TVT-Team und E-Sport-Ära', type: 'milestone', icon: 'pi-trophy', details: ['Start der Electronic Sports Masters™ (ESM)', 'Wettkampforientierte Missionsformate', 'Professionelle E-Sport-Aktivitäten'] },
      { id: 'corporate-design', date: 'Januar 2019', title: 'Operation Rebrand', description: 'Das neue Corporate-Design wird eingeführt', type: 'milestone', icon: 'pi-palette', details: ['Moderne visuelle Identität entwickelt', 'Einheitliches Branding für alle Plattformen', 'Professioneller Auftritt etabliert'] },
      { id: 'rank-structure', date: 'März 2019', title: 'Operation Hierarchy', description: 'TTT-Rangneustrukturierung zu Soldat, Veteran und Gast', type: 'system', icon: 'pi-sitemap', details: ['Vereinfachte Rangstruktur eingeführt', 'Etablierung von Offiziersposten', 'Klare Hierarchien und Verantwortlichkeiten'] },
      { id: 'website-relaunch', date: 'September 2020', title: 'Operation Digital', description: 'Neuer TTT-Webauftritt mit modernem Design', type: 'milestone', icon: 'pi-globe', details: ['Responsive Design für alle Geräte', 'Verbesserte Navigation und Benutzerfreundlichkeit', 'Integration moderner Webtechnologien'] },
      { id: 'wiki-launch', date: 'Oktober 2021', title: 'Operation Knowledge', description: 'TTT-Wiki mit über 150 Informationsseiten veröffentlicht', type: 'milestone', icon: 'pi-book', details: ['Umfassende Wissensdatenbank erstellt', 'Taktische Handbücher und Guides', 'Ablösung der alten Taktik-Fibel', 'Community-basierte Inhaltserstellung'] },
      { id: 'anniversary-10', date: '11. November 2023', title: 'Operation Decade', description: '10 Jahre TTT - Eine erfolgreiche Dekade der taktischen Exzellenz', type: 'anniversary', icon: 'pi-star', details: ['Eine der ältesten deutschsprachigen Arma3-Communities', 'Über 1000 durchgeführte Events und Missionen', 'Hunderte ausgebildete Community-Mitglieder', 'Kontinuierliches Wachstum und Innovation'] }
    ];
    return eventData;
  }

  // Template helper methods
  trackByEvent(index: number, event: TimelineEvent): string {
    return event.id;
  }

  readonly trackByIndex = TrackByUtils.trackByIndex;

  private readonly eventTypeConfig = {
    anniversary: { color: 'border-tttRed bg-tttRed text-tttWhite', label: 'Jubiläum' },
    milestone: { color: 'border-blue-500 bg-blue-500/20 text-blue-300', label: 'Meilenstein' },
    system: { color: 'border-orange-500 bg-orange-500/20 text-orange-300', label: 'System' },
    default: { color: 'border-tttGray-500 bg-tttGray-500/20 text-tttGray-300', label: 'Event' }
  };

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

  // Helper method to strip HTML tags for accessibility
  getCleanTitle(title: string): string {
    return this.sanitizationService.stripHtml(title);
  }

  // Button styling methods to eliminate duplication
  getPrimaryButtonClasses(): string {
    return 'inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-tttRed to-tttRed-600 px-4 py-2 text-sm font-bold text-tttWhite shadow-lg transition-all duration-300 hover:shadow-xl hover:shadow-tttRed/30';
  }

  getSecondaryButtonClasses(): string {
    return 'inline-flex items-center gap-2 rounded-lg border border-tttWhite/30 bg-tttWhite/10 px-4 py-2 text-sm font-bold text-tttWhite transition-all duration-300 hover:bg-tttWhite/20';
  }
}