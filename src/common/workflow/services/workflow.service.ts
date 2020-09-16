import { Injectable } from "@angular/core";
import * as firebase from "firebase/app";

import { Observable, of } from "rxjs";
import {
  AngularFirestore,
  AngularFirestoreCollection
} from "@angular/fire/firestore";
import "rxjs/add/operator/map";

import { User } from "../models/user";
import { Workflow } from "../models/workflow";
import { WorkflowStep } from "../models/workflow-step";

@Injectable()
export class WorkflowService {
  public usersCollection: AngularFirestoreCollection<User>;
  public workflowCollection: AngularFirestoreCollection<Workflow>;
   public workflowInstanceCollection: AngularFirestoreCollection<Workflow>;
  public users: Observable<User[]>;
  public workflowInstances: Observable<Workflow[]>;
   public workflows: Observable<Workflow[]>;
  constructor(public afs: AngularFirestore) {
    this.usersCollection = this.afs.collection("users");
    this.workflowCollection = this.afs.collection("workflows");
    this.workflowInstanceCollection = this.afs.collection("workflowInstances");
    this.users = this.usersCollection.snapshotChanges().map(changes => {
      return changes.map(a => {
        const data = a.payload.doc.data() as User;
        // data.id = a.payload.doc.id;
        return data;
      });
    });
    this.workflowCollection = this.afs.collection("workflows");
    this.workflows = this.workflowCollection.snapshotChanges().map(changes => {
      return changes.map(a => {
        const data = a.payload.doc.data() as Workflow;
        // data.id = a.payload.doc.id;
        return data;
      });
    });
      this.workflowInstances = this.workflowInstanceCollection.snapshotChanges().map(changes => {
      return changes.map(a => {
        const data = a.payload.doc.data() as Workflow;
        // data.id = a.payload.doc.id;
        return data;
      });
    });
  }

  getUsers() {
    return this.users;
  }
  getWorkflows() {
    return this.workflows;
  }
  addUser() {
    this.usersCollection.add(<User>{
      disciplines: [{ name: "" }],
      email: "ramya.athelli@hexagon.com",
      name: "Tom",
      organization: { name: "" },
      password: "1",
      project: { name: "", disciplines: undefined, status: "" },
      roles: [{ name: "", users: [undefined] }]
    });
    console.log("added");
  }

  addWorkflow() {
    this.workflowCollection.add(<Workflow>{
      name: "Sample Workflow",
      objecttype: { name: "" },
      createdBy: "",
      description: "",
      steps: [
        {
          acceptStep: "",
          completionCriteria: "",
          id: "",
          name: "",
          needsClaim: false,
          recipients: [],
          rejectStep: "",
          status: "",
          stepDefination: "",
          completedDate: undefined,
          completedBy: {
            disciplines: [{ name: "" }],
            email: "ramya.athelli@hexagon.com",
            name: "Tom",
            organization: { name: "" },
            password: "1",
            project: { name: "", disciplines: undefined, status: "" },
            roles: [{ name: "", users: [undefined] }]
          },
          targetDate: undefined
        }
      ]
    });
  }

  public getWorkflowStepForUser(
    userName: string
  ): Observable<Array<WorkflowStep>> {
    let userSteps: Array<WorkflowStep> = [];
    this.workflowInstances.subscribe((workflows: Array<Workflow>) => {
      workflows.forEach((workflow: Workflow) => {
        const result: Array<WorkflowStep> = workflow.steps.filter(
          (step: WorkflowStep) => {
           return step.status === "RS" && step.recipients.includes(userName);
          }          
        );
        userSteps.push(...result);
       
      });
      return of(userSteps);
    });
    return of(userSteps);
  }
}
