import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { TrackByUtils, KeyboardNavigationUtils } from '../../../shared/utils';
import { PageTitleService } from '../../../core/services/page-title.service';
import { SanitizationService } from '../../../core/services/sanitization.service';

interface LiveStream {
  id: string;
  url: string;
  channelName: string;
  title: string;
  viewers: number;
  thumbnail: string;
  isLive: boolean;
}

@Component({
  selector: 'ttt-medien',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './medien.component.html',
  styleUrl: './medien.component.css'
})
export class MedienComponent implements OnInit {
  readonly pageTitle = 'Medien';
  private readonly pageTitleService = inject(PageTitleService);
  private readonly sanitizationService = inject(SanitizationService);

  ngOnInit(): void {
    this.pageTitleService.setTitle(this.pageTitle);
    // Simulate loading live streams
    this.loadLiveStreams();
  }

  // Live streams data (dynamic)
  liveStreams: LiveStream[] = [];

  // External links that might change
  readonly externalLinks = {
    youtube: 'https://www.youtube.com/@tacticalteamde',
    twitch: 'https://www.twitch.tv/tacticaltrainingteam',
    trovo: 'https://trovo.live/tacticalteam',
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

  // TrackBy functions
  readonly trackByLiveStream = TrackByUtils.trackByProperty<LiveStream>('id');
  readonly trackByIndex = TrackByUtils.trackByIndex;

  private loadLiveStreams(): void {
    // Simulate API call to Twitch
    // In a real implementation, you would call the Twitch API here
    // For now, we'll simulate some live streams (empty for demo)
    this.liveStreams = [
      // Uncomment to simulate live streams:
      // {
      //   id: 'stream1',
      //   channelName: 'TacticalTeamMember1',
      //   title: 'TTT Mission: Operation Schwarze Adler',
      //   viewers: 42,
      //   thumbnail: '/img/medien/placeholder.webp',
      //   url: 'https://twitch.tv/tacticalmember1',
      //   isLive: true
      // }
    ];
  }

  // Utility method for external links (with proper security check)
  openExternalLink(url: string, event: Event): void {
    event.preventDefault();
    if (this.sanitizationService.isSafeUrl(url)) {
      window.open(url, '_blank', 'noopener,noreferrer');
    }
  }

  // Keyboard navigation handler for external links
  handleKeyboardNavigation(url: string, event: KeyboardEvent): void {
    KeyboardNavigationUtils.handleExternalLink(event, url, (url, event) =>
      this.openExternalLink(url, event)
    );
  }

  // Platform-specific styling
  private readonly platformStyles: Record<string, string> = {
    'youtube': 'hover:border-red-500/50 hover:bg-red-500/10',
    'twitch': 'hover:border-purple-500/50 hover:bg-purple-500/10',
    'trovo': 'hover:border-green-500/50 hover:bg-green-500/10',
    'x': 'hover:border-blue-400/50 hover:bg-blue-400/10',
    'mastodon': 'hover:border-purple-400/50 hover:bg-purple-400/10',
    'bluesky': 'hover:border-sky-400/50 hover:bg-sky-400/10',
    'instagram': 'hover:border-pink-500/50 hover:bg-pink-500/10',
    'tiktok': 'hover:border-red-400/50 hover:bg-red-400/10',
    'steam': 'hover:border-blue-300/50 hover:bg-blue-300/10',
    'reddit': 'hover:border-red-400/50 hover:bg-red-400/10',
    'github': 'hover:border-gray-400/50 hover:bg-gray-400/10'
  } as const;

  // Method to get platform-specific styling
  getPlatformStyling(platform: string): string {
    return this.platformStyles[platform] || 'hover:border-tttRed/50 hover:bg-tttRed/10';
  }

  // Button styling constants
  private readonly buttonStyles = {
    primary: 'inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-tttRed to-tttRed-600 px-4 py-2 text-sm font-bold text-tttWhite shadow-lg transition-all duration-300 hover:shadow-xl hover:shadow-tttRed/30',
    secondary: 'inline-flex items-center gap-2 rounded-lg border border-tttWhite/30 bg-tttWhite/10 px-4 py-2 text-sm font-bold text-tttWhite transition-all duration-300 hover:bg-tttWhite/20'
  } as const;

  // Button styling methods
  getPrimaryButtonClasses(): string {
    return this.buttonStyles.primary;
  }

  getSecondaryButtonClasses(): string {
    return this.buttonStyles.secondary;
  }
}
