import { Component, AfterViewInit } from "@angular/core";
import { DomSanitizer } from "@angular/platform-browser";
import { MatIconRegistry } from "@angular/material/icon";

declare var kendo: any;

/** @title Implicit main content with two sidenavs */
@Component({
  selector: "update-workflow",
  templateUrl: "update-workflow.component.html",
  styleUrls: ["update-workflow.component.css"]
})
export class UpdateWorkflowComponent implements AfterViewInit {
  ngAfterViewInit() {
    var data = [
      {
        firstName: "Antonio",
        lastName: "Moreno",
        image: "antonio.jpg",
        title: "Team Lead",
        colorScheme: "#1696d3",
        items: [
          {
            firstName: "Elizabeth",
            image: "elizabeth.jpg",
            lastName: "Brown",
            title: "Design Lead",
            colorScheme: "#ef6944",
            items: [
              {
                firstName: "Ann",
                lastName: "Devon",
                image: "ann.jpg",
                title: "UI Designer",
                colorScheme: "#ef6944"
              }
            ]
          },
          {
            firstName: "Diego",
            lastName: "Roel",
            image: "diego.jpg",
            title: "QA Engineer",
            colorScheme: "#ee587b",
            items: [
              {
                firstName: "Fran",
                lastName: "Wilson",
                image: "fran.jpg",
                title: "QA Intern",
                colorScheme: "#ee587b"
              }
            ]
          },
          {
            firstName: "Felipe",
            lastName: "Izquiedro",
            image: "felipe.jpg",
            title: "Senior Developer",
            colorScheme: "#75be16",
            items: [
              {
                firstName: "Daniel",
                lastName: "Tonini",
                image: "daniel.jpg",
                title: "Developer",
                colorScheme: "#75be16"
              }
            ]
          }
        ]
      }
    ];

    function visualTemplate(options) {
      var dataviz = kendo.dataviz;
      var g = new dataviz.diagram.Group();
      var dataItem = options.dataItem;

      g.drawingElement.options.tooltip = {
        content: dataItem.title,
        shared: true
      };

      g.append(
        new dataviz.diagram.Rectangle({
          width: 210,
          height: 75,
          stroke: {
            width: 0
          },
          fill: {
            gradient: {
              type: "linear",
              stops: [
                {
                  color: dataItem.colorScheme,
                  offset: 0,
                  opacity: 0.5
                },
                {
                  color: dataItem.colorScheme,
                  offset: 1,
                  opacity: 1
                }
              ]
            }
          }
        })
      );

      g.append(
        new dataviz.diagram.TextBlock({
          text: dataItem.firstName + " " + dataItem.lastName,
          x: 85,
          y: 30,
          fill: "#fff"
        })
      );

      g.append(
        new dataviz.diagram.Image({
          source: "../content/dataviz/diagram/people/" + dataItem.image,
          x: 3,
          y: 3,
          width: 68,
          height: 68
        })
      );

      return g;
    }

    kendo.jQuery("#diagram").kendoDiagram({
      dataSource: new kendo.data.HierarchicalDataSource({
        data: data,
        schema: {
          model: {
            children: "items"
          }
        }
      }),
      layout: {
        type: "layered"
      },
      shapeDefaults: {
        visual: visualTemplate
      },
      connectionDefaults: {
        stroke: {
          color: "#979797",
          width: 2
        }
      }
    });

    var diagram = kendo.jQuery("#diagram").getKendoDiagram();
    diagram.bringIntoView(diagram.shapes);
  }
}
