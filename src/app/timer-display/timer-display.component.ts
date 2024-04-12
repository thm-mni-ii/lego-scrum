import {Component, inject} from '@angular/core';
import {NgbProgressbar} from "@ng-bootstrap/ng-bootstrap";
import {TimerService} from "../timer/timer.service";

@Component({
  selector: 'app-timer-display',
  standalone: true,
  imports: [
    NgbProgressbar
  ],
  templateUrl: './timer-display.component.html',
  styleUrl: './timer-display.component.css'
})
export class TimerDisplayComponent {
  protected timerService = inject(TimerService)
}
