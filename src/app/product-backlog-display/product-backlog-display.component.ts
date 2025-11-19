import { Component, computed, inject, Signal } from '@angular/core';
import { ProductBacklog } from "../../model/ProductBacklog";
import { SprintNumber } from "../../model/SprintNumber";
import { ProductBacklogEntry } from "../../model/ProductBacklogEntry";
import { ProductBacklogEntryState } from "../../model/ProductBacklogEntryState";
import { NavigationService } from "../navigation/navigation.service";
import {
  ProductBacklogEntryLabelDisplayComponent
} from "../product-backlog-entry-label-display/product-backlog-entry-label-display.component";
import { SprintState } from "../../model/SprintState";

@Component({
  selector: 'app-product-backlog-display',
  standalone: true,
  imports: [
    ProductBacklogEntryLabelDisplayComponent
  ],
  templateUrl: './product-backlog-display.component.html',
  styleUrl: './product-backlog-display.component.css'
})
export class ProductBacklogDisplayComponent {
  protected productBacklog: Signal<ProductBacklog>
  protected navigationService: NavigationService = inject(NavigationService)

  constructor() {
    this.productBacklog = computed(() => {
      switch (this.navigationService.sprintNumber()) {
        case SprintNumber.introduction: return new ProductBacklog([])
        case SprintNumber.sprint1: return new ProductBacklog([
          new ProductBacklogEntry("Einstöckiges Haus", "Tür + Fenster", ProductBacklogEntryState.normal),
          new ProductBacklogEntry("Kindergarten", "+ 4 Spielgeräte", ProductBacklogEntryState.normal),
          new ProductBacklogEntry("Kirche", "mit Turm + Kreuz", ProductBacklogEntryState.normal),
          new ProductBacklogEntry("Garage", "Einfahrt", ProductBacklogEntryState.normal),
          new ProductBacklogEntry("3 Obstbäume", "", ProductBacklogEntryState.normal),
          new ProductBacklogEntry("Zweistöckiges Haus", "Tür + 3 Fenster", ProductBacklogEntryState.normal),
          new ProductBacklogEntry("2 Ampeln", "", ProductBacklogEntryState.normal),
        ])
        case SprintNumber.sprint2: return new ProductBacklog([
          new ProductBacklogEntry("Einstöckiges Haus", "Tür + Fenster", ProductBacklogEntryState.normal),
          new ProductBacklogEntry("Kindergarten", "+ 4 Spielgeräte", ProductBacklogEntryState.normal),
          new ProductBacklogEntry("Auto", "mit Fahrer + Dach", ProductBacklogEntryState.addition),
          new ProductBacklogEntry("Kirche", "Kreuz, höher als Haus", ProductBacklogEntryState.change),
          new ProductBacklogEntry("Garage", "für Auto", ProductBacklogEntryState.change),
          new ProductBacklogEntry("House of SCRUM", "", ProductBacklogEntryState.addition),
          new ProductBacklogEntry("3 Obstbäume", "", ProductBacklogEntryState.normal),
          new ProductBacklogEntry("Zweistöckiges Haus", "Tür + 3 Fenster", ProductBacklogEntryState.normal),
          new ProductBacklogEntry("2 Ampeln", "", ProductBacklogEntryState.normal),
          new ProductBacklogEntry("Denkmal", "am höchsten", ProductBacklogEntryState.addition),
          new ProductBacklogEntry("Bus", "", ProductBacklogEntryState.addition),
          new ProductBacklogEntry("Bushaltestelle", "", ProductBacklogEntryState.addition),
        ])
        case SprintNumber.sprint3: return new ProductBacklog([
          new ProductBacklogEntry("Krankenhaus", "Wand mit rotem +", ProductBacklogEntryState.addition),
          new ProductBacklogEntry("Einstöckiges Haus", "Tür + Fenster", ProductBacklogEntryState.removed),
          new ProductBacklogEntry("Kindergarten", "+ 4 Spielgeräte", ProductBacklogEntryState.normal),
          new ProductBacklogEntry("Auto", "mit Fahrer + Dach", ProductBacklogEntryState.normal),
          new ProductBacklogEntry("Pferd", "mit Reiter", ProductBacklogEntryState.addition),
          new ProductBacklogEntry("Kirche", "Kreuz, höher als Haus", ProductBacklogEntryState.normal),
          new ProductBacklogEntry("Brücke", "für Auto", ProductBacklogEntryState.addition),
          new ProductBacklogEntry("Garage", "für Auto", ProductBacklogEntryState.normal),
          new ProductBacklogEntry("House of SCRUM", "", ProductBacklogEntryState.normal),
          new ProductBacklogEntry("3 Obstbäume", "", ProductBacklogEntryState.normal),
          new ProductBacklogEntry("Zweistöckiges Haus", "Tür + 3 Fenster", ProductBacklogEntryState.normal),
          new ProductBacklogEntry("2 Ampeln", "", ProductBacklogEntryState.removed),
          new ProductBacklogEntry("Denkmal", "am höchsten", ProductBacklogEntryState.normal),
          new ProductBacklogEntry("3 Laternen", "oben gelb", ProductBacklogEntryState.addition),
          new ProductBacklogEntry("Bus", "", ProductBacklogEntryState.addition),
          new ProductBacklogEntry("Bushaltestelle", "", ProductBacklogEntryState.addition),
        ])
      }
    })
  }

  protected readonly SprintNumber = SprintNumber;
  protected readonly NavigationService = NavigationService;
  protected readonly SprintState = SprintState;
}
