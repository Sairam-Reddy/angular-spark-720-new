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

    workflow.steps.forEach((x: WorkflowStep) => {
      var step = {
        id: x.id,
        textData: x.name,
        type: "circle",
        positionX: 424.5,
        positionY: 20,
        fillColor: "green",
        width: 50
      };
    });
    //   {
    //     id: 1,
    //     textData: "Start",
    //     type: "circle",
    //     positionX: 424.5,
    //     positionY: 20,
    //     fillColor: "green",
    //     width: 50
    //   },
    //   {
    //     id: 2,
    //     textData: "State 1",
    //     type: "rectangle",
    //     positionX: 400,
    //     positionY: 125,
    //     height: 100,
    //     width: 100,
    //     path: "M 50 0 100 50 50 100 0 50 Z"
    //   },
    //   {
    //     id: 3,
    //     textData: "Completed?",
    //     type: "circle",
    //     positionX: 399.5,
    //     positionY: 290
    //   }
    // ];
  }
}
