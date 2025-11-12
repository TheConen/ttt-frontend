import { Component, inject, OnInit, PLATFORM_ID } from '@angular/core';
import { CommonModule, DOCUMENT, isPlatformBrowser } from '@angular/common';
import { PageLayoutComponent } from '../../../shared/components/page-layout/page-layout.component';
import { ActivableDirective } from '../../../shared/directives/activable.directive';
import { CampaignRibbon, Member as BackendMember, RankType } from '../../../shared/types/member.types';
import { MemberService } from '../../../core/services/member.service';

// Configuration constants
const AUFSTELLUNG_CONFIG = {
    PAGE_TITLE: 'Aufstellung',
    PAGE_SUBTITLE: 'Mitglieder und Struktur des Tactical Training Teams',
    SECURITY: {
        MIN_ACTION_INTERVAL: 100,
        RADIX: 10,
    },
    SECTIONS: {
        OVERVIEW: {
            TITLE: 'Mitgliederübersicht',
            SUBTITLE: 'Aktuelle Personalstärke nach Rängen',
        },
        ROSTER: {
            TITLE: 'Personalaufstellung',
            SUBTITLE: 'Unsere Mitglieder',
        },
    },
    UI: {
        MEMBERS_LABEL: 'Mitglieder',
        ACTIVE_MEMBERS_LABEL: 'aktive Mitglieder',
        SECTIONS: {
            MEDALS: 'Auszeichnungen',
            CAMPAIGNS: 'Kampagnen-Teilnahmen',
            DEPARTMENTS: 'Abteilungen',
        },
        NO_DATA: {
            MEDALS: 'Keine',
            CAMPAIGNS: 'Keine',
            DEPARTMENTS: 'Keine',
        },
        ICONS: {
            MEDALS: 'Auszeichnungen',
            CAMPAIGNS: 'Kampagnen',
            DEPARTMENTS: 'Abteilungen',
        },
        LOADING_MESSAGES: {
            LOADING: 'Mitgliederdaten werden geladen...',
            ERROR_TITLE: 'Fehler',
            RETRY_TEXT: 'Erneut versuchen',
            RETRY_ARIA: 'Mitgliederdaten erneut laden',
        },
    },
    CSS_CLASSES: {
        BUTTON_PRIMARY:
            'inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-tttRed to-tttRed-600 px-4 py-2 text-sm font-bold text-tttWhite shadow-lg transition-all duration-300 hover:shadow-xl hover:shadow-tttRed/30',
        BUTTON_SECONDARY:
            'inline-flex items-center gap-2 rounded-lg border border-tttWhite/30 bg-tttWhite/10 px-4 py-2 text-sm font-bold text-tttWhite transition-all duration-300 hover:bg-tttWhite/20',
    },
    ASSETS: {
        RANKS: {
            BASE_PATH: '/img/aufstellung/ranks/',
            OFFIZIER: 'TTT-Icon_Offizier.png',
            UNTEROFFIZIER: 'TTT-Icon_Unteroffizier.png',
            VETERAN: 'TTT-Icon_Soldat-Veteran.png',
            SOLDAT: 'TTT-Icon_Soldat-Veteran.png',
            REKRUT: 'TTT-Icon_Rekrut.png',
            GAST: 'TTT-Icon_Gast.png',
        },
        MEDALS: {
            BASE_PATH: '/img/aufstellung/medals/',
            HONOR: 'medal-mdh.png',
            TRAINING_GOLD: 'medal-gold-training.png',
        },
        RIBBONS: {
            BASE_PATH: '/img/aufstellung/ribbons/',
            ASPIS: 'ttt_veteran-kampagne-aspis.png',
            BETH_NAHRIN: 'ttt_veteran-kampagne-beth-nahrin.png',
            ENTZUG: 'ttt_veteran-kampagne-entzug-q4-2015.png',
            PARADISO: 'ttt_veteran-kampagne-paradiso.png',
            PHOENIX: 'ttt_veteran-kampagne-phoenix-q2-2016.jpg',
            THEMIS_Q1: 'ttt_veteran-kampagne-themis-q1-2015.png',
            THEMIS_Q2: 'ttt_veteran-kampagne-themis-q2-2015.png',
        },
        GROUPS: {
            BASE_PATH: '/img/aufstellung/group/',
            MISSIONSBAU: 'group-missionsbau-icon.png',
            MEDIEN: 'group-pr-icon.png',
            TECHNIK: 'group-technik-icon.png',
        },
        AVATARS: {
            OFFIZIER: '/img/aufstellung/offizier-kopf.webp',
        },
    },
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
    imports: [CommonModule, PageLayoutComponent, ActivableDirective],
    templateUrl: './aufstellung.component.html',
    styleUrl: './aufstellung.component.css',
})
export class AufstellungComponent implements OnInit {
    private readonly memberService = inject(MemberService);
    private readonly document = inject(DOCUMENT);
    private readonly platformId = inject(PLATFORM_ID);

