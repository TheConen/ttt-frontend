import { Component, OnInit, inject, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TrackByUtils, KeyboardNavigationUtils, BasePageComponent, PageLayoutComponent } from '../../../shared/utils';
import { SanitizationService } from '../../../core/services/sanitization.service';
import { Member as BackendMember, Medal, CampaignRibbon, Abteilung, RankType } from '../../../shared/types/member.types';
import { MemberService } from '../../../core/services/member.service';

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



interface RankInfo {
  name: string;
  shortName: string;
  icon: string;
  color: string;
  priority: number;
}

// UI Member type extends backend Member with isExpanded
type Member = BackendMember & { isExpanded?: boolean };

@Component({
  selector: 'ttt-aufstellung',
  standalone: true,
  imports: [CommonModule, PageLayoutComponent],
  templateUrl: './aufstellung.component.html',
  styleUrl: './aufstellung.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AufstellungComponent extends BasePageComponent implements OnInit {
  private readonly sanitizationService = inject(SanitizationService);
  private readonly memberService = inject(MemberService);
  private readonly cdr = inject(ChangeDetectorRef);

  readonly pageTitle = AUFSTELLUNG_CONFIG.PAGE_TITLE;
  readonly pageSubtitle = AUFSTELLUNG_CONFIG.PAGE_SUBTITLE;
  readonly sections = AUFSTELLUNG_CONFIG.SECTIONS;
  readonly ui = AUFSTELLUNG_CONFIG.UI;
  readonly loadingMessages = AUFSTELLUNG_CONFIG.UI.LOADING_MESSAGES;

  isLoading = false;
  loadingError: string | null = null;

  // Temporary mock data seed; remove when real backend data is available
  private readonly mockDataSeed = 12345;

  /**
   * Deterministic mock random generator used for predictable test data.
   * Seed-based implementation to keep results stable across runs.
   */
  private mockRandom(index = 0): number {
    const seed = this.mockDataSeed + index;
    return (seed * 9301 + 49297) % 233280 / 233280;
  }

  override ngOnInit(): void {
    super.ngOnInit();
    this.loadMembers();
  }

  readonly trackByRank = TrackByUtils.trackByIndex;
  readonly trackByMember = TrackByUtils.trackByProperty<Member>('id');
  readonly trackByMedal = TrackByUtils.trackByProperty<Medal>('id');
  readonly trackByCampaignRibbon = TrackByUtils.trackByProperty<CampaignRibbon>('id');
  readonly trackByAbteilung = TrackByUtils.trackByProperty<Abteilung>('id');

  readonly securityUtils = {
    sanitizeHtml: (html: string) => this.sanitizationService.sanitizeHtml(html),
    stripHtml: (html: string) => this.sanitizationService.stripHtml(html),
    isSafeUrl: (url: string) => this.sanitizationService.isSafeUrl(url)
  };

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

  readonly rankOrder: RankType[] = ['offizier', 'unteroffizier', 'veteran', 'soldat', 'rekrut', 'gast'] as const;

  members: Member[] = [];
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
    // Generate deterministic mock departments for testing
    const numGroups = Math.floor(this.mockRandom(1) * 2) + 1;
    const shuffled = [...this.allDepartments].sort((a, b) =>
      a.name.localeCompare(b.name) * (this.mockRandom(2) > 0.5 ? 1 : -1)
    );
    return shuffled.slice(0, numGroups);
  }

  // Load members (placeholder - replaced by backend call when available)
  retryLoading(): void {
    this.loadMembers();
  }

  private loadMembers(): void {
    this.isLoading = true;
    this.loadingError = null;
    this.memberService.getAllMembers().subscribe({
      next: (members: BackendMember[]) => {
        // Add isExpanded property for UI state
        this.members = members.map(m => ({ ...m, isExpanded: false }));
        this.computeMemberData();
        this.isLoading = false;
        this.cdr.detectChanges();
      },
      error: () => {
        this.loadingError = 'Fehler beim Laden der Mitgliederdaten';
        this.isLoading = false;
        this.cdr.detectChanges();
      }
    });
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



  /**
   * Return departments for a member. Keeps logic explicit and avoids nested
   * ternary operators while preventing duplicate entries.
   */
  private getAbteilungenForMember(base: { name: string; hasDetails: boolean }): Abteilung[] {
    if (!base.hasDetails) return [];
    if (this.isSpecOp0(base.name)) return [...this.allDepartments];
    return this.generateRandomDepartments();
  }

  /**
   * Utility: returns true when the member is the special test user 'SpecOp0'.
   * Used to provide full mock details for this specific test account.
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

  private getMedalsForMember(name: string, hasDetails: boolean, _index: number): Medal[] {
    if (!hasDetails) return [];
    if (this.isSpecOp0(name)) {
      return this.availableMedals.map(medal => ({
        ...medal,
        id: `medal-${_index}-${medal.name.replaceAll(' ', '-').toLowerCase()}`
      }));
    }
    const numMedals = Math.floor(this.mockRandom(_index * 20) * 2);
    return this.availableMedals.slice(0, numMedals).map(medal => ({
      ...medal,
      id: `medal-${_index}-${medal.name.replaceAll(' ', '-').toLowerCase()}`
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

}
