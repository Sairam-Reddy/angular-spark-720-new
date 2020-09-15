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
  public getDiagramSource(workflow: Workflow) {
    var data = [];
    var connectionsData = [];

    workflow.steps.forEach((x: WorkflowStep) => {
      var step = {
        id: x.id,
        textData: x.name,
        type: "rectangle",
        positionX: 424.5,
        positionY: 20,
        fillColor: "green",
        width: 50
      };
      data.push(step);

      if (x.acceptStep) {
        var acceptConnection = {
          romShapeId: x.id,
          toShapeId: x.acceptStep
        };
        connectionsData.push(acceptConnection);
      }

      if (x.rejectStep) {
        var rejectConnection = {
          romShapeId: x.id,
          toShapeId: x.rejectStep
        };
        connectionsData.push(rejectConnection);
      }
    });

    return { data: data, connectionsData: connectionsData };
  }
}
