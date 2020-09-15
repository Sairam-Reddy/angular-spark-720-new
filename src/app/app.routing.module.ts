import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AppComponent } from "./app.component";
import { DashboardComponent } from "../common/dashboard/dashboard.component";
import { DraftWorkflowComponent } from "../common/workflow/draft/draft-workflow.component";

const routes: Routes = [
  {
    path: "",
    component: AppComponent,

    children: [
      {
        path: "workflow",
        component: DraftWorkflowComponent
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
