import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AufstellungComponent } from './aufstellung.component';
import { PageTitleService } from '../../../core/services/page-title.service';
import { SanitizationService } from '../../../core/services/sanitization.service';

describe('AufstellungComponent', () => {
    let component: AufstellungComponent;
    let fixture: ComponentFixture<AufstellungComponent>;
    let mockPageTitleService: jasmine.SpyObj<PageTitleService>;

    beforeEach(async () => {
        const pageServiceSpy = jasmine.createSpyObj('PageTitleService', ['setTitle']);
        const sanitizationServiceSpy = jasmine.createSpyObj('SanitizationService', ['sanitizeHtml', 'stripHtml', 'isSafeUrl']);

        await TestBed.configureTestingModule({
            imports: [AufstellungComponent],
            providers: [
                { provide: PageTitleService, useValue: pageServiceSpy },
                { provide: SanitizationService, useValue: sanitizationServiceSpy },
            ],
        }).compileComponents();

        fixture = TestBed.createComponent(AufstellungComponent);
        component = fixture.componentInstance;
        mockPageTitleService = TestBed.inject(PageTitleService) as jasmine.SpyObj<PageTitleService>;
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should set page title on init', () => {
        component.ngOnInit();
        expect(mockPageTitleService.setTitle).toHaveBeenCalledWith('Aufstellung');
    });

    it('should load dummy members', () => {
        component.ngOnInit();
        expect(component.members.length).toBeGreaterThan(0);
        expect(component.totalMembers).toBeGreaterThan(0);
    });

    it('should group members by rank correctly', () => {
        component.ngOnInit();
        const membersByRank = component.membersByRank;

        expect(membersByRank.offizier).toBeDefined();
        expect(membersByRank.unteroffizier).toBeDefined();
        expect(membersByRank.veteran).toBeDefined();
        expect(membersByRank.soldat).toBeDefined();
        expect(membersByRank.rekrut).toBeDefined();
        expect(membersByRank.gast).toBeDefined();
    });

    it('should calculate member stats correctly', () => {
        component.ngOnInit();
        const stats = component.memberStats;
        const totalFromStats = Object.values(stats).reduce((sum, count) => sum + count, 0);

        expect(totalFromStats).toBe(component.totalMembers);
    });

    it('should toggle member details', () => {
        component.ngOnInit();
        const member = component.members[0];
        const initialExpanded = member.isExpanded || false;

        component.toggleMemberDetails(member);
        expect(member.isExpanded).toBe(!initialExpanded);

        component.toggleMemberDetails(member);
        expect(member.isExpanded).toBe(initialExpanded);
    });

    it('should detect expandable content correctly', () => {
        component.ngOnInit();
        const memberWithContent = component.members.find(
            (m) => m.medals.length > 0 || m.campaignRibbons.length > 0 || m.abteilungen.length > 0
        );
        const memberWithoutContent = component.members.find(
            (m) => m.medals.length === 0 && m.campaignRibbons.length === 0 && m.abteilungen.length === 0
        );

        if (memberWithContent) {
            expect(component.hasExpandableContent(memberWithContent)).toBe(true);
        }
        if (memberWithoutContent) {
            expect(component.hasExpandableContent(memberWithoutContent)).toBe(false);
        }
    });

    it('should format member since date correctly', () => {
        component.ngOnInit();
        const testDate = '2020-03-15';
        const formatted = component.getFormattedMemberSince(testDate);

        expect(formatted).toBeTruthy();
        expect(typeof formatted).toBe('string');
    });

    it('should return correct rank info', () => {
        const offizierInfo = component.getRankInfo('offizier');
        expect(offizierInfo.name).toBe('Offizier');
        expect(offizierInfo.priority).toBe(1);

        const rekrutInfo = component.getRankInfo('rekrut');
        expect(rekrutInfo.name).toBe('Rekrut');
        expect(rekrutInfo.priority).toBe(5);
    });

    it('should provide security utils', () => {
        expect(component.securityUtils.sanitizeHtml).toBeDefined();
        expect(component.securityUtils.stripHtml).toBeDefined();
        expect(component.securityUtils.isSafeUrl).toBeDefined();
    });

    it('should provide trackBy functions from utility class', () => {
        expect(component.trackByRank).toBeDefined();
        expect(component.trackByMember).toBeDefined();
        expect(component.trackByMedal).toBeDefined();
        expect(component.trackByCampaignRibbon).toBeDefined();
        expect(component.trackByAbteilung).toBeDefined();
    });
});
