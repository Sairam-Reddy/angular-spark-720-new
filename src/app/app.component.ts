import { Component, ViewChild, ElementRef, AfterViewInit } from "@angular/core";

declare var kendo: any;

@Component({
  selector: "my-app",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent {
  // ngAfterViewInit() {
  //   var diagram = kendo
  //     .jQuery("#diagram")
  //     .kendoDiagram({
  //       connectionDefaults: {
  //         endCap: {
  //           type: "ArrowEnd",
  //           fill: {
  //             color: "#222222"
  //           }
  //         },
  //         hover: {
  //           stroke: {
  //             color: "#02DA10",
  //             fill: "#02DA10"
  //           }
  //         }
  //       }
  //     })
  //     .getKendoDiagram();

  //   function createShape(options) {
  //     var shapeOptions = {
  //       id: options.id,
  //       x: options.positionX,
  //       y: options.positionY,
  //       width: options.width || 100,
  //       height: options.height || 50,
  //       type: options.type,
  //       path: options.path || undefined,
  //       content: {
  //         text: options.textData || undefined,
  //         color: options.textData.length > 15 ? "transparent" : "#fff"
  //       },
  //       fill: options.fillColor || "#0088CC"
  //     };

  //     var shape = new kendo.dataviz.diagram.Shape(shapeOptions);

  //     return shape;
  //   }

  //   var data = [
  //     {
  //       id: 1,
  //       textData: "Start",
  //       type: "circle",
  //       positionX: 424.5,
  //       positionY: 20,
  //       fillColor: "green",
  //       width: 50
  //     },
  //     {
  //       id: 2,
  //       textData: "State 1",
  //       type: "rectangle",
  //       positionX: 400,
  //       positionY: 125,
  //       height: 100,
  //       width: 100,
  //       path: "M 50 0 100 50 50 100 0 50 Z"
  //     },
  //     {
  //       id: 3,
  //       textData: "Completed?",
  //       type: "circle",
  //       positionX: 399.5,
  //       positionY: 290
  //     }
  //   ];

  //   var connectionsData = [
  //     {
  //       fromShapeId: 1,
  //       toShapeId: 2
  //     },
  //     {
  //       fromShapeId: 2,
  //       toShapeId: 3
  //     },
  //     {
  //       fromShapeId: 3,
  //       toShapeId: 1
  //     }
  //   ];

  //   for (var i = 0; i < data.length; i++) {
  //     diagram.addShape(createShape(data[i]));
  //   }

  //   for (var j = 0; j < connectionsData.length; j++) {
  //     var sourceShape = diagram.getShapeById(connectionsData[j].fromShapeId);
  //     var targetShape = diagram.getShapeById(connectionsData[j].toShapeId);
  //     diagram.connect(sourceShape, targetShape);
  //   }
  // }

  
}
