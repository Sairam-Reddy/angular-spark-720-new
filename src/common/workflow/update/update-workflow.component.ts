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
  fileUrl;

  constructor(iconRegistry: MatIconRegistry, private sanitizer: DomSanitizer) {
    iconRegistry.addSvgIcon(
      "new",
      sanitizer.bypassSecurityTrustResourceUrl(
        "https://raw.githubusercontent.com/Sairam-Reddy/angular-spark-720/master/src/content/icons/new.svg"
      )
    );

    iconRegistry.addSvgIcon(
      "open",
      sanitizer.bypassSecurityTrustResourceUrl(
        "https://raw.githubusercontent.com/Sairam-Reddy/angular-spark-720/master/src/content/icons/open.svg"
      )
    );
    iconRegistry.addSvgIcon(
      "save",
      sanitizer.bypassSecurityTrustResourceUrl(
        "https://raw.githubusercontent.com/Sairam-Reddy/angular-spark-720/master/src/content/icons/save.svg"
      )
    );
    iconRegistry.addSvgIcon(
      "undo",
      sanitizer.bypassSecurityTrustResourceUrl(
        "https://raw.githubusercontent.com/Sairam-Reddy/angular-spark-720/master/src/content/icons/undo.svg"
      )
    );
    iconRegistry.addSvgIcon(
      "redo",
      sanitizer.bypassSecurityTrustResourceUrl(
        "https://raw.githubusercontent.com/Sairam-Reddy/angular-spark-720/master/src/content/icons/redo.svg"
      )
    );
  }

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

      kendo.jQuery("#shapesPanelBar").kendoDraggable({
        filter: ".shape-item",
        hint: function(element) {
          return element.clone();
        }
      });

      kendo.jQuery("#diagram").kendoDropTarget({
        drop: function(e) {
          if (e.draggable.hint) {
            var diagram = kendo.jQuery("#diagram").data("kendoDiagram");
            var position = diagram.documentToModel({ x: e.pageX, y: e.pageY });

            // var targetShape = shapeByPosition(position);

            var options = e.draggable.hint.data("shape");
            options.positionX = position.x;
            options.positionY = position.y;

            var shape = createShape(options);
            var newShape = diagram.addShape(shape);
            // diagram.connect(targetShape, newShape);
            diagram.layout(diagram.options.layout);
          }
        }
      });

      function createShape(options) {
        var shapeOptions = {
          id: "ABC",
          x: options.positionX,
          y: options.positionY,
          width: options.width || 100,
          height: options.height || 50,
          type: options.type,
          path: options.path || undefined,
          content: {
            text: options.textData || undefined,
            color: "#fff"
          },
          fill: options.fillColor || "#0088CC",
          connectors: getShapeConnectors(options)
        };

        var shape = new kendo.dataviz.diagram.Shape(shapeOptions);

        return shape;
      }

      function getShapeConnectors(options) {
        var cnctrs = [];
        if (options.type === "circle") {
          cnctrs.push({ name: "bottom" });
        }
        if (options.type === "rectangle") {
          cnctrs.push(
            { name: "bottom", stroke: { dashType: "dash" } },
            { name: "left" },
            { name: "right" }
          );
        }
        if (options.path === "M 50 0 100 50 50 100 0 50 Z") {
          cnctrs.push({ name: "left" }, { name: "right" });
        }
        return cnctrs;
      }
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

  addAdvancedStep(stepName: string) {
    var diagram = kendo.jQuery("#diagram").getKendoDiagram();
    var shapeOptions = {
      id: "ABC",
      x: 200,
      y: 200,
      width: 120,
      height: 120,
      type: "rectangle",
      content: {
        text: stepName,
        color: "#fff"
      },
      fill: "#FFA500",
      connectors: [{ name: "bottom" }, { name: "left" }, { name: "right" }]
    };

    var shape = new kendo.dataviz.diagram.Shape(shapeOptions);
    var newShape = diagram.addShape(shape);
  }

  exportAsPDF() {
    var diagram = kendo.jQuery("#diagram").getKendoDiagram();
    diagram
      .exportPDF({
        paperSize: "auto",
        margin: { left: "1cm", top: "1cm", right: "1cm", bottom: "1cm" }
      })
      .done(function(data) {
        kendo.saveAs({
          dataURI: data,
          fileName: "diagram.pdf",
          proxyURL: "https://demos.telerik.com/kendo-ui/service/export"
        });
      });
  }

  exportAsImage() {
    var diagram = kendo.jQuery("#diagram").getKendoDiagram();
    diagram.exportImage().done(function(data) {
      kendo.saveAs({
        dataURI: data,
        fileName: "diagram.png",
        proxyURL: "https://demos.telerik.com/kendo-ui/service/export"
      });
    });
  }

  reset() {
    var diagram = kendo.jQuery("#diagram").getKendoDiagram();
    diagram.clear();
  }

  undo() {
    var diagram = kendo.jQuery("#diagram").getKendoDiagram();
    diagram.undo();
  }

  redo() {
    var diagram = kendo.jQuery("#diagram").getKendoDiagram();
    diagram.redo();
  }

  saveAsJson() {
    var diagram = kendo.jQuery("#diagram").getKendoDiagram();
    var json = JSON.stringify(diagram.save());
    const blob = new Blob([json], { type: "application/json" });

    this.fileUrl = this.sanitizer.bypassSecurityTrustResourceUrl(
      window.URL.createObjectURL(blob)
    );
  }
}
