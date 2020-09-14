import { Component, AfterViewInit } from "@angular/core";
import { DomSanitizer } from "@angular/platform-browser";
import { MatIconRegistry } from "@angular/material/icon";

declare var kendo: any;

/** @title Implicit main content with two sidenavs */
@Component({
  selector: "draft-workflow",
  templateUrl: "draft-workflow.component.html",
  styleUrls: ["draft-workflow.component.css"]
})
export class DraftWorkflowComponent implements AfterViewInit {
  constructor(iconRegistry: MatIconRegistry, sanitizer: DomSanitizer) {
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
    kendo.jQuery(function() {
      var diagram = kendo
        .jQuery("#diagram")
        .kendoDiagram({
          dataSource: {
            data: [
              {
                items: [{}, {}]
              }
            ],
            schema: {
              model: {
                children: "items"
              }
            }
          },
          shapeDefaults: {
            width: 120,
            height: 120,
            fill: "#8ebc00"
          },
          layout: {
            type: "tree"
          }
        })
        .getKendoDiagram();

      // kendo
      //   .jQuery("#shapesPanelBar")
      //   .kendoPanelBar({
      //     expandMode: "multiple"
      //   })
      //   .getKendoPanelBar();

      kendo.jQuery("#shapesPanelBar").kendoDraggable({
        filter: ".shape-item",
        hint: function(element) {
          return element.clone();
        }
      });

      kendo.jQuery("#diagram").kendoDropTarget({
        drop: function(e) {
          if (e.draggable.hint) {
            var position = diagram.documentToModel({ x: e.pageX, y: e.pageY });
            var targetShape = shapeByPosition(position);

            var item = e.draggable.hint.data("shape");
            var newShape = diagram.addShape(item);
            // diagram.connect(targetShape, newShape);
            diagram.layout(diagram.options.layout);
          }
        }
      });

      function shapeByPosition(position) {
        var shapes = diagram.shapes;
        var shape;
        for (var idx = 0; idx < shapes.length; idx++) {
          shape = shapes[idx];
          if (shape.bounds().contains(position)) {
            return shape;
          }
        }
      }
    });
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
}
