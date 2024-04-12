import {inject, Injectable, OnDestroy} from '@angular/core';
import {TimerService} from "../timer/timer.service";
import {Subscription} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AudioService {
  playSoundEffect() {
    new Audio('./assets/chaching.mp3').play().catch(console.error);
  }
}
