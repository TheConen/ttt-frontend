import { Injectable, inject } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { TwitchStream } from '../../shared/types/medien.types';
import { ApiService } from './api.service';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class MedienService {
  private readonly baseUrl = environment.apiBaseUrl;
  private readonly http = inject(HttpClient);

  private readonly api = inject(ApiService);

  /**
   * Get current Twitch livestreams (dummy implementation, replace with backend call)
   */
  getTwitchStreams(): Observable<TwitchStream[]> {
    // Try backend, fallback to dummy
    return this.api.get<TwitchStream[]>(`${this.baseUrl}/twitch/streams`).pipe(
      catchError(() => {
        return of([
          {
            id: '1',
            userName: 'TacticalTrainingTeam',
            title: 'Arma 3 ♦ Blood and Sand [Coop] ♦ Kamera EinStein',
            viewerCount: 42,
            startedAt: new Date().toISOString(),
            thumbnailUrl: '/img/home-banner/home-banner1.webp',
            isLive: true,
            url: 'https://twitch.tv/tacticaltrainingteam'
          }
        ]);
      })
    );
  }
}
