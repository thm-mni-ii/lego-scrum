import { Component, ElementRef, HostListener, inject, ViewChild } from '@angular/core';
import { NgOptimizedImage } from "@angular/common";
import { ProductBacklogDisplayComponent } from "./product-backlog-display/product-backlog-display.component";
import { SprintStateDisplayComponent } from "./sprint-state-display/sprint-state-display.component";
import { StopSignDisplayComponent } from "./stop-sign-display/stop-sign-display.component";
import { TimerDisplayComponent } from "./timer-display/timer-display.component";
import { NavigationService } from "./navigation/navigation.service";
import { AudioControlsComponent } from "./audio-controls/audio-controls.component";
import { SprintNumber } from "../model/SprintNumber";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [NgOptimizedImage, ProductBacklogDisplayComponent, SprintStateDisplayComponent, StopSignDisplayComponent, TimerDisplayComponent, AudioControlsComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  protected navigationService: NavigationService = inject(NavigationService)
  @ViewChild('pageContainer') pageContainer?: ElementRef<HTMLDivElement>;
  protected scale: number = 1

  constructor() {
  }

  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    if (["Enter", "ArrowRight", " "].includes(event.key)) {
      this.navigationService.navigateNext()
    } else if (["Backspace", "ArrowLeft"].includes(event.key)) {
      this.navigationService.navigateBack()
    }
  }

  @HostListener('window:resize')
  onResize() {
    this.scale = this.calculateScale()
  }

  ngAfterViewInit() {
    setTimeout(() => this.scale = this.calculateScale())

  }

  calculateScale(): number {
    if (this.pageContainer == null) {
      return 1;
    }

    const aspectRatio = 800/600
    const windowWidth = (this.pageContainer.nativeElement).offsetWidth;
    const windowHeight = (this.pageContainer.nativeElement).offsetHeight;
    if (windowWidth / windowHeight < aspectRatio) {
      // should scale x
      return windowWidth / 800
    } else {
      // should scale y
      return windowHeight / 600
    }
  }

  title(): string {
    if (this.navigationService.sprintNumber() === SprintNumber.introduction) {
      return " - das Spiel"
    }
    return `(${this.navigationService.sprintNumber()}. Sprint)`
  }
}
