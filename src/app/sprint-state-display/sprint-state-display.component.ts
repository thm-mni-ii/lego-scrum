import {Component, inject} from '@angular/core';
import {faRightLong} from "@fortawesome/free-solid-svg-icons/faRightLong";
import {SprintState} from "../../model/SprintState";
import {FaIconComponent} from "@fortawesome/angular-fontawesome";
import {NavigationService} from "../navigation/navigation.service";

@Component({
  selector: 'app-sprint-state-display',
  standalone: true,
  imports: [
    FaIconComponent
  ],
  templateUrl: './sprint-state-display.component.html',
  styleUrl: './sprint-state-display.component.css'
})
export class SprintStateDisplayComponent {
  protected readonly faRightLong = faRightLong;
  protected readonly SprintState = SprintState;
  protected navigationService: NavigationService = inject(NavigationService)
  protected readonly NavigationService = NavigationService;
}
