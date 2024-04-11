import {Component, Input} from '@angular/core';
import {ProductBacklogEntryState} from "../../model/ProductBacklogEntryState";

@Component({
  selector: 'app-product-backlog-entry-label-display',
  standalone: true,
  imports: [],
  templateUrl: './product-backlog-entry-label-display.component.html',
  styleUrl: './product-backlog-entry-label-display.component.css'
})
export class ProductBacklogEntryLabelDisplayComponent {
  @Input() label!: string;
  @Input() state!: ProductBacklogEntryState;
  protected readonly ProductBacklogEntryState = ProductBacklogEntryState;
}
