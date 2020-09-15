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
        firsLastName: "Antonio Moreno",
        title: "Team Lead",
        colorScheme: "#1696d3",
        items: [
          {
            firsLastName: "Elizabeth Brown",
            title: "Design Lead",
            colorScheme: "#ef6944"
          },
          {
            firsLastName: "Felipe Izquiedro",
            title: "Senior Developer",
            colorScheme: "#75be16"
          }
        ]
      }
    ];

    function visualTemplate(options) {
      var dataviz = kendo.dataviz;
      var g = new dataviz.diagram.Group();
      var dataItem = options.dataItem;

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
          text: dataItem.firsLastName,
          x: 55,
          y: 20,
          fill: "#fff"
        })
      );

      g.append(
        new dataviz.diagram.TextBlock({
          text: dataItem.title,
          x: 55,
          y: 40,
          fill: "#fff"
        })
      );
      return g;
    }

    function createDiagram() {
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

      var contextDataItem;

      kendo.jQuery("#menu").kendoContextMenu({
        target: "#diagram",
        filter: "g",
        open: function(e) {
          if (e.event) {
            try {
              var shapes = diagram.shapes;
              var connections = diagram.connections;

              var point = diagram.documentToModel(
                new kendo.dataviz.diagram.Point(e.event.pageX, e.event.pageY)
              );

              //Cancel the menu opening when the target is a connection
              for (var i = connections.length - 1; i >= 0; i--) {
                if (connections[i].bounds().contains(point)) {
                  e.preventDefault();
                }
              }
              //Find the target shape
              for (var i = shapes.length - 1; i >= 0; i--) {
                if (shapes[i].bounds().contains(point)) {
                  contextDataItem = shapes[i].dataItem;
                  break;
                }
              }
            } catch (e) {
              alert(e);
            }
          }
        },
        select: function(e) {
          var itemText = kendo.jQuery(e.item).text();
          alert(
            kendo.format("{0}: {1}", itemText, contextDataItem.firsLastName)
          );
        }
      });
    }

    kendo.jQuery(document).ready(createDiagram);
  }
}
