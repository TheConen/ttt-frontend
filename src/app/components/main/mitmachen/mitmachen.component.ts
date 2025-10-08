import { Component, OnInit, OnDestroy, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonDirective } from 'primeng/button';
import { TrackByUtils } from '../../../shared/utils/trackby.utils';
import { PageTitleService } from '../../../core/services/page-title.service';
import { SanitizationService } from '../../../core/services/sanitization.service';

// Component configuration constants
const MITMACHEN_CONFIG = {
  PAGE_TITLE: 'Mitmachen - Werde Teil des TTT',
  SECURITY: {
    MIN_LINK_INTERVAL: 1000, // Minimum milliseconds between link clicks
    RADIX: 10, // Base for parseInt operations
    WINDOW_FEATURES: 'noopener,noreferrer' // Secure window features for window.open()
  },
  EXTERNAL_LINKS: {
    DISCORD: 'https://discord.tacticalteam.de',
    EVENTS: 'https://events.tacticalteam.de/events/',
    ARMA3SYNC_GUIDE: 'https://wiki.tacticalteam.de/Technik/ArmA3Sync',
    ARMA3SYNC_VIDEO: 'https://www.youtube.com/watch?v=lJ2DYk7SMPY&source_ve_path=MjM4NTE',
    ARMA3SYNC_TIPS: 'https://www.youtube.com/watch?v=mFCTQJLqQNY'
  },
  CSS_CLASSES: {
    ICON_CONTAINER_BASE: 'w-12 h-12 rounded-lg flex items-center justify-center',
    ICON_CONTAINER_SMALL: 'w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0',
    BUTTON_BASE: 'inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-bold transition-all duration-300',
    FEATURE_LIST_ITEM: 'flex items-start gap-2'
  },
  COLORS: {
    ICON_RED: 'bg-tttRed',
    ICON_GREEN: 'bg-tttGreen',
    ICON_WHITE: 'bg-tttGray-600', // White-styled icon background
    ICON_GRAY: 'bg-tttGray-600',
    ICON_DISCORD: 'bg-[#5865F2]',
    TEXT_RED: 'text-tttRed',
    TEXT_GREEN: 'text-tttGreen',
    TEXT_WHITE: 'text-tttWhite'
  }
} as const;

// Helper functions for creating consistent objects
const createIconItem = (icon: string, iconColor: string, text: string) => ({
  icon,
  iconColor,
  text
});

const createRequirement = (id: string, title: string, description: string, icon: string, iconColor: string): Requirement => ({
  id,
  title,
  description,
  icon,
  iconColor
});

// Base interfaces for reusability
interface BaseItem {
  id?: string;
  title: string;
  icon: string;
}

interface BaseItemWithDescription extends BaseItem {
  description: string;
}

interface BaseItemWithAction extends BaseItemWithDescription {
  buttonLabel: string;
  action: () => void;
}

// Specific interfaces
interface JoinPath extends BaseItem {
  id: string;
  subtitle: string;
  description: string;
  iconColor: string;
  textColor: string;
  features: string[];
  buttonLabel: string;
  buttonAction: () => void;
}

interface Requirement extends BaseItemWithDescription {
  id: string;
  iconColor: string;
}

interface GameRequirement {
  game: string;
  requirements: string;
  icon: string;
  iconColor: string;
}

interface Arma3SyncOption extends BaseItemWithAction {
  id: string;
}

@Component({
  selector: 'ttt-mitmachen',
  imports: [
    CommonModule,
    ButtonDirective
  ],
  templateUrl: './mitmachen.component.html',
  styleUrl: './mitmachen.component.css'
})
export class MitmachenComponent implements OnInit, OnDestroy {
  
  // Dependency injection
  private readonly pageTitleService = inject(PageTitleService);
  private readonly sanitizationService = inject(SanitizationService);
  
  // TrackBy functions - consolidated for reusability
  readonly trackByIndex = TrackByUtils.trackByIndex;
  readonly trackById = (index: number, item: { id: string }): string => item.id;
  readonly trackByGameReq = (index: number, item: GameRequirement): string => item.game;
  readonly trackByTitle = (index: number, item: { title: string }): string => item.title;

