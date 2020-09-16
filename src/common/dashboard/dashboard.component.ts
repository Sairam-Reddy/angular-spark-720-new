import { Component, VERSION, OnInit } from "@angular/core";
import { Chart } from "chart.js";

@Component({
  selector: "dashboard-app",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.scss"]
})
export class DashboardComponent implements OnInit {

public projects = ["Project - A", "Project - B"];
public selected = "Project - A";

public workflows = ["Review Workflow", "Product Life Cycle"];
public selectedWF = "Review Workflow";

public users = ["Sam", "Susan", "Tom"];
public selectedUser = "Sam";

  doughNutChart: any;
  barChart: any;
  pieChart: any;

  ngOnInit() {
    this.doughNutChart = new Chart("doughNutCanvas", {
      type: "doughnut",
      data: {
        labels: ["Reviews", "Shipments", "Assignements"],
        datasets: [
          {
            data: [55, 60, 25],
            backgroundColor: ["#579CEE", "#DF7C2F", "#0FF381"],
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
        },
         title: {
          display: true,
          text: "Workflow Objects"
        },
      }
    });

    this.pieChart = new Chart("pieCanvas", {
      type: "pie",
      data: {
        labels: ["Reviews", "Shipments", "Assignements"],
        datasets: [
          {
            data: [5, 12, 8],
            backgroundColor: ["#0FD4F3", "#DE0FF3", "#9DF30F"],
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
        },
         title: {
          display: true,
          text: "Active Workflow Tasks"
        },
      }
    });




    var barChartData = {
      labels: ["Susan", "Vijay", "Tom", "Sam"],
      datasets: [
        {
          label: "Active",
          backgroundColor: "#1267CD",
          data: [20, 15, 20, 25]
        },
        {
          label: "Over Due",
          backgroundColor: "#CD3912",
          data: [5, 5, 8, 3]
        }
      ]
    };

    this.barChart = new Chart("barCanvas", {
      type: "bar",
      data: barChartData,
      options: {
        title: {
          display: true,
          text: "Tasks - Over Due/Active"
        },
        tooltips: {
          mode: "index",
          intersect: false
        },
        responsive: true,
        scales: {
          yAxes: [
            {
              type: "linear", // only linear but allow scale type registration. This allows extensions to exist solely for log scale for instance
              display: true,
              position: "left",
              id: "y-axis-1"
            },
            {
              type: "linear", // only linear but allow scale type registration. This allows extensions to exist solely for log scale for instance
              display: true,
              position: "right",
              id: "y-axis-2",
              gridLines: {
                drawOnChartArea: false
              }
            }
          ]
        }
      }
    });
  }
}
