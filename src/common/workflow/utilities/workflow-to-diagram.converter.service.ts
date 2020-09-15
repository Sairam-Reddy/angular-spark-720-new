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

    workflow.steps.forEach((x: WorkflowStep) => {
      data.push(this.getworkflowStep(x));

      if (x.acceptStep) {
        var acceptConnection = {
          fromShapeId: x.id,
          toShapeId: x.acceptStep
        };
        connectionsData.push(acceptConnection);
      }

      if (x.rejectStep) {
        var rejectConnection = {
          fromShapeId: x.id,
          toShapeId: x.rejectStep
        };
        connectionsData.push(rejectConnection);
      }
    });

    return { data: data, connectionsData: connectionsData };
  }

  getworkflowStep(wfStep: WorkflowStep) {
    var step: any = {
      id: wfStep.id,
      textData: wfStep.name,
      width: 60,
      positionX: 424.5,
      positionY: 20
    };

    if (wfStep.acceptStep && wfStep.rejectStep) {
      step.type = undefined;
      step.path = "M 50 0 100 50 50 100 0 50 Z";
      step.fillColor = "#f2bf25";
    }

    if (!wfStep.rejectStep) {
      (step.type = "rectangle"), (step.fillColor = "#f2bf25");
    }

    return step;
  }
}
