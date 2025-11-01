import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Observable, of } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { TrackByUtils, KeyboardNavigationUtils, BasePageComponent, PageLayoutComponent } from '../../../shared/utils';
import { SanitizationService } from '../../../core/services/sanitization.service';
import { TwitchStream } from '../../../shared/types/medien.types';
import { MedienService } from '../../../core/services/medien.service';

@Component({
  selector: 'ttt-medien',
  standalone: true,
  imports: [CommonModule, RouterLink, PageLayoutComponent],
  templateUrl: './medien.component.html',
  styleUrl: './medien.component.css'
})
export class MedienComponent extends BasePageComponent {
  readonly pageTitle = 'Medien';
  readonly pageSubtitle = 'Streams, Videos und Community-Kanäle des Tactical Training Teams';
  private readonly sanitizationService = inject(SanitizationService);
  private readonly medienService = inject(MedienService);

  readonly liveStreams$: Observable<TwitchStream[]> = this.medienService.getTwitchStreams().pipe(
    retry({ count: 2, delay: 1000 }),
    catchError(() => of([]))
  );

  readonly externalLinks = {
    youtube: 'https://www.youtube.com/@tacticalteamde',
    twitch: 'https://www.twitch.tv/tacticaltrainingteam',
    kick: 'https://kick.com/tacticaltrainingteam',
    x: 'https://x.com/TTT_ArmA',
    mastodon: 'https://mastodon.social/@tacticaltrainingteam',
    bluesky: 'https://bsky.app/profile/tacticalteam.bsky.social',
    instagram: 'https://www.instagram.com/tacticaltrainingteam/',
    tiktok: 'https://www.tiktok.com/@tacticaltrainingteam',
    steam: 'https://steamcommunity.com/groups/tacticaltrainingteam',
    reddit: 'https://www.reddit.com/user/tacticaltrainingteam/',
    github: 'https://github.com/orgs/TacticalTrainingTeam/',
    wiki: 'https://wiki.tacticalteam.de/de/TTT-PR/Corporate-Identity',
    files: 'https://files.tacticalteam.de/s/36FWSHsGNwaXLHg'
  } as const;

  readonly trackByLiveStream = TrackByUtils.trackByProperty<TwitchStream>('id');
  readonly trackByIndex = TrackByUtils.trackByIndex;

  openExternalLink(url: string, event: Event): void {
    event.preventDefault();
    if (this.sanitizationService.isSafeUrl(url)) {
      window.open(url, '_blank', 'noopener,noreferrer');
    }
  }

  handleKeyboardNavigation(url: string, event: KeyboardEvent): void {
    KeyboardNavigationUtils.handleExternalLink(event, url, (url, event) =>
      this.openExternalLink(url, event)
    );
  }

  private readonly platformStyles: Record<string, string> = {
    'youtube': 'hover:border-red-500/50 hover:bg-red-500/10',
    'twitch': 'hover:border-purple-500/50 hover:bg-purple-500/10',
    'kick': 'hover:border-green-600/50 hover:bg-green-600/10',
    'x': 'hover:border-blue-400/50 hover:bg-blue-400/10',
    'mastodon': 'hover:border-purple-400/50 hover:bg-purple-400/10',
    'bluesky': 'hover:border-sky-400/50 hover:bg-sky-400/10',
    'instagram': 'hover:border-pink-500/50 hover:bg-pink-500/10',
    'tiktok': 'hover:border-red-400/50 hover:bg-red-400/10',
    'steam': 'hover:border-blue-300/50 hover:bg-blue-300/10',
    'reddit': 'hover:border-red-400/50 hover:bg-red-400/10',
    'github': 'hover:border-gray-400/50 hover:bg-gray-400/10'
  } as const;

  getPlatformStyling(platform: string): string {
    return this.platformStyles[platform] || 'hover:border-tttRed/50 hover:bg-tttRed/10';
  }

  private readonly buttonStyles = {
    primary: 'inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-tttRed to-tttRed-600 px-4 py-2 text-sm font-bold text-tttWhite shadow-lg transition-all duration-300 hover:shadow-xl hover:shadow-tttRed/30',
    secondary: 'inline-flex items-center gap-2 rounded-lg border border-tttWhite/30 bg-tttWhite/10 px-4 py-2 text-sm font-bold text-tttWhite transition-all duration-300 hover:bg-tttWhite/20'
  } as const;
}
