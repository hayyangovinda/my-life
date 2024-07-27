import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecordLoaderComponent } from './record-loader.component';

describe('RecordLoaderComponent', () => {
  let component: RecordLoaderComponent;
  let fixture: ComponentFixture<RecordLoaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RecordLoaderComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RecordLoaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