  // Component data
  readonly pageTitle = 'Mitmachen beim TTT';
  readonly pageSubtitle = 'Bei uns gibt\'s regelmäßig Events für Arma 3 und Arma Reforger. Du kannst deine Skills trainieren, spannende Missionen erleben oder dich in taktischen Gefechten beweisen.';
  readonly eventSchedule = 'dienstags und freitags von 19:30 bis 23:30 Uhr';
  
  // CSS utility functions
  readonly getCssClasses = {
    iconContainer: (color: string, extraClasses = '') => 
      `${MITMACHEN_CONFIG.CSS_CLASSES.ICON_CONTAINER_BASE} ${color} ${extraClasses}`,
    iconContainerSmall: (color: string) => 
      `${MITMACHEN_CONFIG.CSS_CLASSES.ICON_CONTAINER_SMALL} ${color}`,
    button: (colorClasses: string) => 
      `${MITMACHEN_CONFIG.CSS_CLASSES.BUTTON_BASE} ${colorClasses}`,
    featureItem: () => MITMACHEN_CONFIG.CSS_CLASSES.FEATURE_LIST_ITEM
  };

  // Security utility functions for template usage
  readonly securityUtils = {
    sanitizeHtml: (html: string) => this.sanitizationService.sanitizeHtml(html),
    stripHtml: (html: string) => this.sanitizationService.stripHtml(html),
    isSafeUrl: (url: string) => this.sanitizationService.isSafeUrl(url)
  };
  
  // Hero section data
  readonly heroData = {
    badge: {
      icon: 'pi-users',
      text: 'Das TTT als offene Community'
    },
    additionalText: 'Mitmachen kann jeder - egal ob Rekrut oder Gast.',
    logoAlt: 'TTT Logo'
  };

  // Section titles and descriptions
  readonly sections = {
    joinPaths: {
      title: 'Deine Wege in das TTT',
      description: 'Zwei verschiedene Wege führen zu uns – wähle den passenden für dich'
    },
    requirements: {
      title: 'Die Voraussetzungen',
      description: 'Was du für die Teilnahme an unseren Events brauchst',
      gameRequirementsTitle: 'Spiel-Anforderungen',
      additionalRequirementsTitle: 'Weitere Voraussetzungen'
    },
    arma3Sync: {
      title: 'Arma3Sync und Tech-Check',
      description: 'Für Arma 3 Events benötigst du Arma3Sync für Mods. Arma Reforger lädt Mods automatisch beim Server-Join.',
      cardTitle: 'Arma3Sync - Nur für Arma 3',
      cardDescription: 'Für Arma 3 Events musst du Modifikationen über Arma3Sync herunterladen. Bei Arma Reforger werden Mods automatisch beim Server-Join geladen. Wähle deine bevorzugte Lernmethode für Arma3Sync.'
    },
    techCheck: {
      title: 'Tech-Check',
      description: 'Bevor du an Events teilnimmst, solltest du sicherstellen, dass alles korrekt funktioniert.',
      hintsTitle: 'Wichtige Hinweise zum Tech-Check',
      hints: [
        'Solltest du Fragen oder Probleme haben, stehen dir unsere Technikchecker zur Verfügung',
        'Erreiche sie über das Hammer-Symbol im TeamSpeak (ts3.tacticalteam.de)',
        'Überprüfe vor dem Event bitte, ob alles funktioniert - spätestens bis 18 Uhr am Event-Tag!'
      ]
    },
    eventPaths: {
      title: 'Dein Event in das TTT',
      description: 'Zwei verschiedene Wege stehen zur Auswahl – je nach deiner Erfahrung'
    },
    finalCta: {
      title: 'Das nächste Einsteiger Event finden',
      description: 'Anmeldung TTT-Discord → Setup (Arma3Sync für Arma 3) → Einsteiger-Event → Los geht\'s!',
      buttons: {
        events: 'Jetzt nachschauen',
        discord: 'Discord beitreten'
      },
      stats: [
        { value: '80+', label: 'Aktive Mitglieder' },
        { value: '2x', label: 'Events pro Woche' },
        { value: '2013', label: 'Gegründet' }
      ]
    }
  };

