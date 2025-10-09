import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

// TODO: Move these interfaces to a shared types file when backend is ready
export interface Member {
  id: string;
  name: string;
  rank: RankType;
  avatar: string;
  memberSince: string;
  medals: Medal[];
  campaignRibbons: CampaignRibbon[];
  abteilungen: Abteilung[];
}

export interface Medal {
  id: string;
  name: string;
  image: string;
  description: string;
}

export interface CampaignRibbon {
  id: string;
  name: string;
  image: string;
  campaign: string;
  year: string;
}

export interface Abteilung {
  id: string;
  name: string;
  icon: string;
  description: string;
}

export type RankType = 'offizier' | 'unteroffizier' | 'veteran' | 'soldat' | 'rekrut' | 'gast';

// Backend API Response interfaces
interface MemberResponse {
  members: Member[];
  total: number;
  lastUpdated: string;
}

interface MemberStatsResponse {
  stats: Record<RankType, number>;
  totalMembers: number;
  activeMembers: number;
}

/**
 * Service for managing TTT member data
 * This service will handle all backend communication for the Aufstellung component
 * 
 * TODO: Implement when backend API is available
 */
@Injectable({
  providedIn: 'root'
})
export class MemberService {
  private readonly baseUrl = '/api/v1'; // TODO: Configure from environment
  
  constructor(private readonly http: HttpClient) {}

  /**
   * Get all active members with their details
   * @returns Observable<Member[]>
   */
  getAllMembers(): Observable<Member[]> {
    return this.http.get<MemberResponse>(`${this.baseUrl}/members`).pipe(
      map(response => response.members),
      catchError(error => {
        console.error('Error fetching members:', error);
        throw error;
      })
    );
  }

  /**
   * Get member statistics by rank
   * @returns Observable<Record<RankType, number>>
   */
  getMemberStats(): Observable<Record<RankType, number>> {
    return this.http.get<MemberStatsResponse>(`${this.baseUrl}/members/stats`).pipe(
      map(response => response.stats),
      catchError(error => {
        console.error('Error fetching member stats:', error);
        throw error;
      })
    );
  }

  /**
   * Get member by ID with full details
   * @param memberId - The unique member ID
   * @returns Observable<Member>
   */
  getMemberById(memberId: string): Observable<Member> {
    return this.http.get<Member>(`${this.baseUrl}/members/${memberId}`).pipe(
      catchError(error => {
        console.error(`Error fetching member ${memberId}:`, error);
        throw error;
      })
    );
  }

  /**
   * Get members by rank
   * @param rank - The rank to filter by
   * @returns Observable<Member[]>
   */
  getMembersByRank(rank: RankType): Observable<Member[]> {
    return this.http.get<MemberResponse>(`${this.baseUrl}/members?rank=${rank}`).pipe(
      map(response => response.members),
      catchError(error => {
        console.error(`Error fetching members with rank ${rank}:`, error);
        throw error;
      })
    );
  }

  /**
   * Update member information (for admin users)
   * @param memberId - The unique member ID
   * @param updates - Partial member data to update
   * @returns Observable<Member>
   */
  updateMember(memberId: string, updates: Partial<Member>): Observable<Member> {
    return this.http.patch<Member>(`${this.baseUrl}/members/${memberId}`, updates).pipe(
      catchError(error => {
        console.error(`Error updating member ${memberId}:`, error);
        throw error;
      })
    );
  }

  /**
   * Get available medals
   * @returns Observable<Medal[]>
   */
  getAvailableMedals(): Observable<Medal[]> {
    return this.http.get<Medal[]>(`${this.baseUrl}/medals`).pipe(
      catchError(error => {
        console.error('Error fetching medals:', error);
        throw error;
      })
    );
  }

  /**
   * Get available campaign ribbons
   * @returns Observable<CampaignRibbon[]>
   */
  getAvailableCampaignRibbons(): Observable<CampaignRibbon[]> {
    return this.http.get<CampaignRibbon[]>(`${this.baseUrl}/campaign-ribbons`).pipe(
      catchError(error => {
        console.error('Error fetching campaign ribbons:', error);
        throw error;
      })
    );
  }

  /**
   * Get available departments (Abteilungen)
   * @returns Observable<Abteilung[]>
   */
  getAvailableAbteilungen(): Observable<Abteilung[]> {
    return this.http.get<Abteilung[]>(`${this.baseUrl}/abteilungen`).pipe(
      catchError(error => {
        console.error('Error fetching abteilungen:', error);
        throw error;
      })
    );
  }
}