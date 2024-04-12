import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductBacklogDisplayComponent } from './product-backlog-display.component';

describe('ProductBacklogDisplayComponent', () => {
  let component: ProductBacklogDisplayComponent;
  let fixture: ComponentFixture<ProductBacklogDisplayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductBacklogDisplayComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProductBacklogDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
