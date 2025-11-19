import { Injectable, signal, WritableSignal } from '@angular/core';
import { SprintNumber } from "../../model/SprintNumber";
import { SprintState } from "../../model/SprintState";

@Injectable({
  providedIn: 'root'
})
export class NavigationService {
  readonly sprintNumber: WritableSignal<SprintNumber>
  readonly sprintState: WritableSignal<SprintState>

  constructor() {
    this.sprintNumber = signal(SprintNumber.introduction);
    this.sprintState = signal(SprintState.idle);
  }

  navigateNext() {
    if (this.sprintNumber() === SprintNumber.introduction) {
      this.sprintNumber.set(SprintNumber.sprint1)
      this.sprintState.set(SprintState.idle)
    } else {
      if (this.sprintState() < SprintState.retrospective) {
        this.sprintState.update((st) => st + 1)
      } else {
        if (this.sprintNumber() < SprintNumber.sprint3) {
          this.sprintNumber.update((sn) => sn + 1)
          this.sprintState.set(SprintState.idle)
        }
      }
    }
  }

  navigateBack() {
    if (this.sprintState() > SprintState.idle) {
      this.sprintState.update((st) => st - 1)
    } else {
      if (this.sprintNumber() > SprintNumber.sprint1) {
        this.sprintNumber.update((sn) => sn - 1)
        this.sprintState.set(SprintState.retrospective)
      } else {
        this.sprintNumber.update(sn => SprintNumber.introduction);
      }
    }
  }

  static getDuration(sprintState: SprintState): number | null {
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
        return 2
    }
  }
}
