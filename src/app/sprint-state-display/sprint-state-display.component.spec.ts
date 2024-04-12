import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SprintStateDisplayComponent } from './sprint-state-display.component';

describe('SprintStateDisplayComponent', () => {
  let component: SprintStateDisplayComponent;
  let fixture: ComponentFixture<SprintStateDisplayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SprintStateDisplayComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SprintStateDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
