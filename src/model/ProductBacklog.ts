import {ProductBacklogEntry} from "./ProductBacklogEntry";

export class ProductBacklog {
  constructor(
    public readonly entries: ProductBacklogEntry[]
  ) {
  }
}