  readonly joinPaths: JoinPath[] = [
    {
      id: 'recruit',
      title: 'Rekrut - Community Mitglied',
      subtitle: 'Der Standard-Weg ins TTT',
      description: 'Als Rekrut wirst du fester Bestandteil unserer Community und kannst an allen Events teilnehmen. Du durchläufst eine kurze Einführungsphase und lernst unsere Spielweise kennen.',
      icon: 'pi-user-plus',
      iconColor: MITMACHEN_CONFIG.COLORS.ICON_RED,
      textColor: MITMACHEN_CONFIG.COLORS.TEXT_RED,
      features: [
        'Vollwertige Community-Mitgliedschaft',
        'Teilnahme an allen Events',
        'Zugang zu internen Bereichen',
        'Möglichkeit zur Weiterentwicklung'
      ],
      buttonLabel: 'Discord beitreten',
      buttonAction: () => this.openExternalLink(MITMACHEN_CONFIG.EXTERNAL_LINKS.DISCORD)
    },
    {
      id: 'guest',
      title: 'Gast',
      subtitle: 'Flexibel und unverbindlich',
      description: 'Der Rang "Gast" eignet sich für Spieler, die gelegentlich bei uns teilnehmen möchten, ohne Verpflichtungen zu übernehmen. Dieser Rang ist auch für Spieler aus anderen Arma 3 Communities gedacht.',
      icon: 'pi-users',
      iconColor: MITMACHEN_CONFIG.COLORS.ICON_WHITE,
      textColor: MITMACHEN_CONFIG.COLORS.TEXT_WHITE,
      features: [
        'Keine Verpflichtungen oder Probezeit',
        'Ideal für andere Community-Mitglieder',
        'Gelegentliche Teilnahme möglich',
        'Schneller Einstieg'
      ],
      buttonLabel: 'Discord beitreten',
      buttonAction: () => this.openExternalLink(MITMACHEN_CONFIG.EXTERNAL_LINKS.DISCORD)
    }
  ];

  readonly requirements: Requirement[] = [
    {
      id: 'age',
      title: 'Ab 18 Jahre',
      description: 'Wir sind der Meinung, dass Arma 3 und Reforger reife Persönlichkeiten brauchen, die die Geduld aufbringen, taktisch zu spielen.',
      icon: 'pi-id-card',
      iconColor: MITMACHEN_CONFIG.COLORS.ICON_RED
    },
    {
      id: 'communication',
      title: 'Headset für TS3 & Discord',
      description: 'Für den Spielbetrieb und zur Kommunikation innerhalb der Community zwingend notwendig.',
      icon: 'pi-microphone',
      iconColor: MITMACHEN_CONFIG.COLORS.ICON_DISCORD
    },
    {
      id: 'discipline',
      title: 'Disziplin während Events',
      description: 'Motivation die das taktische Spielen erfordert und die Geduld, den Feind auch mal nur zu beobachten.',
      icon: 'pi-shield',
      iconColor: MITMACHEN_CONFIG.COLORS.ICON_GREEN
    },
    {
      id: 'hardware',
      title: 'Geeigneter Computer',
      description: 'PC der auch bei anspruchsvollen Missionen mit bis zu 60+ Spielern in beiden Arma-Titeln flüssig läuft.',
      icon: 'pi-cog',
      iconColor: MITMACHEN_CONFIG.COLORS.ICON_GRAY
    },
    {
      id: 'learning',
      title: 'Bereitschaft um Neues zu lernen',
      description: 'Sich innerhalb des Spiels in ein Team einzugliedern und sich an die Spielgewohnheiten des TTT anzupassen.',
      icon: 'pi-book',
      iconColor: MITMACHEN_CONFIG.COLORS.ICON_GREEN
    },
    {
      id: 'reliability',
      title: 'Zuverlässigkeit & Pünktlichkeit',
      description: 'Regelmäßige und pünktliche Teilnahme an Events. Bei Verhinderung rechtzeitige Abmeldung.',
      icon: 'pi-clock',
      iconColor: MITMACHEN_CONFIG.COLORS.ICON_RED
    }
  ];

