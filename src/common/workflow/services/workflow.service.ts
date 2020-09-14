import { Injectable } from "@angular/core";
import * as firebase from "firebase/app";

import { Observable } from "rxjs";

import "rxjs/add/operator/map";
import { User } from "./models/user";
import { Workflow } from "./models/workflow";
import { WorkflowStep } from "./models/workflow-step";



@Injectable()
export class WorkflowService {
  public usersCollection: AngularFirestoreCollection<User>;
  public workflowCollection: AngularFirestoreCollection<Workflow>;
  public users: Observable<User[]>;
  public workflows: Observable<Workflow[]>;
  constructor(public db: AngularFireDatabase, public afs: AngularFirestore) {
    this.usersCollection = this.afs.collection("users");
    this.workflowCollection = this.afs.collection("workflows");
    this.users = this.usersCollection.snapshotChanges().map(changes => {
      return changes.map(a => {
        const data = a.payload.doc.data() as User;
        data.id = a.payload.doc.id;
        return data;
      });
    });
    this.workflowCollection = this.afs.collection("workflows");
    this.workflows = this.workflowCollection.snapshotChanges().map(changes => {
      return changes.map(a => {
        const data = a.payload.doc.data() as Workflow;
        data.id = a.payload.doc.id;
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
      disciplines: ["disc id3"],
      email: "ramya.athelli@hexagon.com",
      name: "Tom",
      organization: "org2",
      password: "1",
      project: "project id2",
      roles: ["RoleId2"]
    });
    console.log("added");
  }

  addWorkflow() {
    this.workflowCollection.add(<Workflow>{
      name: "Sample Workflow",
      objecttype: {},
      createdBy: "",
      description: "",
      steps: [
        <WorkflowStep>{
          acceptStep: {},
          completionCriteria: "",
          id: "",
          name: "",
          needsClaim: "",
          recipients: [],
          rejectStep: "",
          status: "",
          stepDefination: "",
          completedDate: "",
          completedBy: {},
          targetDate: ""
        }
      ]
    });
  }
}
