import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DailyStoriesComponent } from './daily-stories.component';

describe('DailyStoriesComponent', () => {
  let component: DailyStoriesComponent;
  let fixture: ComponentFixture<DailyStoriesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DailyStoriesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DailyStoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