  readonly hints = [
    createIconItem('pi-check', MITMACHEN_CONFIG.COLORS.TEXT_GREEN, 'Solltest du Fragen oder Probleme haben, stehen dir unsere Technikchecker zur Verfügung'),
    createIconItem('pi-check', MITMACHEN_CONFIG.COLORS.TEXT_GREEN, 'Erreiche sie über das Hammer-Symbol im TeamSpeak (ts3.tacticalteam.de)'),
    createIconItem('pi-exclamation-triangle', MITMACHEN_CONFIG.COLORS.TEXT_RED, '<strong>Überprüfe vor dem Event bitte, ob alles funktioniert - spätestens bis 18 Uhr am Event-Tag!</strong>')
  ];

  readonly gameRequirements: GameRequirement[] = [
    {
      game: 'Arma 3',
      requirements: 'Apex & Contact DLCs erforderlich',
      icon: 'pi-desktop',
      iconColor: MITMACHEN_CONFIG.COLORS.TEXT_RED
    },
    {
      game: 'Arma Reforger',
      requirements: 'Nur Base Game erforderlich',
      icon: 'pi-play',
      iconColor: MITMACHEN_CONFIG.COLORS.TEXT_GREEN
    }
  ];

  readonly arma3SyncOptions: Arma3SyncOption[] = [
    {
      id: 'guide',
      title: 'Schriftliche Anleitung',
      description: 'Detaillierte Wiki-Anleitung',
      icon: 'pi-file-text',
      buttonLabel: 'Anleitung öffnen',
      action: () => this.openExternalLink(MITMACHEN_CONFIG.EXTERNAL_LINKS.ARMA3SYNC_GUIDE)
    },
    {
      id: 'video',
      title: 'Video-Tutorial',
      description: 'Schritt-für-Schritt Video',
      icon: 'pi-play',
      buttonLabel: 'Video ansehen',
      action: () => this.openExternalLink(MITMACHEN_CONFIG.EXTERNAL_LINKS.ARMA3SYNC_VIDEO)
    },
    {
      id: 'tips',
      title: 'Tipps & Tricks',
      description: 'Hilfreiche Video-Tipps',
      icon: 'pi-lightbulb',
      buttonLabel: 'Tipps ansehen',
      action: () => this.openExternalLink(MITMACHEN_CONFIG.EXTERNAL_LINKS.ARMA3SYNC_TIPS)
    }
  ];

  readonly eventPaths = [
    {
      title: 'Einsteiger Event - Für Jeden',
      subtitle: 'Der Standard-Weg ins TTT',
      description: 'Um erfolgreich an unseren TTT-Events teilzunehmen, musst du eine Einführung in das taktische Spiel erhalten, indem du an einem unserer "Einsteiger-Events" teilnimmst.',
      highlight: 'Ohne Teilnahme an einem Einsteiger-Event kannst du nicht an den normalen TTT-Events teilnehmen.',
      features: [
        'Für alle Erfahrungsstufen geeignet',
        'Solides Fundament für taktisches Spiel',
        'Voraussetzung für normale Events',
        'Regelmäßige Termine verfügbar'
      ],
      buttonLabel: 'Nächstes Einsteiger-Event finden',
      buttonColor: 'border border-tttWhite/30 bg-tttWhite/10 text-tttWhite hover:bg-tttWhite/20',
      icon: 'pi-graduation-cap',
      iconColor: MITMACHEN_CONFIG.COLORS.ICON_WHITE,
      action: () => this.openExternalLink(MITMACHEN_CONFIG.EXTERNAL_LINKS.EVENTS)
    },
    {
      title: 'Fast Path - Für Veteranen',
      subtitle: 'Der schnelle Weg für Erfahrene',
      description: 'Du hast bereits Erfahrung im taktischen Spielen von Arma und verstehst den Begriff MilSim. Du beherrschst ACE & ACRE2 und kennst dich mit taktischen Bewegungen und Angriffsmanövern aus?',
      highlight: 'Dann vereinbare einen Termin für einen Fast-Path mit unserer Personal-Abteilung (@Personal) im Discord.',
      features: [
        'Erfahrung mit ACE & ACRE2 erforderlich',
        'Kenntnisse in taktischen Bewegungen',
        'MilSim-Erfahrung vorhanden',
        'Termin mit Personal-Abteilung'
      ],
      buttonLabel: 'Personal-Abteilung kontaktieren',
      buttonColor: 'bg-gradient-to-r from-tttRed to-tttRed-600 text-tttWhite shadow-lg hover:shadow-xl hover:shadow-tttRed/30',
      icon: 'pi-star',
      iconColor: MITMACHEN_CONFIG.COLORS.ICON_RED,
      action: () => this.openExternalLink(MITMACHEN_CONFIG.EXTERNAL_LINKS.DISCORD)
    }
  ];

