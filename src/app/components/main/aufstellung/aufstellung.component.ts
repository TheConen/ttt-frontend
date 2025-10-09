import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TrackByUtils } from '../../../shared/utils/trackby.utils';
import { PageTitleService } from '../../../core/services/page-title.service';
import { SanitizationService } from '../../../core/services/sanitization.service';

// Component configuration constants (Angular 20 Best Practice)
const AUFSTELLUNG_CONFIG = {
  PAGE_TITLE: 'Aufstellung',
  PAGE_SUBTITLE: 'Mitglieder und Struktur des Tactical Training Teams',
  SECURITY: {
    MIN_ACTION_INTERVAL: 100, // Minimum milliseconds between member actions
    RADIX: 10 // Base for parseInt operations
  },
  SECTIONS: {
    OVERVIEW: {
      TITLE: 'Mitgliederübersicht',
      SUBTITLE: 'Aktuelle Personalstärke nach Dienstgraden'
    },
    ROSTER: {
      TITLE: 'Personalaufstellung', 
      SUBTITLE: 'Vollständige Mitgliederliste mit Details'
    }
  },
  UI: {
    MEMBERS_LABEL: 'Mitglieder',
    ACTIVE_MEMBERS_LABEL: 'aktive Mitglieder',
    SECTIONS: {
      MEDALS: 'Auszeichnungen',
      CAMPAIGNS: 'Kampagnen-Teilnahmen',
      DEPARTMENTS: 'Abteilungen'
    },
    NO_DATA: {
      MEDALS: 'Keine',
      CAMPAIGNS: 'Keine',
      DEPARTMENTS: 'Keine'
    },
    ICONS: {
      MEDALS: 'Auszeichnungen',
      CAMPAIGNS: 'Kampagnen',
      DEPARTMENTS: 'Abteilungen'
    },
    LOADING_MESSAGES: {
      LOADING: 'Mitgliederdaten werden geladen...',
      ERROR_TITLE: 'Fehler',
      RETRY_TEXT: 'Erneut versuchen',
      RETRY_ARIA: 'Mitgliederdaten erneut laden'
    }
  },
  CSS_CLASSES: {
    BUTTON_PRIMARY: 'inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-tttRed to-tttRed-600 px-4 py-2 text-sm font-bold text-tttWhite shadow-lg transition-all duration-300 hover:shadow-xl hover:shadow-tttRed/30',
    BUTTON_SECONDARY: 'inline-flex items-center gap-2 rounded-lg border border-tttWhite/30 bg-tttWhite/10 px-4 py-2 text-sm font-bold text-tttWhite transition-all duration-300 hover:bg-tttWhite/20'
  },
  ASSETS: {
    RANKS: {
      BASE_PATH: '/img/aufstellung/ranks/',
      OFFIZIER: 'TTT-Icon_Offizier.png',
      UNTEROFFIZIER: 'TTT-Icon_Unteroffizier.png',
      VETERAN: 'TTT-Icon_Soldat-Veteran.png',
      SOLDAT: 'TTT-Icon_Soldat-Veteran.png',
      REKRUT: 'TTT-Icon_Rekrut.png',
      GAST: 'TTT-Icon_Gast.png'
    },
    MEDALS: {
      BASE_PATH: '/img/aufstellung/medals/',
      HONOR: 'ttt_mdh.png'
    },
    RIBBONS: {
      BASE_PATH: '/img/aufstellung/ribbons/',
      ASPIS: 'ttt_veteran-kampagne-aspis.png',
      BETH_NAHRIN: 'ttt_veteran-kampagne-beth-nahrin.png',
      ENTZUG: 'ttt_veteran-kampagne-entzug-q4-2015.png',
      PARADISO: 'ttt_veteran-kampagne-paradiso.png',
      PHOENIX: 'ttt_veteran-kampagne-phoenix-q2-2016.jpg',
      THEMIS_Q1: 'ttt_veteran-kampagne-themis-q1-2015.png',
      THEMIS_Q2: 'ttt_veteran-kampagne-themis-q2-2015.png'
    },
    GROUPS: {
      BASE_PATH: '/img/aufstellung/group/',
      AUSBILDUNG: 'group-missionsbau-icon.png',
      MEDIEN: 'group-pr-icon.png', 
      TECHNIK: 'group-technik-icon.png'
    },
    AVATARS: {
      OFFIZIER: '/img/aufstellung/offizier-kopf.webp'
    }
  }
} as const;

