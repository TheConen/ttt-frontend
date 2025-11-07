// Types for events (Slotbot, etc.)

export interface SlotbotEvent {
    id: string;
    title: string;
    date: string; // ISO date
    startTime: string; // e.g. '19:00'
    durationHours: number; // duration expressed in hours
    type: string;
    eventUrl?: string; // Optional: URL to event page
}
