import { Component, OnInit } from "@angular/core";
import { WorkflowService } from "../services/workflow.service";
import { WorkflowStep } from "../models/workflow-step";
import { Route, Router } from "@angular/router";
import { DomSanitizer } from "@angular/platform-browser";
import { MatIconRegistry } from "@angular/material/icon";

@Component({
  selector: "task-list",
  templateUrl: "task-list.component.html",
  styleUrls: ["./task-list.component.scss"]
})

export class TaskListComponent implements OnInit{
  public steps: Array<WorkflowStep>;
  constructor(private workflowService: WorkflowService, private router: Router, private sanitizer: DomSanitizer, private iconRegistry: MatIconRegistry) {
      iconRegistry.addSvgIcon(
      "user",
      sanitizer.bypassSecurityTrustResourceUrl(
        "https://raw.githubusercontent.com/Ramya-06/angular-spark720-homepage/master/src/content/images/user.svg"
      )
    );
  }

public ngOnInit(): void {
  this.getWorkflowStepForUser("Tom");
    console.log(this.steps);
}
public getWorkflowStepForUser(userName: string): void {
 this.workflowService.getWorkflowStepForUser(userName).subscribe((steps: Array<WorkflowStep>) => {
    this.steps = steps;   
 });
}
 
}
