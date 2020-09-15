import { Component, VERSION } from '@angular/core';

@Component({
  selector: 'workflow-card',
  templateUrl: './workflow-card.component.html',
  styleUrls: [ './workflow-card.component.scss' ]
})
export class WorkflowCardComponent  {
   constructor() {
    console.log("Home page");
  }
  name = 'Angular ' + VERSION.major;
}
