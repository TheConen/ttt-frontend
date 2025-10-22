import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { TrackByUtils, KeyboardNavigationUtils } from '../../../shared/utils';
import { PageTitleService } from '../../../core/services/page-title.service';
import { SanitizationService } from '../../../core/services/sanitization.service';

// Base interface for all media items
interface BaseMediaItem {
  id: string;
  url: string;
  icon: string;
}

interface LiveStream extends BaseMediaItem {
  platform: 'twitch';
  channelName: string;
  title: string;
  viewers: number;
  thumbnail: string;
  isLive: boolean;
}

interface MediaLink extends BaseMediaItem {
  platform: 'youtube' | 'twitch' | 'trovo';
  name: string;
  description: string;
  color: string;
}

interface SocialMediaLink extends BaseMediaItem {
  platform: 'x' | 'mastodon' | 'bluesky' | 'instagram' | 'tiktok' | 'steam' | 'reddit' | 'github';
  name: string;
  username: string;
  color: string;
}

interface CorporateDesignResource extends BaseMediaItem {
  type: 'wiki' | 'download';
  title: string;
  description: string;
  fileType?: string;
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
  readonly pageSubtitle = 'Streams, Videos und Community-Kanäle des Tactical Training Teams';
  
  private readonly pageTitleService = inject(PageTitleService);
  private readonly sanitizationService = inject(SanitizationService);

  ngOnInit(): void {
    this.pageTitleService.setTitle(this.pageTitle);
    // Simulate loading live streams
    this.loadLiveStreams();
  }

  // Security utility functions
  readonly securityUtils = {
    sanitizeHtml: (html: string) => this.sanitizationService.sanitizeHtml(html),
    stripHtml: (html: string) => this.sanitizationService.stripHtml(html),
    isSafeUrl: (url: string) => this.sanitizationService.isSafeUrl(url)
  };

  // Section configuration
  readonly sections = {
    livestreams: {
      title: 'Live Streams',
      subtitle: 'Aktuelle Live-Übertragungen unserer Community',
      emptyMessage: 'Derzeit sind keine Streams aktiv'
    },
    media: {
      title: 'Medien-Kanäle',
      subtitle: 'Unsere Video- und Streaming-Plattformen'
    },
    social: {
      title: 'Community & Plattformen',
      subtitle: 'Folge uns auf Social Media und anderen Plattformen'
    },
    corporate: {
      title: 'Corporate Design',
      subtitle: 'Logos, Richtlinien und offizielle Ressourcen'
    }
  } as const;

  // Live streams data
  liveStreams: LiveStream[] = [];

  // Media platforms
  readonly mediaLinks: MediaLink[] = [
    {
      id: 'youtube',
      platform: 'youtube',
      name: 'YouTube',
      url: 'https://www.youtube.com/@tacticalteamde',
      icon: 'pi pi-youtube',
      description: 'Mission-Videos, Streams, Tutorials und Community-Highlights',
      color: 'text-red-500'
    },
    {
      id: 'twitch',
      platform: 'twitch',
      name: 'Twitch',
      url: 'https://www.twitch.tv/tacticaltrainingteam',
      icon: 'pi pi-twitch',
      description: 'Live-Streams unserer Missionen und Events',
      color: 'text-purple-500'
    },
    {
      id: 'trovo',
      platform: 'trovo',
      name: 'Trovo',
      url: 'https://trovo.live/tacticalteam',
      icon: 'pi pi-video',
      description: 'Alternative Streaming-Plattform für unsere Community',
      color: 'text-green-500'
    }
  ] as const;

