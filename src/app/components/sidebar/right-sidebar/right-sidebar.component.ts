import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

interface DiscordConfig {
  serverId: string;
  theme: 'dark' | 'light';
  widgetUrl: string;
  directUrl: string;
  widgetTitle: string;
}

interface DiscordIcon {
  class: string;
  colors: {
    primary: string;
    hover: string;
    text: string;
  };
}

@Component({
  selector: 'ttt-right-sidebar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './right-sidebar.component.html',
  styleUrl: './right-sidebar.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RightSidebarComponent {
  // Discord widget configuration - using trusted static URL
  readonly discordConfig: DiscordConfig = {
    serverId: '121399943393968128',
    theme: 'dark',
    // Static trusted URL - no dynamic sanitization needed
    widgetUrl: 'https://discord.com/widget?id=121399943393968128&theme=dark',
    directUrl: 'https://discord.tacticalteam.de',
    widgetTitle: 'TTT Discord Server'
  };

  // Discord icon configuration (tttRed)
  readonly discordIcon = {
    class: 'pi pi-discord text-tttRed mr-2',
    colors: {
      primary: 'bg-tttRed',
      hover: 'hover:bg-tttRed-600',
      text: 'text-tttWhite'
    }
  } as const;

  private _safeWidgetUrl?: SafeResourceUrl;

  constructor(private readonly sanitizer: DomSanitizer) {}

  get safeWidgetUrl(): SafeResourceUrl {
    if (!this._safeWidgetUrl) {
      // Validate that the URL is a trusted Discord widget URL
      const url = this.discordConfig.widgetUrl;
      if (url.startsWith('https://discord.com/widget?')) {
        this._safeWidgetUrl = this.sanitizer.bypassSecurityTrustResourceUrl(url);
      } else {
        throw new Error('Unsafe Discord widget URL detected!');
      }
    }
    return this._safeWidgetUrl;
  }
}
