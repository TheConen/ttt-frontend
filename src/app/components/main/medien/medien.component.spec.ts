import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { MedienComponent } from './medien.component';
import { PageTitleService } from '../../../core/services/page-title.service';
import { SanitizationService } from '../../../core/services/sanitization.service';
import { TwitchStream } from '../../../shared/types/medien.types';

describe('MedienComponent', () => {
    let component: MedienComponent;
    let fixture: ComponentFixture<MedienComponent>;
    let mockPageTitleService: jasmine.SpyObj<PageTitleService>;
    let mockSanitizationService: jasmine.SpyObj<SanitizationService>;

    // Test constants for security validation
    const SECURITY_TEST_URLS = {
        XSS_ATTEMPT: ['javascript', 'alert("xss")'].join(':'),
    } as const;

    beforeEach(async () => {
        const pageTitleSpy = jasmine.createSpyObj('PageTitleService', ['setTitle']);
        const sanitizationSpy = jasmine.createSpyObj('SanitizationService', ['isSafeUrl']);

        await TestBed.configureTestingModule({
            imports: [MedienComponent],
            providers: [
                { provide: PageTitleService, useValue: pageTitleSpy },
                { provide: SanitizationService, useValue: sanitizationSpy },
                provideRouter([]),
            ],
        }).compileComponents();

        fixture = TestBed.createComponent(MedienComponent);
        component = fixture.componentInstance;
        mockPageTitleService = TestBed.inject(PageTitleService) as jasmine.SpyObj<PageTitleService>;
        mockSanitizationService = TestBed.inject(SanitizationService) as jasmine.SpyObj<SanitizationService>;

        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should set page title on init', () => {
        expect(mockPageTitleService.setTitle).toHaveBeenCalledWith('Medien');
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

    it('should open external links safely', () => {
        const mockEvent = new Event('click');
        spyOn(mockEvent, 'preventDefault');
        spyOn(globalThis, 'open');
        mockSanitizationService.isSafeUrl.and.returnValue(true);

        const testUrl = 'https://example.com';
        component.openExternalLink(testUrl, mockEvent);

        expect(mockEvent.preventDefault).toHaveBeenCalled();
        expect(mockSanitizationService.isSafeUrl).toHaveBeenCalledWith(testUrl);
        expect(globalThis.open).toHaveBeenCalledWith(testUrl, '_blank', 'noopener,noreferrer');
    });

    it('should not open unsafe links', () => {
        const mockEvent = new Event('click');
        spyOn(mockEvent, 'preventDefault');
        spyOn(globalThis, 'open');
        mockSanitizationService.isSafeUrl.and.returnValue(false);

        // Security test: Verify XSS prevention with potentially dangerous URL
        const unsafeUrl = SECURITY_TEST_URLS.XSS_ATTEMPT;
        component.openExternalLink(unsafeUrl, mockEvent);

        expect(mockEvent.preventDefault).toHaveBeenCalled();
        expect(mockSanitizationService.isSafeUrl).toHaveBeenCalledWith(unsafeUrl);
        expect(globalThis.open).not.toHaveBeenCalled();
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

    it('should have trackBy functions', () => {
        const testLiveStream: TwitchStream = {
            id: 'test',
            userName: 'testuser',
            url: 'test',
            title: 'test',
            viewerCount: 0,
            thumbnailUrl: 'test',
            isLive: true,
            startedAt: '2024-01-01T00:00:00Z',
        };
        const trackByLiveStreamResult = component.trackByLiveStream(0, testLiveStream);
        expect(trackByLiveStreamResult).toBe('test');

        const trackByIndexResult = component.trackByIndex(5);
        expect(trackByIndexResult).toBe(5);
    });
});