  // Social media platforms
  readonly socialMediaLinks: SocialMediaLink[] = [
    {
      id: 'x',
      platform: 'x',
      name: 'X (Twitter)',
      username: '@TTT_ArmA',
      url: 'https://x.com/TTT_ArmA',
      icon: 'pi pi-twitter',
      color: 'text-blue-400'
    },
    {
      id: 'mastodon',
      platform: 'mastodon',
      name: 'Mastodon',
      username: '@tacticaltrainingteam',
      url: 'https://mastodon.social/@tacticaltrainingteam',
      icon: 'pi pi-hashtag',
      color: 'text-purple-400'
    },
    {
      id: 'bluesky',
      platform: 'bluesky',
      name: 'Bluesky',
      username: '@tacticalteam.bsky.social',
      url: 'https://bsky.app/profile/tacticalteam.bsky.social',
      icon: 'pi pi-cloud',
      color: 'text-sky-400'
    },
    {
      id: 'instagram',
      platform: 'instagram',
      name: 'Instagram',
      username: '@tacticaltrainingteam',
      url: 'https://www.instagram.com/tacticaltrainingteam/',
      icon: 'pi pi-instagram',
      color: 'text-pink-500'
    },
    {
      id: 'tiktok',
      platform: 'tiktok',
      name: 'TikTok',
      username: '@tacticaltrainingteam',
      url: 'https://www.tiktok.com/@tacticaltrainingteam',
      icon: 'pi pi-video',
      color: 'text-red-400'
    },
    {
      id: 'steam',
      platform: 'steam',
      name: 'Steam Gruppe',
      username: 'Tactical Training Team',
      url: 'https://steamcommunity.com/groups/tacticaltrainingteam',
      icon: 'pi pi-desktop',
      color: 'text-blue-300'
    },
    {
      id: 'reddit',
      platform: 'reddit',
      name: 'Reddit',
      username: 'tacticaltrainingteam',
      url: 'https://www.reddit.com/user/tacticaltrainingteam/',
      icon: 'pi pi-reddit',
      color: 'text-red-400'
    },
    {
      id: 'github',
      platform: 'github',
      name: 'GitHub',
      username: 'TacticalTrainingTeam',
      url: 'https://github.com/orgs/TacticalTrainingTeam/',
      icon: 'pi pi-github',
      color: 'text-gray-400'
    }
  ] as const;

  // Corporate design resources
  readonly corporateResources: CorporateDesignResource[] = [
    {
      id: 'wiki-cd',
      type: 'wiki',
      title: 'Corporate Design Wiki',
      description: 'Umfassende Richtlinien für Logo-Verwendung, Farben und Design-Standards',
      url: 'https://wiki.tacticalteam.de/de/TTT-PR/Corporate-Identity',
      icon: 'pi pi-book'
    },
    {
      id: 'logos-designs',
      type: 'download',
      title: 'Logos und Designs',
      description: 'Hochauflösende Logos und Design-Ressourcen in verschiedenen Formaten',
      url: 'https://files.tacticalteam.de/s/36FWSHsGNwaXLHg',
      icon: 'pi pi-images',
      fileType: 'ZIP'
    }
  ] as const;

  // TrackBy functions
  readonly trackByLiveStream = TrackByUtils.trackByProperty<LiveStream>('id');
  readonly trackByMediaLink = TrackByUtils.trackByProperty<MediaLink>('id');
  readonly trackBySocialLink = TrackByUtils.trackByProperty<SocialMediaLink>('id');
  readonly trackByCorporateResource = TrackByUtils.trackByProperty<CorporateDesignResource>('id');
  readonly trackByIndex = TrackByUtils.trackByIndex;

  private loadLiveStreams(): void {
    // Simulate API call to Twitch
    // In a real implementation, you would call the Twitch API here
    // For now, we'll simulate some live streams (empty for demo)
    this.liveStreams = [
      // Uncomment to simulate live streams:
      // {
      //   id: 'stream1',
      //   platform: 'twitch',
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
    if (this.securityUtils.isSafeUrl(url)) {
      window.open(url, '_blank', 'noopener,noreferrer');
    }
  }

  // Keyboard navigation handler for external links (using global utility)
  handleKeyboardNavigation(url: string, event: KeyboardEvent): void {
    KeyboardNavigationUtils.handleExternalLink(event, url, (url, event) => 
      this.openExternalLink(url, event)
    );
  }

  // Platform-specific styling (optimized as readonly constant)
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
    'reddit': 'hover:border-red-400/50 hover:bg-green-400/10',
    'github': 'hover:border-gray-400/50 hover:bg-gray-400/10'
  } as const;

  // Method to get platform-specific styling
  getPlatformStyling(platform: string): string {
    return this.platformStyles[platform] || 'hover:border-tttRed/50 hover:bg-tttRed/10';
  }

  // Button styling constants (optimized for performance)
  private readonly buttonStyles = {
    primary: 'inline-flex items-center gap-2 rounded-lg bg-gradient-to-r from-tttRed to-tttRed-600 px-4 py-2 text-sm font-bold text-tttWhite shadow-lg transition-all duration-300 hover:shadow-xl hover:shadow-tttRed/30',
    secondary: 'inline-flex items-center gap-2 rounded-lg border border-tttWhite/30 bg-tttWhite/10 px-4 py-2 text-sm font-bold text-tttWhite transition-all duration-300 hover:bg-tttWhite/20'
  } as const;

  // Button styling methods (consistent with other components)
  getPrimaryButtonClasses(): string {
    return this.buttonStyles.primary;
  }

  getSecondaryButtonClasses(): string {
    return this.buttonStyles.secondary;
  }
}