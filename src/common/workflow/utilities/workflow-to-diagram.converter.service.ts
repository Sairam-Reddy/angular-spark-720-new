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

  getDiagramSource(workflow: Workflow, users: Array<User>) {
    var data = [];
    var connectionsData = [];

    workflow.steps.forEach((x: WorkflowStep, index: number) => {
      data.push(this.getworkflowStep(x, index, users));

      if (x.acceptStep) {
        var acceptConnection = {
          id: Math.random(),
          fromShapeId: x.id,
          toShapeId: x.acceptStep,
          color: "#008000",
          from: x.id,
          to: x.acceptStep
          // from: x.rejectStep ? "left" : "bottom",
          // to: "top"
          // text: "Accept"
        };
        connectionsData.push(acceptConnection);
      }

      if (x.rejectStep) {
        var rejectConnection = {
          id: Math.random(),
          fromShapeId: x.id,
          toShapeId: x.rejectStep,
          color: "#FF0000",
          from: x.id,
          to: x.rejectStep
          // from: x.rejectStep ? "right" : "bottom",
          // to: "top"
          // text: "Reject"
        };
        connectionsData.push(rejectConnection);
      }
    });

    return { data: data, connectionsData: connectionsData };
  }

  getworkflowStep(wfStep: WorkflowStep, i: number, users: Array<User>) {
    var step: any = {
      id: wfStep.id,
      text: wfStep.name,
      width: 120,
      height: 120,
      positionX: 300,
      positionY: i * 150
    };

    step.recipients = [];
    step.advancedFunction = "";

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

    if (wfStep.recipients) {
      wfStep.recipients.forEach((x: string) => {
        const user: User = users.find((y: User) => x === y.name);
        step.recipients.push(user.name);
      });
    }

    if (wfStep.stepDefination) {
      step.stepDefinition = wfStep.stepDefination;
    }

    if (wfStep.targetDate) {
      step.targetDate = wfStep.targetDate;
    }

    return step;
  }
}