    readonly pageTitle = AUFSTELLUNG_CONFIG.PAGE_TITLE;
    readonly pageSubtitle = AUFSTELLUNG_CONFIG.PAGE_SUBTITLE;
    readonly sections = AUFSTELLUNG_CONFIG.SECTIONS;
    readonly ui = AUFSTELLUNG_CONFIG.UI;
    readonly loadingMessages = AUFSTELLUNG_CONFIG.UI.LOADING_MESSAGES;

    isLoading = false;
    loadingError: string | null = null;

    ngOnInit(): void {
        this.loadMembers();
    }

    readonly rankInfo: Record<RankType, RankInfo> = {
        offizier: {
            name: 'Offizier',
            shortName: 'Off.',
            icon: `${AUFSTELLUNG_CONFIG.ASSETS.RANKS.BASE_PATH}${AUFSTELLUNG_CONFIG.ASSETS.RANKS.OFFIZIER}`,
            color: 'text-yellow-400',
            priority: 1,
        },
        unteroffizier: {
            name: 'Unteroffizier',
            shortName: 'Uffz.',
            icon: `${AUFSTELLUNG_CONFIG.ASSETS.RANKS.BASE_PATH}${AUFSTELLUNG_CONFIG.ASSETS.RANKS.UNTEROFFIZIER}`,
            color: 'text-gray-400',
            priority: 2,
        },
        veteran: {
            name: 'Veteran',
            shortName: 'Vet.',
            icon: `${AUFSTELLUNG_CONFIG.ASSETS.RANKS.BASE_PATH}${AUFSTELLUNG_CONFIG.ASSETS.RANKS.VETERAN}`,
            color: 'text-green-400',
            priority: 3,
        },
        soldat: {
            name: 'Soldat',
            shortName: 'Sdt.',
            icon: `${AUFSTELLUNG_CONFIG.ASSETS.RANKS.BASE_PATH}${AUFSTELLUNG_CONFIG.ASSETS.RANKS.SOLDAT}`,
            color: 'text-blue-600',
            priority: 4,
        },
        rekrut: {
            name: 'Rekrut',
            shortName: 'Rekr.',
            icon: `${AUFSTELLUNG_CONFIG.ASSETS.RANKS.BASE_PATH}${AUFSTELLUNG_CONFIG.ASSETS.RANKS.REKRUT}`,
            color: 'text-blue-300',
            priority: 5,
        },
        gast: {
            name: 'Gast',
            shortName: 'Gast',
            icon: `${AUFSTELLUNG_CONFIG.ASSETS.RANKS.BASE_PATH}${AUFSTELLUNG_CONFIG.ASSETS.RANKS.GAST}`,
            color: 'text-gray-300',
            priority: 6,
        },
    } as const;

    readonly rankOrder: RankType[] = ['offizier', 'unteroffizier', 'veteran', 'soldat', 'rekrut', 'gast'] as const;

