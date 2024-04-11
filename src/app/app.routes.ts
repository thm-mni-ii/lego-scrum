import { Routes } from '@angular/router';
import {SprintDisplayComponent} from "./sprint-display/sprint-display.component";
import {SprintNumber} from "../model/SprintNumber";
import {SprintState} from "../model/SprintState";

export const routes: Routes = [
  {path: '', redirectTo: `sprint/${SprintNumber.sprint1}/${SprintState.planning}`, pathMatch: "full"},
  {path: 'sprint/:sprintNumber/:sprintState', component: SprintDisplayComponent},
];
