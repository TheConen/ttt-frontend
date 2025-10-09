import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
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
  // Sidebar content configuration
  readonly sidebarContent = {
    left: {
      title: 'Left Sidebar',
      description: 'Features coming soon. Event list, TTT login and post-login links for Missionsupload, SquadXML'
    },
    right: {
      title: 'Live Discord',
      fallback: {
        message: 'Widget lädt nicht?',
        buttonText: 'Discord beitreten'
      }
    }
  } as const;

  // Discord widget configuration - using trusted static URL
  readonly discordConfig: DiscordConfig = {
    serverId: '121399943393968128',
    theme: 'dark',
    // Static trusted URL - no dynamic sanitization needed
    widgetUrl: 'https://discord.com/widget?id=121399943393968128&theme=dark',
    directUrl: 'https://discord.tacticalteam.de',
    widgetTitle: 'TTT Discord Server'
  };

  // Discord icon configuration
  readonly discordIcon = {
    class: 'pi pi-discord text-[#5865F2] mr-2',
    colors: {
      primary: '#5865F2',
      hover: '#4752C4'
    }
  } as const;
}