    members: Member[] = [];
    membersByRank: Record<RankType, Member[]> = {
        offizier: [],
        unteroffizier: [],
        veteran: [],
        soldat: [],
        rekrut: [],
        gast: [],
    };
    memberStats: Record<RankType, number> = {
        offizier: 0,
        unteroffizier: 0,
        veteran: 0,
        soldat: 0,
        rekrut: 0,
        gast: 0,
    };
    totalMembers = 0;

    private createEmptyRankRecord<T>(factory: () => T): Record<RankType, T> {
        return this.rankOrder.reduce(
            (acc, rank) => {
                acc[rank] = factory();
                return acc;
            },
            {} as Record<RankType, T>
        );
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

    // Load members
    retryLoading(): void {
        this.loadMembers();
    }

    private loadMembers(): void {
        this.isLoading = true;
        this.loadingError = null;
        this.memberService.getAllMembers().subscribe({
            next: (members: BackendMember[]) => {
                // Add isExpanded property for UI state
                this.members = members.map((m) => ({ ...m, isExpanded: false }));
                this.computeMemberData();
                this.isLoading = false;
            },
            error: () => {
                this.loadingError = 'Fehler beim Laden der Mitgliederdaten';
                this.isLoading = false;
            },
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

    toggleMemberDetails(member: Member): void {
        member.isExpanded = !member.isExpanded;

        // Scroll to member after expansion animation
        if (member.isExpanded && isPlatformBrowser(this.platformId)) {
            setTimeout(() => {
                const element = this.document.getElementById(`member-${member.id}`);
                if (element) {
                    const offsetTop = element.getBoundingClientRect().top + window.scrollY - 80;
                    window.scrollTo({ top: offsetTop, behavior: 'smooth' });
                }
            }, 100);
        }
    }

    // Keyboard navigation handler for Space key (prevents page scroll)
    handleMemberSpaceKey(member: Member, event: Event): void {
        if (this.hasExpandableContent(member)) {
            event.preventDefault();
            this.toggleMemberDetails(member);
        }
    }

    getRankInfo(rank: RankType): RankInfo {
        return this.rankInfo[rank];
    }

    getFormattedMemberSince(dateString: string): string {
        const date = new Date(dateString);
        return date.toLocaleDateString('de-DE', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        });
    }

    getMemberYear(dateString: string): string {
        const date = new Date(dateString);
        return date.getFullYear().toString();
    }

    hasExpandableContent(member: Member): boolean {
        return member.medals.length > 0 || member.campaignRibbons.length > 0 || member.abteilungen.length > 0;
    }

    getSortedCampaignRibbons(ribbons: CampaignRibbon[]): CampaignRibbon[] {
        return [...ribbons].sort((a, b) => {
            const yearA = Number.parseInt(a.year, AUFSTELLUNG_CONFIG.SECURITY.RADIX);
            const yearB = Number.parseInt(b.year, AUFSTELLUNG_CONFIG.SECURITY.RADIX);
            return yearB - yearA;
        });
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

    // Classes for avatar border/hover by rank (use static strings for Tailwind JIT)
    getAvatarBorderClasses(rank: RankType): Record<string, boolean> {
        switch (rank) {
            case 'offizier':
                return { 'border-yellow-400/50': true, 'group-hover:border-yellow-400': true };
            case 'unteroffizier':
                return { 'border-gray-400/50': true, 'group-hover:border-gray-400': true };
            case 'veteran':
                return { 'border-green-400/50': true, 'group-hover:border-green-400': true };
            case 'soldat':
                return { 'border-blue-600/50': true, 'group-hover:border-blue-600': true };
            case 'rekrut':
                return { 'border-blue-300/50': true, 'group-hover:border-blue-300': true };
            case 'gast':
                return { 'border-gray-300/50': true, 'group-hover:border-gray-300': true };
            default:
                return { 'border-gray-400/50': true, 'group-hover:border-gray-400': true };
        }
    }
}
