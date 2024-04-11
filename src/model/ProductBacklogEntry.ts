import {ProductBacklogEntryState} from "./ProductBacklogEntryState";

export class ProductBacklogEntry {
  constructor(
    public readonly title: string,
    public readonly subTitle: string,
    public readonly state: ProductBacklogEntryState,
    ) {
  }
}