interface Medal {
  id: string;
  name: string;
  image: string;
  description: string;
}

interface CampaignRibbon {
  id: string;
  name: string;
  image: string;
  campaign: string;
  year: string;
}

interface Abteilung {
  id: string;
  name: string;
  icon: string;
  description: string;
}

interface Member {
  id: string;
  name: string;
  rank: RankType;
  avatar: string;
  memberSince: string;
  medals: Medal[];
  campaignRibbons: CampaignRibbon[];
  abteilungen: Abteilung[];
  isExpanded?: boolean;
}

type RankType = 'offizier' | 'unteroffizier' | 'veteran' | 'soldat' | 'rekrut' | 'gast';

interface RankInfo {
  name: string;
  shortName: string;
  icon: string;
  color: string;
  priority: number;
}

@Component({
  selector: 'ttt-aufstellung',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './aufstellung.component.html',
  styleUrl: './aufstellung.component.css'
})
export class AufstellungComponent implements OnInit {
  // Dependency injection (Angular 20 Best Practice)
  private readonly pageTitleService = inject(PageTitleService);
  private readonly sanitizationService = inject(SanitizationService);
  // TODO: Inject member service when available
  // private readonly memberService = inject(MemberService);

  // Component data properties
  readonly pageTitle = AUFSTELLUNG_CONFIG.PAGE_TITLE;
  readonly pageSubtitle = AUFSTELLUNG_CONFIG.PAGE_SUBTITLE;
  readonly sections = AUFSTELLUNG_CONFIG.SECTIONS;
  readonly ui = AUFSTELLUNG_CONFIG.UI;
  readonly loadingMessages = AUFSTELLUNG_CONFIG.UI.LOADING_MESSAGES;

  // Loading and error states (Backend-Ready)
  isLoading = false;
  loadingError: string | null = null;

  ngOnInit(): void {
    this.pageTitleService.setTitle(AUFSTELLUNG_CONFIG.PAGE_TITLE);
    this.loadMembers();
  }

  // TrackBy functions - consolidated for reusability (following mitmachen pattern)  
  readonly trackByRank = TrackByUtils.trackByIndex;
  readonly trackByMember = TrackByUtils.trackByProperty<Member>('id');
  readonly trackByMedal = TrackByUtils.trackByProperty<Medal>('id');
  readonly trackByCampaignRibbon = TrackByUtils.trackByProperty<CampaignRibbon>('id');
  readonly trackByAbteilung = TrackByUtils.trackByProperty<Abteilung>('id');

  // Security utility functions for template usage (consistent with other components)
  readonly securityUtils = {
    sanitizeHtml: (html: string) => this.sanitizationService.sanitizeHtml(html),
    stripHtml: (html: string) => this.sanitizationService.stripHtml(html),
    isSafeUrl: (url: string) => this.sanitizationService.isSafeUrl(url)
  };

  // Rank configuration (militärische Hierarchie) - using configuration constants
  readonly rankInfo: Record<RankType, RankInfo> = {
    offizier: {
      name: 'Offizier',
      shortName: 'Off.',
      icon: `${AUFSTELLUNG_CONFIG.ASSETS.RANKS.BASE_PATH}${AUFSTELLUNG_CONFIG.ASSETS.RANKS.OFFIZIER}`,
      color: 'text-yellow-500',  // Gold wie das Logo
      priority: 1
    },
    unteroffizier: {
      name: 'Unteroffizier',
      shortName: 'Uffz.',
      icon: `${AUFSTELLUNG_CONFIG.ASSETS.RANKS.BASE_PATH}${AUFSTELLUNG_CONFIG.ASSETS.RANKS.UNTEROFFIZIER}`,
      color: 'text-gray-400',    // Silber/grau wie das Logo
      priority: 2
    },
    veteran: {
      name: 'Veteran',
      shortName: 'Vet.',
      icon: `${AUFSTELLUNG_CONFIG.ASSETS.RANKS.BASE_PATH}${AUFSTELLUNG_CONFIG.ASSETS.RANKS.VETERAN}`,
      color: 'text-green-500',   // grün
      priority: 3
    },
    soldat: {
      name: 'Soldat',
      shortName: 'Sdt.',
      icon: `${AUFSTELLUNG_CONFIG.ASSETS.RANKS.BASE_PATH}${AUFSTELLUNG_CONFIG.ASSETS.RANKS.SOLDAT}`,
      color: 'text-blue-900',    // dunkelblau
      priority: 4
    },
    rekrut: {
      name: 'Rekrut',
      shortName: 'Rekr.',
      icon: `${AUFSTELLUNG_CONFIG.ASSETS.RANKS.BASE_PATH}${AUFSTELLUNG_CONFIG.ASSETS.RANKS.REKRUT}`,
      color: 'text-blue-300',    // hellblau
      priority: 5
    },
    gast: {
      name: 'Gast',
      shortName: 'Gast',
      icon: `${AUFSTELLUNG_CONFIG.ASSETS.RANKS.BASE_PATH}${AUFSTELLUNG_CONFIG.ASSETS.RANKS.GAST}`,
      color: 'text-gray-300',    // hellgrau
      priority: 6
    }
  } as const;

