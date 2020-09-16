import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AppComponent } from "./app.component";
import { DashboardComponent } from "../common/dashboard/dashboard.component";
import { DraftWorkflowComponent } from "../common/workflow/draft/draft-workflow.component";
import { HomeComponent } from "./home.component";
import { UpdateWorkflowComponent } from "../common/workflow/update/update-workflow.component";
import { ViewWorkflowComponent } from "../common/workflow/view/view-workflow.component";
import { TaskListComponent } from "../common/workflow/task-list/task-list.component";
import { WorkflowListComponent } from "../common/workflow/workflow-list/workflow-list.component";

const routes: Routes = [
  {
    path: "home",
    children: [
      {
        path: "",
        component: HomeComponent
      },

      {
        path: "create-workflow",
        component: DraftWorkflowComponent
      },
      {
        path: "update-workflow",
        component: WorkflowListComponent
      },
      {
        path: "view-workflow",
        component: ViewWorkflowComponent
      },
      {
        path: "dashboard",
        component: DashboardComponent
      },
      {
        path: "task-list",
        component: TaskListComponent
      },
       {
        path: "workflow-list",
        component: WorkflowListComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
