import { Component, VERSION, OnInit } from "@angular/core";
import { Chart } from 'chart.js';

@Component({
  selector: "dashboard-app",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.scss"]
})
export class DashboardComponent implements OnInit {
  doughNutChart: any;

  ngOnInit() {
    this.doughNutChart = new Chart("doughNutCanvas", {
      type: "doughnut",
      data: {
        labels: ["Reviews", "Shipments"],
        datasets: [
          {
            data: [55, 60],
            backgroundColor: ["rgba(255, 0, 0, 1)", "rgba(255, 0, 0, 0.1)"],
            fill: false
          }
        ]
      },
      options: {
        legend: {
          display: true
        },
        tooltips: {
          enabled: true
        }
      }
    });
  }
}
