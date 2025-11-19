import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChronikComponent } from './chronik.component';

describe('ChronikComponent', () => {
    let component: ChronikComponent;
    let fixture: ComponentFixture<ChronikComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [ChronikComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(ChronikComponent);
        component = fixture.componentInstance;
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should have timeline events defined', () => {
        fixture.detectChanges();
        expect(component.timelineEvents).toBeDefined();
        expect(component.timelineEvents.length).toBeGreaterThan(0);
    });

    it('should render timeline events', () => {
        fixture.detectChanges();
        const compiled = fixture.nativeElement as HTMLElement;
        const timelineItems = compiled.querySelectorAll('.timeline-item, [data-testid="timeline-event"]');
        expect(timelineItems.length).toBeGreaterThan(0);
    });

    it('should render history section', () => {
        fixture.detectChanges();
        const compiled = fixture.nativeElement as HTMLElement;
        const historyContent = compiled.querySelector('.history-content, [data-testid="history-section"]');
        expect(historyContent).toBeTruthy();
    });

    it('should have event type configuration methods', () => {
        expect(component.getEventTypeColor).toBeDefined();
        expect(component.getEventTypeLabel).toBeDefined();
        expect(component.getEventIconClasses).toBeDefined();
    });

    it('should return correct event type styling', () => {
        const anniversaryColor = component.getEventTypeColor('anniversary');
        const milestoneColor = component.getEventTypeColor('milestone');

        expect(anniversaryColor).toContain('border-tttRed');
        expect(milestoneColor).toContain('border-blue-500');
    });
});
