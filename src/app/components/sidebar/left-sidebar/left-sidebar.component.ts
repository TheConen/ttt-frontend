import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { Observable, of } from 'rxjs';
import { SlotbotEvent } from '../../../core/services/events.service';

@Component({
  selector: 'ttt-left-sidebar',
  standalone: true,
  imports: [CommonModule, DatePipe],
  templateUrl: './left-sidebar.component.html',
  styleUrl: './left-sidebar.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LeftSidebarComponent {
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
}