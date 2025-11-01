
import {
  Member,
  Medal,
  CampaignRibbon,
  Abteilung,
  RankType,
  MemberResponse,
  MemberStatsResponse
} from '../../shared/types/member.types';

import { Injectable, inject } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map, catchError, timeout, retry } from 'rxjs/operators';
import { ApiService } from './api.service';
import { environment } from '../../../environments/environment';

/**
 * Service for managing TTT member data
 */
@Injectable({
  providedIn: 'root'
})
export class MemberService {
  private readonly baseUrl = environment.apiBaseUrl;
  private readonly api = inject(ApiService);

  /**
   * Helper method to handle API calls with retry and timeout strategy
   */
  private handleApiCall<T, R>(
    url: string,
    mapFn: (response: T) => R,
    fallbackValue: R,
    options: { timeout?: number; retries?: number; retryDelay?: number } = {}
  ): Observable<R> {
    const { timeout: timeoutMs = 5000, retries = 2, retryDelay = 1000 } = options;

    return this.api.get<T>(url).pipe(
      timeout(timeoutMs),
      retry({ count: retries, delay: retryDelay }),
      map(mapFn),
      catchError(() => of(fallbackValue))
    );
  }

  /**
   * Create a basic member object with minimal data
   */
  private createBasicMember(id: string, name: string, rank: RankType, memberSince: string): Member {
    return {
      id,
      name,
      rank,
      avatar: '',
      memberSince,
      medals: [],
      campaignRibbons: [],
      abteilungen: []
    };
  }

  /**
   * Get dummy member data for fallback
   */
  private getDummyMembers(): Member[] {
    return [
      {
        id: 'member-1',
        name: 'TheConen',
        rank: 'offizier',
        avatar: '/img/aufstellung/offizier-kopf.webp',
        memberSince: '2015-01-01',
        medals: [
          { id: 'medal-1', name: 'Medal of Honor', image: '/img/aufstellung/medals/medal-mdh.png', description: 'Für besondere Verdienste' }
        ],
        campaignRibbons: [
          { id: 'ribbon-1', name: 'Aspis Kampagne', image: '/img/aufstellung/ribbons/ttt_veteran-kampagne-aspis.png', campaign: 'Operation Aspis', year: '2020' }
        ],
        abteilungen: [
          { id: 'abt-1', name: 'Missionsbau', icon: '/img/aufstellung/group/group-missionsbau-icon.png', description: 'Wissensvermittlung & Multiplikation im Missionsbau' }
        ]
      },
      {
        id: 'member-2',
        name: 'SpecOp0',
        rank: 'offizier',
        avatar: '/img/aufstellung/offizier-kopf.webp',
        memberSince: '2016-01-01',
        medals: [
          { id: 'medal-2', name: 'Medal of Honor', image: '/img/aufstellung/medals/medal-mdh.png', description: 'Für besondere Verdienste' },
          { id: 'medal-3', name: 'Training Gold', image: '/img/aufstellung/medals/medal-gold-training.png', description: 'Abzeichen für Trainingsleistungen (Gold)' }
        ],
        campaignRibbons: [
          { id: 'ribbon-2', name: 'Aspis Kampagne', image: '/img/aufstellung/ribbons/ttt_veteran-kampagne-aspis.png', campaign: 'Operation Aspis', year: '2020' },
          { id: 'ribbon-3', name: 'Beth Nahrin Kampagne', image: '/img/aufstellung/ribbons/ttt_veteran-kampagne-beth-nahrin.png', campaign: 'Operation Beth Nahrin', year: '2021' },
          { id: 'ribbon-4', name: 'Paradiso Kampagne', image: '/img/aufstellung/ribbons/ttt_veteran-kampagne-paradiso.png', campaign: 'Operation Paradiso', year: '2023' }
        ],
        abteilungen: [
          { id: 'abt-1', name: 'Missionsbau', icon: '/img/aufstellung/group/group-missionsbau-icon.png', description: 'Wissensvermittlung & Multiplikation im Missionsbau' },
          { id: 'abt-2', name: 'Medien & PR', icon: '/img/aufstellung/group/group-pr-icon.png', description: 'Social Media und Öffentlichkeitsarbeit' },
          { id: 'abt-3', name: 'Technik', icon: '/img/aufstellung/group/group-technik-icon.png', description: 'Server-Administration und technische Wartung' }
        ]
      },
      this.createBasicMember('member-3', 'Reimchen', 'unteroffizier', '2018-01-01'),
      this.createBasicMember('member-4', 'rockn_roller', 'unteroffizier', '2019-01-01'),
      this.createBasicMember('member-5', 'GSG9_abzocker', 'veteran', '2017-01-01'),
      this.createBasicMember('member-6', 'Speutzi', 'veteran', '2018-01-01'),
      this.createBasicMember('member-7', 'Corben', 'soldat', '2022-01-01'),
      this.createBasicMember('member-8', 'SchmerzKeks', 'soldat', '2023-01-01'),
      this.createBasicMember('member-9', 'Epsilon', 'rekrut', '2024-01-01'),
      this.createBasicMember('member-10', 'Addi995', 'rekrut', '2024-01-01'),
      this.createBasicMember('member-11', 'Mynx', 'gast', '2024-01-01'),
      this.createBasicMember('member-12', 'Leroy', 'gast', '2024-01-01')
    ];
  }

