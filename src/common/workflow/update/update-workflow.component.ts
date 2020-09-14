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
    function visualTemplate(options) {
      var dataviz = kendo.dataviz;
      var g = new dataviz.diagram.Group();
      var dataItem = options.dataItem;

      if (dataItem.JobTitle === "President") {
        g.append(
          new dataviz.diagram.Circle({
            radius: 60,
            stroke: {
              width: 2,
              color: dataItem.Color || "#586477"
            },
            fill: "#e8eff7"
          })
        );
      } else {
        g.append(
          new dataviz.diagram.Rectangle({
            width: 240,
            height: 67,
            stroke: {
              width: 0
            },
            fill: "#e8eff7"
          })
        );

        g.append(
          new dataviz.diagram.Rectangle({
            width: 8,
            height: 67,
            fill: dataItem.Color,
            stroke: {
              width: 0
            }
          })
        );
      }

      return g;
    }

    function onDataBound(e) {
      var that = this;
      setTimeout(function() {
        that.bringIntoView(that.shapes);
      }, 0);
    }

    function createDiagram() {
      var serviceRoot = "https://demos.telerik.com/kendo-ui/service";

      var shapesDataSource = {
        batch: false,
        transport: {
          read: {
            url: serviceRoot + "/DiagramShapes",
            dataType: "jsonp"
          },
          update: {
            url: serviceRoot + "/DiagramShapes/Update",
            dataType: "jsonp"
          },
          destroy: {
            url: serviceRoot + "/DiagramShapes/Destroy",
            dataType: "jsonp"
          },
          create: {
            url: serviceRoot + "/DiagramShapes/Create",
            dataType: "jsonp"
          },
          parameterMap: function(options, operation) {
            if (operation !== "read") {
              return { models: kendo.stringify(options.models || [options]) };
            }
          }
        },
        schema: {
          model: {
            id: "id",
            fields: {
              id: { from: "Id", type: "number", editable: false },
              JobTitle: { type: "string" },
              Color: { type: "string" }
            }
          }
        }
      };

      var connectionsDataSource = {
        batch: false,
        transport: {
          read: {
            url: serviceRoot + "/DiagramConnections",
            dataType: "jsonp"
          },
          update: {
            url: serviceRoot + "/DiagramConnections/Update",
            dataType: "jsonp"
          },
          destroy: {
            url: serviceRoot + "/DiagramConnections/Destroy",
            dataType: "jsonp"
          },
          create: {
            url: serviceRoot + "/DiagramConnections/Create",
            dataType: "jsonp"
          },
          parameterMap: function(options, operation) {
            if (operation !== "read") {
              return { models: kendo.stringify(options.models || [options]) };
            }
          }
        },
        schema: {
          model: {
            id: "id",
            fields: {
              id: { from: "Id", type: "number", editable: false },
              from: { from: "FromShapeId", type: "number" },
              to: { from: "ToShapeId", type: "number" },
              fromX: { from: "FromPointX", type: "number" },
              fromY: { from: "FromPointY", type: "number" },
              toX: { from: "ToPointX", type: "number" },
              toY: { from: "ToPointY", type: "number" }
            }
          }
        }
      };

      kendo.jQuery("#diagram").kendoDiagram({
        dataSource: shapesDataSource,
        connectionsDataSource: connectionsDataSource,
        layout: {
          type: "tree",
          subtype: "tipover",
          underneathHorizontalOffset: 140
        },
        shapeDefaults: {
          visual: visualTemplate,
          content: {
            template: "#= dataItem.JobTitle #",
            fontSize: 17
          }
        },
        connectionDefaults: {
          stroke: {
            color: "#586477",
            width: 2
          }
        },
        dataBound: onDataBound
      });
    }
  }
}
