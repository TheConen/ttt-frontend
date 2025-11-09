import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { MedienComponent } from './medien.component';

describe('MedienComponent', () => {
    let component: MedienComponent;
    let fixture: ComponentFixture<MedienComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [MedienComponent],
            providers: [provideRouter([])],
        }).compileComponents();

        fixture = TestBed.createComponent(MedienComponent);
        component = fixture.componentInstance;

        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should have correct page title', () => {
        expect(component.pageTitle).toBe('Medien');
    });

    it('should have external links configured', () => {
        expect(component.externalLinks).toBeDefined();
        expect(component.externalLinks.youtube).toBe('https://www.youtube.com/@tacticalteamde');
        expect(component.externalLinks.twitch).toBe('https://www.twitch.tv/tacticaltrainingteam');
        expect(component.externalLinks.kick).toBe('https://kick.com/tacticaltrainingteam');
        expect(component.externalLinks.x).toBe('https://x.com/TTT_ArmA');
        expect(component.externalLinks.mastodon).toBe('https://mastodon.social/@tacticaltrainingteam');
        expect(component.externalLinks.bluesky).toBe('https://bsky.app/profile/tacticalteam.bsky.social');
        expect(component.externalLinks.instagram).toBe('https://www.instagram.com/tacticaltrainingteam/');
        expect(component.externalLinks.tiktok).toBe('https://www.tiktok.com/@tacticaltrainingteam');
        expect(component.externalLinks.steam).toBe('https://steamcommunity.com/groups/tacticaltrainingteam');
        expect(component.externalLinks.reddit).toBe('https://www.reddit.com/user/tacticaltrainingteam/');
        expect(component.externalLinks.github).toBe('https://github.com/orgs/TacticalTrainingTeam/');
        expect(component.externalLinks.wiki).toBe('https://wiki.tacticalteam.de/de/TTT-PR/Corporate-Identity');
        expect(component.externalLinks.files).toBe('https://files.tacticalteam.de/s/36FWSHsGNwaXLHg');
    });

    it('should open external links', () => {
        const mockEvent = new Event('click');
        spyOn(mockEvent, 'preventDefault');
        spyOn(globalThis, 'open');

        const testUrl = 'https://example.com';
        component.openExternalLink(testUrl, mockEvent);

        expect(mockEvent.preventDefault).toHaveBeenCalled();
        expect(globalThis.open).toHaveBeenCalledWith(testUrl, '_blank', 'noopener,noreferrer');
    });

    it('should return correct platform styling', () => {
        const youtubeStyle = component.getPlatformStyling('youtube');
        const twitchStyle = component.getPlatformStyling('twitch');
        const githubStyle = component.getPlatformStyling('github');
        const unknownStyle = component.getPlatformStyling('unknown');

        expect(youtubeStyle).toContain('red-500');
        expect(twitchStyle).toContain('purple-500');
        expect(githubStyle).toContain('gray-400');
        expect(unknownStyle).toContain('tttRed');
    });

    it('should have live streams as observable', () => {
        expect(component.liveStreams$).toBeDefined();
    });
});
