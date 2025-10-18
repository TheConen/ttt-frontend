import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { MedienComponent } from './medien.component';
import { PageTitleService } from '../../../core/services/page-title.service';
import { SanitizationService } from '../../../core/services/sanitization.service';

describe('MedienComponent', () => {
  let component: MedienComponent;
  let fixture: ComponentFixture<MedienComponent>;
  let mockPageTitleService: jasmine.SpyObj<PageTitleService>;
  let mockSanitizationService: jasmine.SpyObj<SanitizationService>;

  // Test constants for security validation
  const SECURITY_TEST_URLS = {
    XSS_ATTEMPT: ['javascript', 'alert("xss")'].join(':')
  } as const;

  beforeEach(async () => {
    const pageTitleSpy = jasmine.createSpyObj('PageTitleService', ['setTitle']);
    const sanitizationSpy = jasmine.createSpyObj('SanitizationService', ['isSafeUrl']);

    await TestBed.configureTestingModule({
      imports: [MedienComponent],
      providers: [
        { provide: PageTitleService, useValue: pageTitleSpy },
        { provide: SanitizationService, useValue: sanitizationSpy },
        provideRouter([])
      ]
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

  it('should have correct page configuration', () => {
    expect(component.pageTitle).toBe('Medien & Social Media');
    expect(component.pageSubtitle).toBe('Streams, Videos und Community-Kanäle des Tactical Training Teams');
  });

  it('should have media links configured', () => {
    expect(component.mediaLinks.length).toBeGreaterThan(0);
    expect(component.mediaLinks).toEqual(
      jasmine.arrayContaining([
        jasmine.objectContaining({ platform: 'youtube' }),
        jasmine.objectContaining({ platform: 'twitch' }),
        jasmine.objectContaining({ platform: 'trovo' })
      ])
    );
  });

  it('should have social media links configured', () => {
    expect(component.socialMediaLinks.length).toBeGreaterThan(0);
    expect(component.socialMediaLinks).toEqual(
      jasmine.arrayContaining([
        jasmine.objectContaining({ platform: 'x' }),
        jasmine.objectContaining({ platform: 'mastodon' }),
        jasmine.objectContaining({ platform: 'bluesky' }),
        jasmine.objectContaining({ platform: 'instagram' }),
        jasmine.objectContaining({ platform: 'tiktok' }),
        jasmine.objectContaining({ platform: 'steam' }),
        jasmine.objectContaining({ platform: 'reddit' }),
        jasmine.objectContaining({ platform: 'github' })
      ])
    );
  });

  it('should have corporate resources configured', () => {
    expect(component.corporateResources.length).toBeGreaterThan(0);
    expect(component.corporateResources).toEqual(
      jasmine.arrayContaining([
        jasmine.objectContaining({ type: 'wiki' }),
        jasmine.objectContaining({ type: 'download' })
      ])
    );
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

  it('should initialize with empty live streams', () => {
    expect(component.liveStreams).toEqual([]);
  });

  it('should have trackBy functions', () => {
    const testMediaLink = { id: 'test', platform: 'youtube' as const, name: 'Test', url: 'test', icon: 'test', description: 'test', color: 'test' };
    const trackByResult = component.trackByMediaLink(0, testMediaLink);
    expect(trackByResult).toBe('test');
  });
});