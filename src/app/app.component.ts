import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AsyncPipe, DatePipe, CommonModule } from '@angular/common';
import { Observable, of } from 'rxjs';
import { SlotbotEvent } from './core/services/events.service';
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
    standalone: true,
  imports: [RouterOutlet, CommonModule, AsyncPipe, DatePipe, HeaderComponent, FooterComponent],
    templateUrl: './app.component.html',
    styleUrl: './app.component.css',
})
export class AppComponent {
  // Dummy-Events für die Eventliste (später aus Service laden)
  readonly events$: Observable<SlotbotEvent[]> = of([
    {
      id: '25350',
      title: 'SGA Medic 3.0 Beta [Training][Beta]',
      date: new Date().toISOString(),
      startTime: '19:30',
      durationHours: 4,
      type: 'Training',
      eventUrl: 'https://events.tacticalteam.de/events/25350'
    },
    {
      id: '25351',
      title: 'Operation Hill Jumper Teil 1 [Coop][Beta]',
      date: new Date(Date.now() + 86400000).toISOString(),
      startTime: '19:30',
      durationHours: 4,
      type: 'Coop',
      eventUrl: 'https://events.tacticalteam.de/events/25351'
    },
    {
      id: '25352',
      title: 'Übungsunterbrechung [Coop]',
      date: new Date(Date.now() + 2 * 86400000).toISOString(),
      startTime: '19:30',
      durationHours: 4,
      type: 'Coop',
      eventUrl: 'https://events.tacticalteam.de/events/25352'
    }
  ]);
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
}
