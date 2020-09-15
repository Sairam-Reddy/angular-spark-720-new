import { Component, AfterViewInit, OnInit } from "@angular/core";
import { WorkflowService } from "../services/workflow.service";
import { Workflow } from "../models/workflow";
import { WorkflowToDiagramConverterService } from "../utilities/workflow-to-diagram.converter.service";

declare var kendo: any;

/** @title Implicit main content with two sidenavs */
@Component({
  selector: "view-workflow",
  templateUrl: "view-workflow.component.html",
  styleUrls: ["view-workflow.component.css"]
})
export class ViewWorkflowComponent implements OnInit {
  constructor(
    private worflowService: WorkflowService,
    private workflowToDiagramConverterService: WorkflowToDiagramConverterService
  ) {}

  public workflow: Workflow;

  ngOnInit() {
    this.worflowService.getUsers().subscribe(items => {
      console.log(items);
    });
    this.worflowService.getWorkflows().subscribe(items => {
      this.workflow = items[0];

      this.drawWorkflowDiagram(
        this.workflowToDiagramConverterService.getDiagramSource(this.workflow)
      );
    });
  }

  drawWorkflowDiagram(workflowOptions: any) {
    kendo.jQuery(function() {
      var diagram = kendo
        .jQuery("#diagram")
        .kendoDiagram({
          connectionDefaults: {
            endCap: {
              type: "ArrowEnd",
              fill: {
                color: "#222222"
              }
            },
            hover: {
              stroke: {
                color: "#02DA10",
                fill: "#02DA10"
              }
            }
          }
        })
        .getKendoDiagram();

      function createShape(options) {
        var shapeOptions = {
          id: options.id,
          x: options.positionX,
          y: options.positionY,
          width: options.width || 100,
          height: options.height || 50,
          type: options.type,
          path: options.path || undefined,
          content: {
            text: options.textData || undefined,
            color: options.textData.length > 15 ? "transparent" : "#fff"
          },
          fill: options.fillColor || "#0088CC"
        };

        var shape = new kendo.dataviz.diagram.Shape(shapeOptions);

        return shape;
      }

      var data = workflowOptions.data;
      var connectionsData = workflowOptions.connectionsData;

      for (var i = 0; i < data.length; i++) {
        diagram.addShape(createShape(data[i]));
      }

      for (var j = 0; j < connectionsData.length; j++) {
        var sourceShape = diagram.getShapeById(connectionsData[j].fromShapeId);
        var targetShape = diagram.getShapeById(connectionsData[j].toShapeId);
        diagram.connect(sourceShape, targetShape, {
          content: {
            text: connectionsData[j].text
          },
          stroke: {
            color: connectionsData[j].color
          }
        });
      }
    });
  }
}
