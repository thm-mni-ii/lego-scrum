import {Component, inject} from '@angular/core';
import {TimerService} from "../timer/timer.service";
import {NgOptimizedImage} from "@angular/common";

@Component({
  selector: 'app-stop-sign-display',
  standalone: true,
  imports: [
    NgOptimizedImage
  ],
  templateUrl: './stop-sign-display.component.html',
  styleUrl: './stop-sign-display.component.css'
})
export class StopSignDisplayComponent {
  protected timerService: TimerService = inject(TimerService)
}
