// Types for media/Twitch integration

export interface TwitchStream {
    id: string;
    userName: string;
    title: string;
    viewerCount: number;
    startedAt: string; // ISO date
    thumbnailUrl: string;
    isLive: boolean;
    url: string;
}
