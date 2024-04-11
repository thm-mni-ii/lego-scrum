import {Component, HostListener, inject, OnDestroy} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {SprintNumber} from "../../model/SprintNumber";
import {SprintState} from "../../model/SprintState";
import {Subscription} from "rxjs";
import {getDuration, getProductBacklog, parseSprintNumber, parseSprintState} from "../../model/Tools";
import {NgForOf, NgIf} from "@angular/common";
import {ProductBacklog} from "../../model/ProductBacklog";
import {
  ProductBacklogEntryLabelDisplayComponent
} from "../product-backlog-entry-label-display/product-backlog-entry-label-display.component";
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {faRightLong} from "@fortawesome/free-solid-svg-icons/faRightLong";
import {faLeftLong} from "@fortawesome/free-solid-svg-icons/faLeftLong";
import {NgbProgressbar} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-sprint-display',
  standalone: true,
  imports: [
    NgIf,
    NgForOf,
    ProductBacklogEntryLabelDisplayComponent,
    FontAwesomeModule,
    NgbProgressbar
  ],
  templateUrl: './sprint-display.component.html',
  styleUrl: './sprint-display.component.css'
})
export class SprintDisplayComponent implements OnDestroy {
  protected readonly SprintState = SprintState;
  protected readonly getDuration = getDuration;
  protected readonly faRightLong = faRightLong;
  protected readonly faLeftLong = faLeftLong;

  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly router = inject(Router);

  protected readonly paramsSubscription: Subscription;
  protected sprintNumber: SprintNumber | null
  protected sprintState: SprintState | null
  protected productBacklog: ProductBacklog | null;
  protected timeStampStart: Date | null;
  protected timerProgress: number | null;
  protected timer: number | null;
  protected showStopSign: boolean;

  constructor() {
    this.sprintNumber = null;
    this.sprintState = null;
    this.productBacklog = null;
    this.timeStampStart = null;
    this.timerProgress = null;
    this.timer = null;
    this.showStopSign = false;

    this.paramsSubscription = this.activatedRoute.paramMap.subscribe((params) => {
      try {
        const newSprintNumber = parseSprintNumber(params.get("sprintNumber"))
        const newSprintState = parseSprintState(params.get("sprintState"))

        if (this.sprintNumber != newSprintNumber || this.sprintState != newSprintState) {
          this.sprintNumberOrSprintStateChanged(newSprintNumber, newSprintState)
        }
      } catch (error) {
        console.error(error)
        this.router.navigate(["/"]).catch(console.error);
      }
    });
  }

  ngOnDestroy() {
    this.paramsSubscription.unsubscribe();
    if (this.timer) {
      clearInterval(this.timer)
    }
  }

  private stopAndResetTimer(): void {
    if (this.timer) {
      clearInterval(this.timer)
    }
    this.timer = null;
    this.timerProgress = null;
    this.timeStampStart = null;
  }

  private timerDidFinish(): void {
    this.stopAndResetTimer()
    this.showStopSign = true;
  }

  private calculateTimerProgress(): void {
    const milliStart = this.timeStampStart!.getTime()
    const milliNow = Date.now()

    const milliDelta = milliNow - milliStart
    const minuteDelta = milliDelta / 1000 / 60

    const targetMinuteTime = getDuration(this.sprintState!)

    if (!targetMinuteTime) {
      this.timerProgress = null
      return
    }

    const targetProgress = minuteDelta / targetMinuteTime * 100
    if (targetProgress > 100) {
      this.timerDidFinish()
    } else {
      this.timerProgress = minuteDelta / targetMinuteTime * 100
    }
  }

  private sprintNumberOrSprintStateChanged(newSprintNumber: SprintNumber, newSprintState: SprintState): void {
    this.stopAndResetTimer()

    this.sprintNumber = newSprintNumber
    this.sprintState = newSprintState
    this.productBacklog = getProductBacklog(this.sprintNumber)
    this.timeStampStart = new Date()
    this.showStopSign = false;

    this.timer = setInterval(() => {
      this.calculateTimerProgress()
    }, 1000)
    this.calculateTimerProgress()
  }

  canShowNextButton(): boolean {
    if (this.sprintNumber == SprintNumber.sprint3 && this.sprintState == SprintState.retrospective) {
      return false
    } else {
      return true;
    }
  }

  canShowPreviousButton(): boolean {
    if (this.sprintNumber == SprintNumber.sprint1 && this.sprintState == SprintState.idle) {
      return false
    } else {
      return true;
    }
  }

  navigateNext() {
    if (this.sprintState! < SprintState.retrospective) {
      this.router.navigate(["sprint", this.sprintNumber, this.sprintState! + 1])
    } else {
      if (this.sprintNumber! < SprintNumber.sprint3) {
        this.router.navigate(["sprint", this.sprintNumber! + 1, SprintState.idle])
      }
    }
  }

  navigatePrevious() {
    if (this.sprintState! > SprintState.idle) {
      this.router.navigate(["sprint", this.sprintNumber, this.sprintState! - 1])
    } else {
      if (this.sprintNumber! > SprintNumber.sprint1) {
        this.router.navigate(["sprint", this.sprintNumber! - 1, SprintState.retrospective])
      }
    }
  }

  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    console.log(event.key)
    if (["Enter", "ArrowRight", " "].includes(event.key)) {
      this.navigateNext()
    } else if (["Backspace", "ArrowLeft"].includes(event.key)) {
      this.navigatePrevious()
    }
  }
}
