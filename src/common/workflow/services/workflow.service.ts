import { Injectable } from "@angular/core";
import * as firebase from "firebase/app";

import { Observable } from "rxjs";
import { map } from 'rxjs/operators';
import {
  AngularFirestore,
  AngularFirestoreCollection
} from "@angular/fire/firestore";
import "rxjs/add/operator/map";
import { User } from "../models/user";
import { Workflow } from "../models/workflow";

@Injectable()
export class WorkflowService {
  public usersCollection: AngularFirestoreCollection<User>;
  public workflowCollection: AngularFirestoreCollection<Workflow>;
  public users: Observable<User[]>;
  public workflows: Observable<Workflow[]>;

  constructor(public afs: AngularFirestore) {
    // this.usersCollection = this.afs.collection("users");
    // this.workflowCollection = this.afs.collection("workflows");

    // this.users = this.afs.collection("users").valueChanges();
    // this.workflows = this.afs.collection("workflows").valueChanges();
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
            roles: [{ name: "", users: [undefined] }],
            id: ""
          },
          targetDate: undefined
        }
      ]
    });
  }
}
