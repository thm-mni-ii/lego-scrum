import {SprintState} from "./SprintState";
import {SprintNumber} from "./SprintNumber";
import {ProductBacklog} from "./ProductBacklog";
import {ProductBacklogEntry} from "./ProductBacklogEntry";
import {ProductBacklogEntryState} from "./ProductBacklogEntryState";

export function getDuration(sprintState: SprintState): number | null {
  switch (sprintState) {
    case SprintState.idle: return null;
    case SprintState.planning:
      return 6
    case SprintState.building1:
      return 2
    case SprintState.daily:
      return 1
    case SprintState.building2:
      return 2
    case SprintState.review:
      return null
    case SprintState.retrospective:
      return 3
  }
}

export function parseSprintNumber(sprintNumberString: string | null): SprintNumber {
  if (sprintNumberString == null) {
    throw new Error(`Sprint number not found.`);
  }

  const sprintNumberRaw = parseInt(sprintNumberString)
  if (isNaN(sprintNumberRaw)) {
    throw new Error(`Cannot parse sprint number: ${sprintNumberString}.`);
  }

  if (!Object.values(SprintNumber).includes(sprintNumberRaw)) {
    throw new Error(`Cannot parse sprint number: ${sprintNumberRaw}.`);
  }

  return sprintNumberRaw as SprintNumber
}

export function parseSprintState(sprintStateString: string | null): SprintState {
  if (sprintStateString == null) {
    throw new Error(`Sprint state not found.`);
  }

  const sprintStateRaw = parseInt(sprintStateString)
  if (isNaN(sprintStateRaw)) {
    throw new Error(`Cannot parse sprint state: ${sprintStateString}.`);
  }

  if (!Object.values(SprintState).includes(sprintStateRaw)) {
    throw new Error(`Cannot parse sprint state: ${sprintStateRaw}.`);
  }
  return sprintStateRaw as SprintState
}

export function getProductBacklog(sprintNumber: SprintNumber): ProductBacklog {
  switch (sprintNumber) {
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
}
