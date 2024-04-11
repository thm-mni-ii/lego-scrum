import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductBacklogEntryLabelDisplayComponent } from './product-backlog-entry-label-display.component';

describe('ProductBacklogEntryLabelDisplayComponent', () => {
  let component: ProductBacklogEntryLabelDisplayComponent;
  let fixture: ComponentFixture<ProductBacklogEntryLabelDisplayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductBacklogEntryLabelDisplayComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProductBacklogEntryLabelDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
