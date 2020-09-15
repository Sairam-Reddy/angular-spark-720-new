import { Injectable } from "@angular/core";
import * as firebase from "firebase/app";

import { Observable } from "rxjs";
import {
  AngularFirestore,
  AngularFirestoreCollection
} from "@angular/fire/firestore";
import "rxjs/add/operator/map";

import { User } from "../models/user";
import { Workflow } from "../models/workflow";
import { WorkflowStep } from "../models/workflow-step";

@Injectable()
export class WorkflowToDiagramConverterService {
  constructor(public afs: AngularFirestore) {}

  getDiagramSource(workflow: Workflow) {
    var data = [];
    var connectionsData = [];

    workflow.steps.forEach((x: WorkflowStep, index: number) => {
      data.push(this.getworkflowStep(x, index));

      if (x.acceptStep) {
        var acceptConnection = {
          id: index.toString,
          fromShapeId: x.id,
          toShapeId: x.acceptStep,
          color: "#008000",
          from: x.rejectStep ? "left" : "bottom",
          to: "top"
          // text: "Accept"
        };
        connectionsData.push(acceptConnection);
      }

      if (x.rejectStep) {
        var rejectConnection = {
          id: index.toString,
          fromShapeId: x.id,
          toShapeId: x.rejectStep,
          color: "#FF0000",
          from: x.rejectStep ? "right" : "bottom",
          to: "top"
          // text: "Reject"
        };
        connectionsData.push(rejectConnection);
      }
    });

    return { data: data, connectionsData: connectionsData };
  }

  getworkflowStep(wfStep: WorkflowStep, i: number) {
    var step: any = {
      id: wfStep.id,
      textData: wfStep.name,
      width: 120,
      height: 120,
      positionX: 300,
      positionY: i * 150
    };

    if (wfStep.acceptStep && wfStep.rejectStep) {
      step.type = undefined;
      step.path = "M 50 0 100 50 50 100 0 50 Z";
      step.fillColor = "#f2bf25";
      step.height = 90;
    }

    if (!wfStep.rejectStep) {
      step.type = "rectangle";
      step.fillColor = "#0088CC";
    }

    return step;
  }
}
