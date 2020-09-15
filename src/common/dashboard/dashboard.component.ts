import { Component, VERSION } from '@angular/core';

@Component({
  selector: 'dashboard-app',
  templateUrl: './dashboard.component.html',
  styleUrls: [ './dashboard.component.scss' ]
})
export class DashboardComponent  {
  constructor() {
    console.log("dashboard");
  }
  name = 'Angular ' + VERSION.major;
}
