import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';

// Interface for Discord configuration
interface DiscordConfig {
  serverId: string;
  theme: 'dark' | 'light';
  widgetUrl: string;
  directUrl: string;
  widgetTitle: string;
}

@Component({
    selector: 'ttt-root',
    imports: [RouterOutlet, HeaderComponent, FooterComponent],
    templateUrl: './app.component.html',
    styleUrl: './app.component.css',
})
export class AppComponent {
  private readonly sanitizer = inject(DomSanitizer);

  // Trusted domains for iframe sources
  private readonly trustedDomains = [
    'discord.com',
    'discordapp.com'
  ] as const;

  // Sidebar content configuration
  readonly sidebarContent = {
    left: {
      title: 'Left Sidebar',
      description: 'Zukünftig: Eventliste anzeigen, darunter TTT-Login. Nach dem Login erscheinen weitere Links für Missions-Upload, SquadXML usw.'
    },
    right: {
      title: 'Live Discord',
      fallback: {
        message: 'Widget lädt nicht?',
        buttonText: 'Discord beitreten'
      }
    }
  } as const;

  // Discord widget configuration
  readonly discordConfig: DiscordConfig = {
    serverId: '121399943393968128',
    theme: 'dark',
    widgetUrl: 'https://discord.com/widget?id=121399943393968128&theme=dark',
    directUrl: 'https://discord.tacticalteam.de',
    widgetTitle: 'TTT Discord Server'
  };

  // Safely sanitized Discord widget URL with domain validation
  readonly sanitizedDiscordUrl: SafeResourceUrl = this.getSafeResourceUrl(this.discordConfig.widgetUrl);

  /**
   * Safely sanitize a URL for iframe usage with domain validation
   * Only allows URLs from trusted domains to prevent XSS attacks
   */
  private getSafeResourceUrl(url: string): SafeResourceUrl {
    try {
      const urlObj = new URL(url);
      const isValidDomain = this.trustedDomains.some(domain => 
        urlObj.hostname === domain || urlObj.hostname.endsWith(`.${domain}`)
      );
      
      if (!isValidDomain) {
        console.error(`Untrusted domain for iframe: ${urlObj.hostname}`);
        throw new Error(`Domain ${urlObj.hostname} is not in trusted domains list`);
      }

      // Only bypass security for validated trusted domains
      return this.sanitizer.bypassSecurityTrustResourceUrl(url);
    } catch (error) {
      console.error('Invalid URL for iframe:', url, error);
      // Return empty safe URL as fallback
      return this.sanitizer.bypassSecurityTrustResourceUrl('about:blank');
    }
  }

  // Discord icon configuration
  readonly discordIcon = {
    class: 'pi pi-discord text-[#5865F2] mr-2',
    colors: {
      primary: '#5865F2',
      hover: '#4752C4'
    }
  } as const;
}
