import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { TrackByUtils } from '../../../shared/utils/trackby.utils';
import { PageTitleService } from '../../../core/services/page-title.service';
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
  imports: [CommonModule, RouterLink],
  templateUrl: './chronik.component.html',
  styleUrl: './chronik.component.css'
})

export class ChronikComponent implements OnInit {
  timelineEvents: TimelineEvent[] = [
    {
      id: 'genesis',
      title: 'Operation Genesis',
      date: '11. November 2013',
      type: 'anniversary',
      icon: 'pi-flag',
      color: 'border-tttRed bg-tttRed text-tttWhite',
      description: 'Offizielle Gründung des Tactical Training Teams',
      details: [
        'Nachfolger des GT-Kommando-Projekts',
        'Marktanalyse der Arma3-Community durchgeführt',
        'Kombination aus Training, Teamspiel und offener Community'
      ]
    },
    {
      id: 'intel',
      title: 'Operation Intel',
      date: 'März 2014',
      type: 'milestone',
      icon: 'pi-file-edit',
      color: 'border-blue-500 bg-blue-500/20 text-blue-300',
      description: 'Veröffentlichung des ersten TTT-Newsletters',
      details: [
        'Erste offizielle Kommunikation an die Mitglieder',
        'Etablierung regelmäßiger Informationskanäle'
      ]
    },
    {
      id: 'rookie',
      title: 'Operation Rookie',
      date: 'Mai 2015',
      type: 'system',
      icon: 'pi-users',
      color: 'border-orange-500 bg-orange-500/20 text-orange-300',
      description: 'Einführung von Einsteiger-Events und Managementposten',
      details: [
        'Strukturierte Ausbildungsprogramme entwickelt',
        'Managementposten zur besseren Organisation',
        'Fokus auf Einsteiger-freundliche Events'
      ]
    },
    {
      id: 'handover',
      title: 'Operation Handover',
      date: 'Juni 2016',
      type: 'system',
      icon: 'pi-server',
      color: 'border-orange-500 bg-orange-500/20 text-orange-300',
      description: 'Beendigung des TTT-Public-Servers und Übertragung an ArmaWorld',
      details: [
        'Strategische Neuausrichtung der Community',
        'Fokus auf Events statt Public Gaming'
      ]
    },
    {
      id: 'gladiator',
      title: 'Operation Gladiator',
      date: 'September 2018',
      type: 'milestone',
      icon: 'pi-trophy',
      color: 'border-blue-500 bg-blue-500/20 text-blue-300',
      description: 'Neue Sparte im TTT: TVT-Team und E-Sport-Ära',
      details: [
        'Electronic Sports Masters™ (ESM)',
        'Wettkampforientierte Missionsformate',
        'Professionelle E-Sport-Aktivitäten'
      ]
    },
    {
      id: 'rebrand',
      title: 'Operation Rebrand',
      date: 'Januar 2019',
      type: 'milestone',
      icon: 'pi-palette',
      color: 'border-blue-500 bg-blue-500/20 text-blue-300',
      description: 'Das neue Corporate-Design wird eingeführt',
      details: [
        'Moderne visuelle Identität entwickelt',
        'Einheitliches Branding für alle Plattformen',
        'Professioneller Auftritt etabliert'
      ]
    },
    {
      id: 'hierarchy',
      title: 'Operation Hierarchy',
      date: 'März 2019',
      type: 'system',
      icon: 'pi-sitemap',
      color: 'border-orange-500 bg-orange-500/20 text-orange-300',
      description: 'TTT-Rangneustrukturierung zu Soldat, Veteran und Gast',
      details: [
        'Vereinfachte Rangstruktur eingeführt',
        'Etablierung von Offiziersposten'
      ]
    },
    {
      id: 'digital',
      title: 'Operation Digital',
      date: 'September 2020',
      type: 'milestone',
      icon: 'pi-globe',
      color: 'border-blue-500 bg-blue-500/20 text-blue-300',
      description: 'Neuer TTT-Webauftritt mit modernem Design',
      details: [
        'Responsive Design für alle Geräte',
        'Verbesserte Navigation',
        'Integration moderner Webtechnologien'
      ]
    },
    {
      id: 'knowledge',
      title: 'Operation Knowledge',
      date: 'Oktober 2021',
      type: 'milestone',
      icon: 'pi-book',
      color: 'border-blue-500 bg-blue-500/20 text-blue-300',
      description: 'TTT-Wiki mit über 150 Informationsseiten veröffentlicht',
      details: [
        'Umfassende Wissensdatenbank erstellt',
        'Taktische Handbücher und Guides',
        'Ablösung der alten Taktik-Fibel',
        'Community-basierte Inhaltserstellung'
      ]
    },
    {
      id: 'decade',
      title: 'Operation Decade',
      date: '11. November 2023',
      type: 'anniversary',
      icon: 'pi-star',
      color: 'border-tttRed bg-tttRed text-tttWhite',
      description: '10 Jahre TTT - Eine erfolgreiche Dekade der taktischen Exzellenz',
      details: [
        'Eine der ältesten deutschsprachigen Arma3-Communities',
        'Über 1000 durchgeführte Events und Missionen',
        'Hunderte ausgebildete Community-Mitglieder'
      ]
    }
  ];

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

  readonly pageTitle = 'TTT-Chronik';
  readonly pageSubtitle = 'Geschichte des Tactical Training Teams';

  // Dependency injection
  private readonly pageTitleService = inject(PageTitleService);
  private readonly sanitizationService = inject(SanitizationService);

  // TrackBy functions
  readonly trackByIndex = TrackByUtils.trackByIndex;

  ngOnInit(): void {
    this.pageTitleService.setTitle(this.pageTitle);
  }

  // External documentation link (dynamic)
  readonly fictionDocumentationLink = 'https://drive.google.com/file/d/1QpkevojoID6-HfPsp5GIW3OUmUjnfOSd/view';

  // Template helper methods
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

}
