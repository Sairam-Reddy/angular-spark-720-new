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

@Injectable()
export class WorkflowService {
  public usersCollection: AngularFirestoreCollection<User>;
  public workflowCollection: AngularFirestoreCollection<Workflow>;
  public users: Observable<User[]>;
  public workflows: Observable<Workflow[]>;
  constructor(public afs: AngularFirestore) {
    this.usersCollection = this.afs.collection("users");
    this.workflowCollection = this.afs.collection("workflows");
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
  }