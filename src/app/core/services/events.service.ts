import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

export interface SlotbotEvent {
  id: string;
  title: string;
  date: string; // ISO date
  startTime: string; // e.g. '19:00'
  durationHours: number; // duration expressed in hours
  type: string;
  eventUrl?: string; // Optional: URL to event page
}

@Injectable({ providedIn: 'root' })
export class EventsService {
  // Use environment variable when available; fallback to local API prefix
  // NOTE: replace with import from environment when backend is configured
  private readonly baseUrl = typeof (globalThis as any).__TTT_API_BASE__ === 'string' ? (globalThis as any).__TTT_API_BASE__ : '/api/v1';

  private readonly http = inject(HttpClient);

  /**
   * Get upcoming events (compact format expected from backend)
   */
  getUpcomingEvents(limit = 3): Observable<SlotbotEvent[]> {
    // Backend endpoint to provide slotbot events to frontend
    const url = `${this.baseUrl}/events/upcoming?limit=${limit}`;
    return this.http.get<{ events: SlotbotEvent[] }>(url).pipe(
      map(res => res?.events ?? []),
      catchError(err => {
        console.error('Error fetching upcoming events:', err);
        // Fallback to empty list so UI remains stable
        return of([] as SlotbotEvent[]);
      })
    );
  }
}
