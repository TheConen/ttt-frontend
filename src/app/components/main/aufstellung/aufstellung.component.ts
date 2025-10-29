import { Component, OnInit, inject, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TrackByUtils, KeyboardNavigationUtils } from '../../../shared/utils';
import { PageTitleService } from '../../../core/services/page-title.service';
import { SanitizationService } from '../../../core/services/sanitization.service';

// Configuration constants
const AUFSTELLUNG_CONFIG = {
  PAGE_TITLE: 'Aufstellung',
  PAGE_SUBTITLE: 'Mitglieder und Struktur des Tactical Training Teams',
  SECURITY: {
    MIN_ACTION_INTERVAL: 100,
    RADIX: 10
  },
  SECTIONS: {
    OVERVIEW: {
      TITLE: 'Mitgliederübersicht',
      SUBTITLE: 'Aktuelle Personalstärke nach Rängen'
    },
    ROSTER: {
      TITLE: 'Personalaufstellung',
      SUBTITLE: 'Unsere Mitglieder'
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
      HONOR: 'medal-mdh.png',
      TRAINING_GOLD: 'medal-gold-training.png'
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
      MISSIONSBAU: 'group-missionsbau-icon.png',
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
  styleUrl: './aufstellung.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AufstellungComponent implements OnInit {
  // Services
  private readonly pageTitleService = inject(PageTitleService);
  private readonly sanitizationService = inject(SanitizationService);
  // TODO: Inject member service when available
  // private readonly memberService = inject(MemberService);

  // Component data
  readonly pageTitle = AUFSTELLUNG_CONFIG.PAGE_TITLE;
  readonly pageSubtitle = AUFSTELLUNG_CONFIG.PAGE_SUBTITLE;
  readonly sections = AUFSTELLUNG_CONFIG.SECTIONS;
  readonly ui = AUFSTELLUNG_CONFIG.UI;
  readonly loadingMessages = AUFSTELLUNG_CONFIG.UI.LOADING_MESSAGES;

  // Loading and error states
  isLoading = false;
  loadingError: string | null = null;

  // Mock data generation - will be removed with backend integration
  private readonly mockDataSeed = 12345;

  /**
   * Deterministic mock random generator - replaces Math.random() for testing
   * Uses seed-based approach to avoid cryptographic weakness warnings
   */
  private mockRandom(index = 0): number {
    const seed = this.mockDataSeed + index;
    return (seed * 9301 + 49297) % 233280 / 233280;
  }

  ngOnInit(): void {
    this.pageTitleService.setTitle(AUFSTELLUNG_CONFIG.PAGE_TITLE);
    this.loadMembers();
  }

  // TrackBy functions
  readonly trackByRank = TrackByUtils.trackByIndex;
  readonly trackByMember = TrackByUtils.trackByProperty<Member>('id');
  readonly trackByMedal = TrackByUtils.trackByProperty<Medal>('id');
  readonly trackByCampaignRibbon = TrackByUtils.trackByProperty<CampaignRibbon>('id');
  readonly trackByAbteilung = TrackByUtils.trackByProperty<Abteilung>('id');

  // Security utility functions
  readonly securityUtils = {
    sanitizeHtml: (html: string) => this.sanitizationService.sanitizeHtml(html),
    stripHtml: (html: string) => this.sanitizationService.stripHtml(html),
    isSafeUrl: (url: string) => this.sanitizationService.isSafeUrl(url)
  };

  // Rank configuration
  readonly rankInfo: Record<RankType, RankInfo> = {
    offizier: {
      name: 'Offizier',
      shortName: 'Off.',
      icon: `${AUFSTELLUNG_CONFIG.ASSETS.RANKS.BASE_PATH}${AUFSTELLUNG_CONFIG.ASSETS.RANKS.OFFIZIER}`,
      color: 'text-yellow-400',
      priority: 1
    },
    unteroffizier: {
      name: 'Unteroffizier',
      shortName: 'Uffz.',
      icon: `${AUFSTELLUNG_CONFIG.ASSETS.RANKS.BASE_PATH}${AUFSTELLUNG_CONFIG.ASSETS.RANKS.UNTEROFFIZIER}`,
      color: 'text-gray-400',
      priority: 2
    },
    veteran: {
      name: 'Veteran',
      shortName: 'Vet.',
      icon: `${AUFSTELLUNG_CONFIG.ASSETS.RANKS.BASE_PATH}${AUFSTELLUNG_CONFIG.ASSETS.RANKS.VETERAN}`,
      color: 'text-green-400',
      priority: 3
    },
    soldat: {
      name: 'Soldat',
      shortName: 'Sdt.',
      icon: `${AUFSTELLUNG_CONFIG.ASSETS.RANKS.BASE_PATH}${AUFSTELLUNG_CONFIG.ASSETS.RANKS.SOLDAT}`,
      color: 'text-blue-600',
      priority: 4
    },
    rekrut: {
      name: 'Rekrut',
      shortName: 'Rekr.',
      icon: `${AUFSTELLUNG_CONFIG.ASSETS.RANKS.BASE_PATH}${AUFSTELLUNG_CONFIG.ASSETS.RANKS.REKRUT}`,
      color: 'text-blue-300',
      priority: 5
    },
    gast: {
      name: 'Gast',
      shortName: 'Gast',
      icon: `${AUFSTELLUNG_CONFIG.ASSETS.RANKS.BASE_PATH}${AUFSTELLUNG_CONFIG.ASSETS.RANKS.GAST}`,
      color: 'text-gray-300',
      priority: 6
    }
  } as const;

  // Rank order for iteration
  readonly rankOrder: RankType[] = ['offizier', 'unteroffizier', 'veteran', 'soldat', 'rekrut', 'gast'] as const;

  // Members data
  members: Member[] = [];

  // Computed properties
  membersByRank: Record<RankType, Member[]> = {
    offizier: [],
    unteroffizier: [],
    veteran: [],
    soldat: [],
    rekrut: [],
    gast: []
  };

  memberStats: Record<RankType, number> = {
    offizier: 0,
    unteroffizier: 0,
    veteran: 0,
    soldat: 0,
    rekrut: 0,
    gast: 0
  };

  totalMembers = 0;

  // Utility methods
  private createEmptyRankRecord<T>(factory: () => T): Record<RankType, T> {
    return this.rankOrder.reduce((acc, rank) => {
      acc[rank] = factory();
      return acc;
    }, {} as Record<RankType, T>);
  }

  private getRankColorClasses(rank: RankType): { text: string; bg: string } {
    switch (rank) {
      case 'offizier':
        return { text: 'text-yellow-400', bg: 'bg-yellow-400/10' };
      case 'unteroffizier':
        return { text: 'text-gray-400', bg: 'bg-gray-400/10' };
      case 'veteran':
        return { text: 'text-green-400', bg: 'bg-green-400/10' };
      case 'soldat':
        return { text: 'text-blue-600', bg: 'bg-blue-600/10' };
      case 'rekrut':
        return { text: 'text-blue-300', bg: 'bg-blue-300/10' };
      case 'gast':
        return { text: 'text-gray-300', bg: 'bg-gray-300/10' };
      default:
        return { text: 'text-gray-400', bg: 'bg-gray-400/10' };
    }
  }

  // Departments configuration
  private readonly allDepartments: Abteilung[] = [
    {
      id: 'abt-1',
      name: 'Missionsbau',
      icon: `${AUFSTELLUNG_CONFIG.ASSETS.GROUPS.BASE_PATH}${AUFSTELLUNG_CONFIG.ASSETS.GROUPS.MISSIONSBAU}`,
      description: 'Wissensvermittlung & Multiplikation im Missionsbau'
    },
    {
      id: 'abt-2',
      name: 'Medien & PR',
      icon: `${AUFSTELLUNG_CONFIG.ASSETS.GROUPS.BASE_PATH}${AUFSTELLUNG_CONFIG.ASSETS.GROUPS.MEDIEN}`,
      description: 'Social Media und Öffentlichkeitsarbeit'
    },
    {
      id: 'abt-3',
      name: 'Technik',
      icon: `${AUFSTELLUNG_CONFIG.ASSETS.GROUPS.BASE_PATH}${AUFSTELLUNG_CONFIG.ASSETS.GROUPS.TECHNIK}`,
      description: 'Server-Administration und technische Wartung'
    }
  ];

  private readonly availableMedals: Omit<Medal, 'id'>[] = [
    {
      name: 'Medal of Honor',
      image: `${AUFSTELLUNG_CONFIG.ASSETS.MEDALS.BASE_PATH}${AUFSTELLUNG_CONFIG.ASSETS.MEDALS.HONOR}`,
      description: 'Wird für besondere Verdienste im TTT verliehen'
    },
    {
      name: 'Training Gold',
      image: `${AUFSTELLUNG_CONFIG.ASSETS.MEDALS.BASE_PATH}${AUFSTELLUNG_CONFIG.ASSETS.MEDALS.TRAINING_GOLD}`,
      description: 'Abzeichen für Trainingsleistungen (Gold)'
    }
  ];

  private readonly availableRibbons: Omit<CampaignRibbon, 'id'>[] = [
    {
      name: 'Aspis Kampagne',
      image: `${AUFSTELLUNG_CONFIG.ASSETS.RIBBONS.BASE_PATH}${AUFSTELLUNG_CONFIG.ASSETS.RIBBONS.ASPIS}`,
      campaign: 'Operation Aspis',
      year: '2020'
    },
    {
      name: 'Beth Nahrin Kampagne',
      image: `${AUFSTELLUNG_CONFIG.ASSETS.RIBBONS.BASE_PATH}${AUFSTELLUNG_CONFIG.ASSETS.RIBBONS.BETH_NAHRIN}`,
      campaign: 'Operation Beth Nahrin',
      year: '2021'
    },
    {
      name: 'Entzug Kampagne',
      image: `${AUFSTELLUNG_CONFIG.ASSETS.RIBBONS.BASE_PATH}${AUFSTELLUNG_CONFIG.ASSETS.RIBBONS.ENTZUG}`,
      campaign: 'Operation Entzug',
      year: '2015'
    },
    {
      name: 'Paradiso Kampagne',
      image: `${AUFSTELLUNG_CONFIG.ASSETS.RIBBONS.BASE_PATH}${AUFSTELLUNG_CONFIG.ASSETS.RIBBONS.PARADISO}`,
      campaign: 'Operation Paradiso',
      year: '2023'
    },
    {
      name: 'Phoenix Kampagne',
      image: `${AUFSTELLUNG_CONFIG.ASSETS.RIBBONS.BASE_PATH}${AUFSTELLUNG_CONFIG.ASSETS.RIBBONS.PHOENIX}`,
      campaign: 'Operation Phoenix',
      year: '2016'
    },
    {
      name: 'Themis Kampagne Q1',
      image: `${AUFSTELLUNG_CONFIG.ASSETS.RIBBONS.BASE_PATH}${AUFSTELLUNG_CONFIG.ASSETS.RIBBONS.THEMIS_Q1}`,
      campaign: 'Operation Themis Q1',
      year: '2015'
    },
    {
      name: 'Themis Kampagne Q2',
      image: `${AUFSTELLUNG_CONFIG.ASSETS.RIBBONS.BASE_PATH}${AUFSTELLUNG_CONFIG.ASSETS.RIBBONS.THEMIS_Q2}`,
      campaign: 'Operation Themis Q2',
      year: '2015'
    }
  ];

  private generateRandomDepartments(): Abteilung[] {
    // Mock data generation - uses deterministic approach for testing
    const numGroups = Math.floor(this.mockRandom(1) * 2) + 1;
    const shuffled = [...this.allDepartments].sort((a, b) =>
      a.name.localeCompare(b.name) * (this.mockRandom(2) > 0.5 ? 1 : -1)
    );
    return shuffled.slice(0, numGroups);
  }

  // Load members (dummy data - will be replaced with backend call)
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
      //     this.computeMemberData();
      //     this.isLoading = false;
      //   },
      //   error: (error) => {
      //     this.loadingError = 'Fehler beim Laden der Mitgliederdaten';
      //     this.isLoading = false;
      //     console.error('Error loading members:', error);
      //   }
      // });

      // TEST-DATEN - Entfernen wenn Backend bereit ist
      this.loadDummyMembers();
      this.computeMemberData();
      this.isLoading = false;
    } catch (error) {
      this.loadingError = 'Fehler beim Laden der Mitgliederdaten';
      this.isLoading = false;
      console.error('Error loading members:', error);
    }
  }

  private computeMemberData(): void {
    this.membersByRank = this.createEmptyRankRecord<Member[]>(() => []);
    this.memberStats = this.createEmptyRankRecord<number>(() => 0);

    for (const member of this.members) {
      this.membersByRank[member.rank].push(member);
      this.memberStats[member.rank]++;
    }
    for (const rank of Object.keys(this.membersByRank)) {
      this.membersByRank[rank as RankType].sort((a, b) => a.name.localeCompare(b.name));
    }

    this.totalMembers = this.members.length;
  }

  // TODO: Remove when backend integration is complete
  private loadDummyMembers(): void {
    const baseMembers = [
      { name: 'TheConen', rank: 'offizier' as RankType, year: '2015', hasDetails: true },
      { name: 'SpecOp0', rank: 'offizier' as RankType, year: '2016', hasDetails: true },

      { name: 'Reimchen', rank: 'unteroffizier' as RankType, year: '2018', hasDetails: true },
      { name: 'rockn_roller', rank: 'unteroffizier' as RankType, year: '2019', hasDetails: true },

      { name: 'GSG9_abzocker', rank: 'veteran' as RankType, year: '2017', hasDetails: true },
      { name: 'Speutzi', rank: 'veteran' as RankType, year: '2018', hasDetails: true },

      { name: 'Corben', rank: 'soldat' as RankType, year: '2022', hasDetails: true },
      { name: 'SchmerzKeks', rank: 'soldat' as RankType, year: '2023', hasDetails: false },

      // Rekruten (max 2) - Neue Mitglieder
      { name: 'Epsilon', rank: 'rekrut' as RankType, year: '2024', hasDetails: true },
      { name: 'Addi995', rank: 'rekrut' as RankType, year: '2024', hasDetails: false },

      { name: 'Mynx', rank: 'gast' as RankType, year: '2024', hasDetails: false },
      { name: 'Leroy', rank: 'gast' as RankType, year: '2024', hasDetails: false }
    ];

    this.members = baseMembers.map((base, index) => ({
      id: `member-${index + 1}`,
      name: base.name,
      rank: base.rank,
      avatar: base.rank === 'offizier' ? AUFSTELLUNG_CONFIG.ASSETS.AVATARS.OFFIZIER : '',
      memberSince: `${base.year}-${String(Math.floor(this.mockRandom(index * 10) * 12) + 1).padStart(2, '0')}-${String(Math.floor(this.mockRandom(index * 10 + 1) * 28) + 1).padStart(2, '0')}`,
      medals: this.getMedalsForMember(base.name, base.hasDetails, index),
      campaignRibbons: this.getCampaignRibbonsForMember(base.name, base.hasDetails, index, Number.parseInt(base.year, AUFSTELLUNG_CONFIG.SECURITY.RADIX)),
      abteilungen: this.getAbteilungenForMember(base, index),
      isExpanded: false
    }));

  }

  /**
   * Liefert die Abteilungen für ein Mitglied, um verschachtelte Ternary-Logik zu vermeiden und Duplikate zu verhindern.
   */
  private getAbteilungenForMember(base: { name: string; hasDetails: boolean }, index: number): Abteilung[] {
    if (!base.hasDetails) return [];
    if (this.isSpecOp0(base.name)) return [...this.allDepartments];
    return this.generateRandomDepartments();
  }

  /**
   * Utility: Prüft, ob ein Mitglied 'SpecOp0' ist (für alle Medaillen, Ribbons, Abteilungen).
   */
  private isSpecOp0(name: string): boolean {
    return name === 'SpecOp0';
  }
  toggleMemberDetails(member: Member): void {
    if (member.isExpanded) {
      member.isExpanded = false;
      return;
    }

    for (const m of this.members) {
      m.isExpanded = false;
    }
    member.isExpanded = true;
  }

  // Keyboard navigation handler for member details toggle
  handleMemberKeyboardNavigation(member: Member, event: KeyboardEvent): void {
    KeyboardNavigationUtils.handleToggle(
      event,
      this.hasExpandableContent(member),
      () => this.toggleMemberDetails(member)
    );
  }

  getRankInfo(rank: RankType): RankInfo {
    return this.rankInfo[rank];
  }

  getFormattedMemberSince(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString('de-DE', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }
  getMemberYear(dateString: string): string {
    const date = new Date(dateString);
    return date.getFullYear().toString();
  }

  hasExpandableContent(member: Member): boolean {
    return member.medals.length > 0 ||
           member.campaignRibbons.length > 0 ||
           member.abteilungen.length > 0;
  }

  getSortedCampaignRibbons(ribbons: CampaignRibbon[]): CampaignRibbon[] {
    return [...ribbons].sort((a, b) => {
  const yearA = Number.parseInt(a.year, AUFSTELLUNG_CONFIG.SECURITY.RADIX);
  const yearB = Number.parseInt(b.year, AUFSTELLUNG_CONFIG.SECURITY.RADIX);
      return yearB - yearA;
    });
  }

  private getMedalsForMember(name: string, hasDetails: boolean, index: number): Medal[] {
    if (!hasDetails) return [];

    if (this.isSpecOp0(name)) {
      return this.availableMedals.map(medal => ({
        ...medal,
        id: `medal-${index}-${medal.name.replaceAll(' ', '-').toLowerCase()}`
      }));
    }

    const numMedals = Math.floor(this.mockRandom(index * 20) * 2);
    return this.availableMedals.slice(0, numMedals).map(medal => ({
      ...medal,
      id: `medal-${index}-${medal.name.replaceAll(' ', '-').toLowerCase()}`
    }));
  }

  private getCampaignRibbonsForMember(name: string, hasDetails: boolean, index: number, year: number): CampaignRibbon[] {
    if (!hasDetails) return [];

    if (this.isSpecOp0(name)) {
      return this.availableRibbons.map(ribbon => ({
        ...ribbon,
        id: `ribbon-${index}-${ribbon.name.replaceAll(' ', '-').toLowerCase()}`
      }));
    }

    const eligibleRibbons = this.availableRibbons
  .filter(ribbon => Number.parseInt(ribbon.year, 10) >= year)
      .slice(0, 3);

    const numRibbons = Math.floor(this.mockRandom(index * 30) * 4);
    return eligibleRibbons.slice(0, numRibbons).map(ribbon => ({
      ...ribbon,
  id: `ribbon-${index}-${ribbon.name.replaceAll(' ', '-').toLowerCase()}`,
  year: Math.max(Number.parseInt(ribbon.year, 10), year).toString()
    }));
  }
  private getRankBadgeClassesBase(rank: RankType, baseClasses: string): string {
    const colors = this.getRankColorClasses(rank);
    return `${baseClasses} ${colors.text} ${colors.bg}`;
  }

  getRankBadgeClasses(rank: RankType): string {
    return this.getRankBadgeClassesBase(rank, 'text-xs px-1.5 py-0.5 rounded font-medium block mb-1');
  }

  getRankBadgeExpandedClasses(rank: RankType): string {
    return this.getRankBadgeClassesBase(rank, 'text-sm px-2 py-1 rounded font-medium');
  }

  getPrimaryButtonClasses(): string {
    return AUFSTELLUNG_CONFIG.CSS_CLASSES.BUTTON_PRIMARY;
  }

  getSecondaryButtonClasses(): string {
    return AUFSTELLUNG_CONFIG.CSS_CLASSES.BUTTON_SECONDARY;
  }
}
