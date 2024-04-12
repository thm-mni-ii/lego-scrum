import {Component, inject} from '@angular/core';
import {FaIconComponent} from "@fortawesome/angular-fontawesome";
import {faVolumeHigh} from "@fortawesome/free-solid-svg-icons/faVolumeHigh";
import {NavigationService} from "../navigation/navigation.service";
import {SprintState} from "../../model/SprintState";
import {SprintNumber} from "../../model/SprintNumber";
import {AudioService} from "../audio/audio.service";

@Component({
  selector: 'app-audio-controls',
  standalone: true,
  imports: [
    FaIconComponent
  ],
  templateUrl: './audio-controls.component.html',
  styleUrl: './audio-controls.component.css'
})
export class AudioControlsComponent {

  protected readonly faVolumeHigh = faVolumeHigh;
  protected readonly navigationService = inject(NavigationService)
  protected readonly audioService = inject(AudioService)
  protected readonly SprintState = SprintState;
  protected readonly SprintNumber = SprintNumber;

  testAudio() {
    this.audioService.playSoundEffect()
  }
}
