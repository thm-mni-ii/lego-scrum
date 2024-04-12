import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StopSignDisplayComponent } from './stop-sign-display.component';

describe('StopSignDisplayComponent', () => {
  let component: StopSignDisplayComponent;
  let fixture: ComponentFixture<StopSignDisplayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StopSignDisplayComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(StopSignDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