  /**
   * Get all active members with retry and timeout strategy
   */
  getAllMembers(): Observable<Member[]> {
    return this.handleApiCall<MemberResponse, Member[]>(
      `${this.baseUrl}/members`,
      (response) => response.members,
      this.getDummyMembers()
    );
  }

  /**
   * Get member statistics by rank with retry strategy
   */
  getMemberStats(): Observable<Record<RankType, number>> {
    const fallbackStats: Record<RankType, number> = {
      offizier: 2,
      unteroffizier: 2,
      veteran: 2,
      soldat: 2,
      rekrut: 2,
      gast: 2
    };

    return this.handleApiCall<MemberStatsResponse, Record<RankType, number>>(
      `${this.baseUrl}/members/stats`,
      (response) => response.stats,
      fallbackStats,
      { timeout: 5000, retries: 2, retryDelay: 1000 }
    );
  }

  /**
   * Get member by ID with full details
   * @param memberId - The unique member ID
   * @returns Observable<Member>
   */
  getMemberById(memberId: string): Observable<Member> {
    return this.api.get<Member>(`${this.baseUrl}/members/${memberId}`);
  }

  /**
   * Get members by rank
   * @param rank - The rank to filter by
   * @returns Observable<Member[]>
   */
  getMembersByRank(rank: RankType): Observable<Member[]> {
    return this.api.get<MemberResponse>(`${this.baseUrl}/members?rank=${rank}`).pipe(
      map((response: MemberResponse) => response.members)
    );
  }

  /**
   * Update member information (for admin users)
   * @param memberId - The unique member ID
   * @param updates - Partial member data to update
   * @returns Observable<Member>
   */
  updateMember(memberId: string, updates: Partial<Member>): Observable<Member> {
    return this.api.patch<Member>(`${this.baseUrl}/members/${memberId}`, updates);
  }

  /**
   * Get available medals
   * @returns Observable<Medal[]>
   */
  getAvailableMedals(): Observable<Medal[]> {
    return this.api.get<Medal[]>(`${this.baseUrl}/medals`);
  }

  /**
   * Get available campaign ribbons
   * @returns Observable<CampaignRibbon[]>
   */
  getAvailableCampaignRibbons(): Observable<CampaignRibbon[]> {
    return this.api.get<CampaignRibbon[]>(`${this.baseUrl}/campaign-ribbons`);
  }

  /**
   * Get available departments (Abteilungen)
   * @returns Observable<Abteilung[]>
   */
  getAvailableAbteilungen(): Observable<Abteilung[]> {
    return this.api.get<Abteilung[]>(`${this.baseUrl}/abteilungen`);
  }
}
