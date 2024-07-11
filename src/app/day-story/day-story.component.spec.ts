import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DayStoryComponent } from './day-story.component';

describe('DayStoryComponent', () => {
  let component: DayStoryComponent;
  let fixture: ComponentFixture<DayStoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DayStoryComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DayStoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
