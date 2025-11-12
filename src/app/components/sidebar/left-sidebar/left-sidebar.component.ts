import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { DatePipe, AsyncPipe } from '@angular/common';
import { Observable } from 'rxjs';
import { SlotbotEvent } from '../../../shared/types/events.types';
import { EventsService } from '../../../core/services/events.service';

@Component({
    selector: 'ttt-left-sidebar',
    standalone: true,
    imports: [DatePipe, AsyncPipe],
    templateUrl: './left-sidebar.component.html',
    styleUrl: './left-sidebar.component.css',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LeftSidebarComponent {
    private readonly eventsService = inject(EventsService);
    readonly events$: Observable<SlotbotEvent[]> = this.eventsService.getUpcomingEvents(3);
}
