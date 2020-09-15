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
    kendo.jQuery("#diagram").kendoDiagram({
      dataSource: {
        data: [
          { id: 1, jobTitle: "President" },
          { id: 2, jobTitle: "VP Finance" }
        ],
        schema: {
          model: {
            id: "id",
            fields: {
              jobTitle: { type: "string" }
            }
          }
        }
      },
      connectionsDataSource: {
        data: [{ id: 1, from: 1, to: 2 }]
      },
      layout: {
        type: "tree",
        subtype: "tipover",
        underneathHorizontalOffset: 140
      },
      edit: onEdit
    });

    function onEdit(e) {
      console.log("Editing shape with model id: " + e.shape.id);
    }
  }
}
