import { Component, OnInit } from "@angular/core";
import { WorkflowService } from "../services/workflow.service";
import { WorkflowStep } from "../models/workflow-step";
import { Route, Router } from "@angular/router";
import { DomSanitizer } from "@angular/platform-browser";
import { MatIconRegistry } from "@angular/material/icon";
import { Workflow } from "../models/workflow";

@Component({
  selector: "workflow-list",
  templateUrl: "workflow-list.component.html",
  styleUrls: ["./workflow-list.component.scss"]
})

export class WorkflowListComponent implements OnInit{
  public workflows: Array<Workflow>;
  constructor(private workflowService: WorkflowService, private router: Router, private sanitizer: DomSanitizer, private iconRegistry: MatIconRegistry) {
      iconRegistry.addSvgIcon(
      "edit",
      sanitizer.bypassSecurityTrustResourceUrl(
        "https://raw.githubusercontent.com/Ramya-06/angular-spark720-homepage/master/src/content/images/edit.svg"
      )
    );
     iconRegistry.addSvgIcon(
      "workflow-list",
      sanitizer.bypassSecurityTrustResourceUrl(
        "https://raw.githubusercontent.com/Ramya-06/angular-spark720-homepage/master/src/content/images/workflow-list.svg"
      )
    );
  }

public ngOnInit(): void {
  this.getWorkflowStepForUser("Tom");
    console.log(this.workflows);
}
public getWorkflowStepForUser(userName: string): void {
 this.workflowService.getWorkflows().subscribe((steps: Array<Workflow>) => {
    this.workflows = steps;   
 });
}
 
}
