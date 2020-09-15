import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AppComponent } from "./app.component";
import { DashboardComponent } from "../common/dashboard/dashboard.component";
import { DraftWorkflowComponent } from "../common/workflow/draft/draft-workflow.component";
import { HomeComponent } from "./home.component";
import { UpdateWorkflowComponent } from "../common/workflow/update/update-workflow.component";

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
        component: UpdateWorkflowComponent
      },
      {
        path: "dashboard",
        component: DashboardComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
