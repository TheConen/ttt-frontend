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

  // Pre-sanitized Discord widget URL (only created once)
  readonly sanitizedDiscordUrl: SafeResourceUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.discordConfig.widgetUrl);

  // Discord icon configuration
  readonly discordIcon = {
    class: 'pi pi-discord text-[#5865F2] mr-2',
    colors: {
      primary: '#5865F2',
      hover: '#4752C4'
    }
  } as const;
}