  // Section configuration removed - already defined above

  // Rank order for iteration (maintains military hierarchy)
  readonly rankOrder: RankType[] = ['offizier', 'unteroffizier', 'veteran', 'soldat', 'rekrut', 'gast'] as const;

  // Members data (will be loaded from backend)
  members: Member[] = [];

  // Computed properties
  get membersByRank(): Record<RankType, Member[]> {
    const grouped: Record<RankType, Member[]> = {
      offizier: [],
      unteroffizier: [],
      veteran: [],
      soldat: [],
      rekrut: [],
      gast: []
    };

    this.members.forEach(member => {
      grouped[member.rank].push(member);
    });

    // Sort members within each rank by name
    Object.keys(grouped).forEach(rank => {
      grouped[rank as RankType].sort((a, b) => a.name.localeCompare(b.name));
    });

    return grouped;
  }

  get memberStats(): Record<RankType, number> {
    const stats: Record<RankType, number> = {
      offizier: 0,
      unteroffizier: 0,
      veteran: 0,
      soldat: 0,
      rekrut: 0,
      gast: 0
    };

    this.members.forEach(member => {
      stats[member.rank]++;
    });

    return stats;
  }

  get totalMembers(): number {
    return this.members.length;
  }



  // Get arbeitsgruppen based on member role - according to organigramm
  private getRandomAbteilungen(index: number, name: string): Abteilung[] {
    if (name === 'SpecOp0') {
      // SpecOp0 bekommt alle Abteilungen als Demonstration
      return [
        { id: 'abt-1', name: 'Ausbildung', icon: `${AUFSTELLUNG_CONFIG.ASSETS.GROUPS.BASE_PATH}${AUFSTELLUNG_CONFIG.ASSETS.GROUPS.AUSBILDUNG}`, description: 'Verantwortlich für die Ausbildung neuer Rekruten' },
        { id: 'abt-2', name: 'Medien & PR', icon: `${AUFSTELLUNG_CONFIG.ASSETS.GROUPS.BASE_PATH}${AUFSTELLUNG_CONFIG.ASSETS.GROUPS.MEDIEN}`, description: 'Social Media und Öffentlichkeitsarbeit' },
        { id: 'abt-3', name: 'Technik', icon: `${AUFSTELLUNG_CONFIG.ASSETS.GROUPS.BASE_PATH}${AUFSTELLUNG_CONFIG.ASSETS.GROUPS.TECHNIK}`, description: 'Server-Administration und technische Wartung' }
      ];
    }

    const allGroups: Abteilung[] = [
      { id: 'abt-1', name: 'Ausbildung', icon: `${AUFSTELLUNG_CONFIG.ASSETS.GROUPS.BASE_PATH}${AUFSTELLUNG_CONFIG.ASSETS.GROUPS.AUSBILDUNG}`, description: 'Verantwortlich für die Ausbildung neuer Rekruten' },
      { id: 'abt-2', name: 'Medien & PR', icon: `${AUFSTELLUNG_CONFIG.ASSETS.GROUPS.BASE_PATH}${AUFSTELLUNG_CONFIG.ASSETS.GROUPS.MEDIEN}`, description: 'Social Media und Öffentlichkeitsarbeit' },
      { id: 'abt-3', name: 'Technik', icon: `${AUFSTELLUNG_CONFIG.ASSETS.GROUPS.BASE_PATH}${AUFSTELLUNG_CONFIG.ASSETS.GROUPS.TECHNIK}`, description: 'Server-Administration und technische Wartung' }
    ];

    // Zufällige Anzahl von Gruppen (1-2)
    const numGroups = Math.floor(Math.random() * 2) + 1;
    const shuffled = [...allGroups].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, numGroups);
  }

  // Load members (dummy data - will be replaced with backend call)
  // Public method for retry functionality
  retryLoading(): void {
    this.loadMembers();
  }

  private loadMembers(): void {
    this.isLoading = true;
    this.loadingError = null;

    try {
      // TODO: Replace with actual backend call
      // this.memberService.getAllMembers().subscribe({
      //   next: (members: Member[]) => {
      //     this.members = members;
      //     this.isLoading = false;
      //   },
      //   error: (error) => {
      //     this.loadingError = 'Fehler beim Laden der Mitgliederdaten';
      //     this.isLoading = false;
      //     console.error('Error loading members:', error);
      //   }
      // });

      // DUMMY DATA - Remove when backend is ready
      this.loadDummyMembers();
      this.isLoading = false;
    } catch (error) {
      this.loadingError = 'Fehler beim Laden der Mitgliederdaten';
      this.isLoading = false;
      console.error('Error loading members:', error);
    }
  }

  // TODO: Remove this method when backend integration is complete
  private loadDummyMembers(): void {
    const baseMembers = [
      // Offiziere (max 2) - Führungsebene
      { name: 'TheConen', rank: 'offizier' as RankType, year: '2015', hasDetails: true },
      { name: 'SpecOp0', rank: 'offizier' as RankType, year: '2016', hasDetails: true },
      
      // Unteroffiziere (max 2) - Manager-Ebene
      { name: 'Reimchen', rank: 'unteroffizier' as RankType, year: '2018', hasDetails: true },
      { name: 'rockn_roller', rank: 'unteroffizier' as RankType, year: '2019', hasDetails: true },
      
      // Veteranen (max 2) - Erfahrene Mitglieder
      { name: 'GSG9_abzocker', rank: 'veteran' as RankType, year: '2017', hasDetails: true },
      { name: 'Speutzi', rank: 'veteran' as RankType, year: '2018', hasDetails: true },
      
      // Soldaten (max 2) - Aktive Mitglieder
      { name: 'Corben', rank: 'soldat' as RankType, year: '2022', hasDetails: true },
      { name: 'SchmerzKeks', rank: 'soldat' as RankType, year: '2023', hasDetails: false },
      
      // Rekruten (max 2) - Neue Mitglieder  
      { name: 'Epsilon', rank: 'rekrut' as RankType, year: '2024', hasDetails: true },
      { name: 'Addi995', rank: 'rekrut' as RankType, year: '2024', hasDetails: false },
      
      // Gäste (max 2) - Interessenten
      { name: 'Mynx', rank: 'gast' as RankType, year: '2024', hasDetails: false },
      { name: 'Leroy', rank: 'gast' as RankType, year: '2024', hasDetails: false }
    ];

    this.members = baseMembers.map((base, index) => ({
      id: `member-${index + 1}`, // Backend will provide UUIDs
      name: base.name,
      rank: base.rank,
      avatar: base.rank === 'offizier' ? AUFSTELLUNG_CONFIG.ASSETS.AVATARS.OFFIZIER : '',
      memberSince: `${base.year}-${String(Math.floor(Math.random() * 12) + 1).padStart(2, '0')}-${String(Math.floor(Math.random() * 28) + 1).padStart(2, '0')}`,
      medals: this.getMedalsForMember(base.name, base.hasDetails, index),
      campaignRibbons: this.getCampaignRibbonsForMember(base.name, base.hasDetails, index, parseInt(base.year)),
      abteilungen: base.hasDetails ? this.getRandomAbteilungen(index, base.name) : [],
      isExpanded: false // UI state - not persisted to backend
    }));
  }

  // Toggle member details - only one can be expanded at a time
  toggleMemberDetails(member: Member): void {
    // If clicking the same member, just toggle
    if (member.isExpanded) {
      member.isExpanded = false;
      return;
    }
    
    // Close all other expanded members
    this.members.forEach(m => m.isExpanded = false);
    
    // Open the clicked member
    member.isExpanded = true;
  }

  // Get rank display information
  getRankInfo(rank: RankType): RankInfo {
    return this.rankInfo[rank];
  }

  // Get formatted member since date
  getFormattedMemberSince(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString('de-DE', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }

  // Get member year only (for compact view)
  getMemberYear(dateString: string): string {
    const date = new Date(dateString);
    return date.getFullYear().toString();
  }

  // Check if member has expandable content
  hasExpandableContent(member: Member): boolean {
    return member.medals.length > 0 || 
           member.campaignRibbons.length > 0 || 
           member.abteilungen.length > 0;
  }

  // Sort campaign ribbons by year (newest first)
  getSortedCampaignRibbons(ribbons: CampaignRibbon[]): CampaignRibbon[] {
    return [...ribbons].sort((a, b) => {
      const yearA = parseInt(a.year, AUFSTELLUNG_CONFIG.SECURITY.RADIX);
      const yearB = parseInt(b.year, AUFSTELLUNG_CONFIG.SECURITY.RADIX);
      return yearB - yearA; // Descending order (newest first)
    });
  }

  private getMedalsForMember(name: string, hasDetails: boolean, index: number): Medal[] {
    if (!hasDetails) return [];
    
    if (name === 'SpecOp0') {
      // SpecOp0 bekommt alle verfügbaren Medaillen als Demonstration
      return [
        {
          id: 'medal-honor',
          name: 'Medal of Honor',
          image: `${AUFSTELLUNG_CONFIG.ASSETS.MEDALS.BASE_PATH}${AUFSTELLUNG_CONFIG.ASSETS.MEDALS.HONOR}`,
          description: 'Wird für besondere Verdienste im TTT verliehen'
        }
      ] as const;
    }

    // Andere Mitglieder bekommen zufällig 0-1 Medaillen
    const availableMedals = [
      {
        id: `medal-honor-${index}`,
        name: 'Medal of Honor',
        image: `${AUFSTELLUNG_CONFIG.ASSETS.MEDALS.BASE_PATH}${AUFSTELLUNG_CONFIG.ASSETS.MEDALS.HONOR}`,
        description: 'Wird für besondere Verdienste im TTT verliehen'
      }
    ];

    const numMedals = Math.floor(Math.random() * 2); // 0-1 Medaillen
    return availableMedals.slice(0, numMedals);
  }

  private getCampaignRibbonsForMember(name: string, hasDetails: boolean, index: number, year: number): CampaignRibbon[] {
    if (!hasDetails) return [];
    
    if (name === 'SpecOp0') {
      // SpecOp0 bekommt alle verfügbaren Campaign Ribbons als Demonstration
      return [
        {
          id: 'ribbon-aspis',
          name: 'Aspis Kampagne',
          image: `${AUFSTELLUNG_CONFIG.ASSETS.RIBBONS.BASE_PATH}${AUFSTELLUNG_CONFIG.ASSETS.RIBBONS.ASPIS}`,
          campaign: 'Operation Aspis',
          year: '2020'
        },
        {
          id: 'ribbon-bethnahrin',
          name: 'Beth Nahrin Kampagne',
          image: `${AUFSTELLUNG_CONFIG.ASSETS.RIBBONS.BASE_PATH}${AUFSTELLUNG_CONFIG.ASSETS.RIBBONS.BETH_NAHRIN}`,
          campaign: 'Operation Beth Nahrin',
          year: '2021'
        },
        {
          id: 'ribbon-entzug',
          name: 'Entzug Kampagne',
          image: `${AUFSTELLUNG_CONFIG.ASSETS.RIBBONS.BASE_PATH}${AUFSTELLUNG_CONFIG.ASSETS.RIBBONS.ENTZUG}`,
          campaign: 'Operation Entzug',
          year: '2015'
        },
        {
          id: 'ribbon-paradiso',
          name: 'Paradiso Kampagne',
          image: `${AUFSTELLUNG_CONFIG.ASSETS.RIBBONS.BASE_PATH}${AUFSTELLUNG_CONFIG.ASSETS.RIBBONS.PARADISO}`,
          campaign: 'Operation Paradiso',
          year: '2023'
        },
        {
          id: 'ribbon-phoenix',
          name: 'Phoenix Kampagne',
          image: `${AUFSTELLUNG_CONFIG.ASSETS.RIBBONS.BASE_PATH}${AUFSTELLUNG_CONFIG.ASSETS.RIBBONS.PHOENIX}`,
          campaign: 'Operation Phoenix',
          year: '2016'
        },
        {
          id: 'ribbon-themis1',
          name: 'Themis Kampagne Q1',
          image: `${AUFSTELLUNG_CONFIG.ASSETS.RIBBONS.BASE_PATH}${AUFSTELLUNG_CONFIG.ASSETS.RIBBONS.THEMIS_Q1}`,
          campaign: 'Operation Themis Q1',
          year: '2015'
        },
        {
          id: 'ribbon-themis2',
          name: 'Themis Kampagne Q2',
          image: `${AUFSTELLUNG_CONFIG.ASSETS.RIBBONS.BASE_PATH}${AUFSTELLUNG_CONFIG.ASSETS.RIBBONS.THEMIS_Q2}`,
          campaign: 'Operation Themis Q2',
          year: '2015'
        }
      ] as const;
    }

    // Andere Mitglieder bekommen zufällig 0-3 Campaign Ribbons
    const availableRibbons = [
      {
        id: `ribbon-aspis-${index}`,
        name: 'Aspis Kampagne',
        image: `${AUFSTELLUNG_CONFIG.ASSETS.RIBBONS.BASE_PATH}${AUFSTELLUNG_CONFIG.ASSETS.RIBBONS.ASPIS}`,
        campaign: 'Operation Aspis',
        year: Math.max(2020, year).toString()
      },
      {
        id: `ribbon-bethnahrin-${index}`,
        name: 'Beth Nahrin Kampagne',
        image: `${AUFSTELLUNG_CONFIG.ASSETS.RIBBONS.BASE_PATH}${AUFSTELLUNG_CONFIG.ASSETS.RIBBONS.BETH_NAHRIN}`,
        campaign: 'Operation Beth Nahrin',
        year: Math.max(2021, year).toString()
      },
      {
        id: `ribbon-phoenix-${index}`,
        name: 'Phoenix Kampagne',
        image: `${AUFSTELLUNG_CONFIG.ASSETS.RIBBONS.BASE_PATH}${AUFSTELLUNG_CONFIG.ASSETS.RIBBONS.PHOENIX}`,
        campaign: 'Operation Phoenix',
        year: Math.max(2016, year).toString()
      }
    ];

    const numRibbons = Math.floor(Math.random() * 4); // 0-3 Ribbons
    return availableRibbons.slice(0, numRibbons);
  }

  // Get rank badge classes with correct color mapping
  getRankBadgeClasses(rank: RankType): string {
    const baseClasses = 'text-xs px-1.5 py-0.5 rounded font-medium block mb-1';
    
    switch (rank) {
      case 'offizier':
        return `${baseClasses} text-yellow-400 bg-yellow-400/10`;
      case 'unteroffizier':
        return `${baseClasses} text-gray-400 bg-gray-400/10`;
      case 'veteran':
        return `${baseClasses} text-green-400 bg-green-400/10`;
      case 'soldat':
        return `${baseClasses} text-blue-900 bg-blue-900/10`;
      case 'rekrut':
        return `${baseClasses} text-blue-300 bg-blue-300/10`;
      case 'gast':
        return `${baseClasses} text-gray-300 bg-gray-300/10`;
      default:
        return `${baseClasses} text-gray-400 bg-gray-400/10`;
    }
  }

  // Get rank badge classes for expanded view
  getRankBadgeExpandedClasses(rank: RankType): string {
    const baseClasses = 'text-sm px-2 py-1 rounded font-medium';
    
    switch (rank) {
      case 'offizier':
        return `${baseClasses} text-yellow-400 bg-yellow-400/10`;
      case 'unteroffizier':
        return `${baseClasses} text-gray-400 bg-gray-400/10`;
      case 'veteran':
        return `${baseClasses} text-green-400 bg-green-400/10`;
      case 'soldat':
        return `${baseClasses} text-blue-900 bg-blue-900/10`;
      case 'rekrut':
        return `${baseClasses} text-blue-300 bg-blue-300/10`;
      case 'gast':
        return `${baseClasses} text-gray-300 bg-gray-300/10`;
      default:
        return `${baseClasses} text-gray-400 bg-gray-400/10`;
    }
  }

  // Button styling methods (consistent with other components)
  getPrimaryButtonClasses(): string {
    return AUFSTELLUNG_CONFIG.CSS_CLASSES.BUTTON_PRIMARY;
  }

  getSecondaryButtonClasses(): string {
    return AUFSTELLUNG_CONFIG.CSS_CLASSES.BUTTON_SECONDARY;
  }
}