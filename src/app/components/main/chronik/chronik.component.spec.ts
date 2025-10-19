import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PageTitleService } from '../../../core/services/page-title.service';

import { ChronikComponent } from './chronik.component';

describe('ChronikComponent', () => {
  let component: ChronikComponent;
  let fixture: ComponentFixture<ChronikComponent>;
  let pageTitleService: jasmine.SpyObj<PageTitleService>;

  beforeEach(async () => {
    const pageTitleSpy = jasmine.createSpyObj('PageTitleService', ['setTitle']);

    await TestBed.configureTestingModule({
      imports: [ChronikComponent],
      providers: [
        { provide: PageTitleService, useValue: pageTitleSpy }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChronikComponent);
    component = fixture.componentInstance;
    pageTitleService = TestBed.inject(PageTitleService) as jasmine.SpyObj<PageTitleService>;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set page title on init', () => {
    component.ngOnInit();
    expect(pageTitleService.setTitle).toHaveBeenCalledWith('TTT-Chronik');
  });

  it('should have timeline events defined', () => {
    fixture.detectChanges();
    expect(component.timelineEvents).toBeDefined();
    expect(component.timelineEvents.length).toBeGreaterThan(0);
  });

  it('should have history section defined', () => {
    fixture.detectChanges();
    expect(component.historySection).toBeDefined();
    expect(component.historySection.paragraphs.length).toBeGreaterThan(0);
  });

  it('should have call to action defined', () => {
    fixture.detectChanges();
    expect(component.callToAction).toBeDefined();
    expect(component.callToAction.links.length).toBeGreaterThan(0);
  });

  it('should provide trackBy functions', () => {
    expect(component.trackByIndex).toBeDefined();
    expect(component.trackByEvent).toBeDefined();
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