  ngOnInit(): void {
    this.pageTitleService.setTitle(MITMACHEN_CONFIG.PAGE_TITLE);
  }

  ngOnDestroy(): void {
    // Cleanup any subscriptions or timers if needed
    // Remove any stored security state on component destruction
    localStorage.removeItem('lastLinkAccess');
  }

  // External link handler with enhanced security and error handling
  private openExternalLink(url: string): void {
    try {
      // Security validation using core service
      if (!this.sanitizationService.isSafeUrl(url)) {
        console.warn('Attempted to open unsafe URL:', url);
        return;
      }

      // Rate limiting check
      const now = Date.now();
      const lastLinkAccess = localStorage.getItem('lastLinkAccess');
      
      if (lastLinkAccess && (now - +lastLinkAccess) < MITMACHEN_CONFIG.SECURITY.MIN_LINK_INTERVAL) {
        console.warn('Too many rapid link access attempts');
        return;
      }

      localStorage.setItem('lastLinkAccess', now.toString());

      // Try secure window opening first  
      try {
        const newWindow = window.open(url, '_blank', MITMACHEN_CONFIG.SECURITY.WINDOW_FEATURES);
        
        if (newWindow) {
          newWindow.opener = null; // Additional security measure
        } else {
          // Fallback: Create invisible link and click it
          const link = document.createElement('a');
          link.href = url;
          link.target = '_blank';
          link.rel = 'noopener noreferrer';
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
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
        document.body.removeChild(link);
      }
    } catch (error) {
      console.error('Failed to open external link:', error);
      // Optional: Show user-friendly error message
    }
  }

  // Consolidated external link methods (for backward compatibility)
  readonly externalLinks = {
    discord: () => this.openExternalLink(MITMACHEN_CONFIG.EXTERNAL_LINKS.DISCORD),
    events: () => this.openExternalLink(MITMACHEN_CONFIG.EXTERNAL_LINKS.EVENTS),
    arma3SyncGuide: () => this.openExternalLink(MITMACHEN_CONFIG.EXTERNAL_LINKS.ARMA3SYNC_GUIDE),
    arma3SyncVideo: () => this.openExternalLink(MITMACHEN_CONFIG.EXTERNAL_LINKS.ARMA3SYNC_VIDEO),
    arma3SyncTips: () => this.openExternalLink(MITMACHEN_CONFIG.EXTERNAL_LINKS.ARMA3SYNC_TIPS)
  };

  // Legacy method aliases (maintain backward compatibility)
  openDiscord = this.externalLinks.discord;
  openEvents = this.externalLinks.events;
  openArma3SyncGuide = this.externalLinks.arma3SyncGuide;
  openArma3SyncVideo = this.externalLinks.arma3SyncVideo;
  openArma3SyncTipps = this.externalLinks.arma3SyncTips;

  // Button styling methods (consistent with other components)
  getPrimaryButtonClasses(): string {
    return 'bg-gradient-to-r from-tttRed to-tttRed-600 text-tttWhite shadow-lg hover:shadow-xl hover:shadow-tttRed/30';
  }

  getSecondaryButtonClasses(): string {
    return 'border border-tttWhite/30 bg-tttWhite/10 text-tttWhite hover:bg-tttWhite/20';
  }
}