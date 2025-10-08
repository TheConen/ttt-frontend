import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MitmachenComponent } from './mitmachen.component';

describe('MitmachenComponent', () => {
  let component: MitmachenComponent;
  let fixture: ComponentFixture<MitmachenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MitmachenComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MitmachenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});