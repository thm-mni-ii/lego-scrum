import {effect, EventEmitter, inject, Injectable, OnDestroy} from '@angular/core';
import {NavigationService} from "../navigation/navigation.service";
import {AudioService} from "../audio/audio.service";

@Injectable({
  providedIn: 'root'
})
export class TimerService implements OnDestroy {
  protected timeStampStart: Date | null;
  timerProgress: number | null;
  protected timer: number | null;
  showStopSign: boolean;

  protected readonly navigationService: NavigationService = inject(NavigationService)
  protected readonly audioService: AudioService = inject(AudioService)

  constructor() {
    this.timeStampStart = null;
    this.timerProgress = null;
    this.timer = null;
    this.showStopSign = false;

    effect(() => {
      this.sprintNumberOrSprintStateChanged()
    });
  }

  ngOnDestroy() {
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

  private calculateTimerProgress(): void {
    const milliStart = this.timeStampStart!.getTime()
    const milliNow = Date.now()

    const milliDelta = milliNow - milliStart
    const minuteDelta = milliDelta / 1000 / 60

    const targetMinuteTime = NavigationService.getDuration(this.navigationService.sprintState())

    if (!targetMinuteTime) {
      this.timerProgress = null
      return
    }

    const targetProgress = minuteDelta / targetMinuteTime * 100
    if (targetProgress > 100) {

      this.stopAndResetTimer()
      this.showStopSign = true;
      this.audioService.playSoundEffect()
    } else {
      this.timerProgress = minuteDelta / targetMinuteTime * 100
    }
  }

  private sprintNumberOrSprintStateChanged(): void {
    this.stopAndResetTimer()

    this.timeStampStart = new Date()
    this.showStopSign = false;

    this.timer = setInterval(() => {
      this.calculateTimerProgress()
    }, 1000)
    this.calculateTimerProgress()
  }
}
