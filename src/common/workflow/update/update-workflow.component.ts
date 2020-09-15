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
    function localDataSource(options) {
      var id = options.schema.model.id;
      var data = options.data;
      var newId = -1;
      var created, updated, deleted;

      var dataSource = new kendo.data.DataSource(
        kendo.jQuery.extend(
          true,
          {
            transport: {
              read: function(e) {
                created = {};
                updated = {};
                deleted = {};

                e.success(data || []);
              },

              update: function(e) {
                var item = e.data;
                if (!created[item[id]]) {
                  updated[item[id]] = item;
                }
                e.success();
              },

              destroy: function(e) {
                var idValue = e.data[id];
                if (!created[idValue]) {
                  deleted[idValue] = e.data;
                } else {
                  delete created[idValue];
                }
                e.success();
              },
              create: function(e) {
                var item = e.data;
                item[id] = newId--;
                created[item[id]] = kendo.jQuery.extend(true, {}, item);

                e.success(item);
              }
            }
          },
          options
        )
      );

      dataSource.getChanges = function() {
        return {
          deleted: toArray(deleted),
          created: toArray(created),
          updated: toArray(updated)
        };
      };

      return dataSource;
    }

    function toArray(changes) {
      var result = [];
      for (var id in changes) {
        result.push(changes[id]);
      }
      return result;
    }

    function createDiagram() {
      var shapesDataSource = localDataSource({
        data: [
          {
            Id: 1,
            JobTitle: "President"
          },
          {
            Id: 2,
            JobTitle: "VP Finance",
            Color: "#3399cc"
          },
          {
            Id: 3,
            JobTitle: "VP Customer Relations",
            Color: "#3399cc"
          },
          {
            Id: 4,
            JobTitle: "VP Human Resources",
            Color: "#3399cc"
          }
        ],
        schema: {
          model: {
            id: "Id",
            fields: {
              Id: { type: "number", editable: false },
              JobTitle: { type: "string" },
              Color: { type: "string" }
            }
          }
        }
      });

      var connectionsDataSource = localDataSource({
        data: [
          {
            Id: 1,
            FromShapeId: 1,
            ToShapeId: 2
          },
          {
            Id: 2,
            FromShapeId: 1,
            ToShapeId: 3
          },
          {
            Id: 3,
            FromShapeId: 1,
            ToShapeId: 4
          }
        ],
        schema: {
          model: {
            id: "Id",
            fields: {
              Id: { type: "number", editable: false },
              from: { from: "FromShapeId", type: "number" },
              to: { from: "ToShapeId", type: "number" },
              fromX: { from: "FromPointX", type: "number" },
              fromY: { from: "FromPointY", type: "number" },
              toX: { from: "ToPointX", type: "number" },
              toY: { from: "ToPointY", type: "number" }
            }
          }
        }
      });

      var changesViewModel = kendo.observable({
        showChanges: function() {
          var diagram = kendo.jQuery("#diagram").data("kendoDiagram");
          this.set("shapes", diagram.dataSource.getChanges());
          this.set("connections", diagram.connectionsDataSource.getChanges());
          this.set("visible", true);
        },
        shapes: {
          deleted: [],
          created: [],
          updated: []
        },
        connections: {
          deleted: [],
          created: [],
          updated: []
        }
      });

      kendo.bind(kendo.jQuery("#changes"), changesViewModel);

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

    kendo.jQuery(document).ready(createDiagram);

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
      this.bringIntoView(this.shapes);
    }
  }
}
