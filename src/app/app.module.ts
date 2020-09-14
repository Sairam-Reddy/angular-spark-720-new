import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule } from "@angular/forms";
import "@progress/kendo-ui";

import { AppComponent } from "./app.component";
import { MatToolbarModule } from "@angular/material/toolbar";
import { DraftWorkflowModule } from "../common/workflow/draft/draft-workflow.module";
import { ViewWorkflowModule } from "../common/workflow/view/view-workflow.module";
import { environment } from './environment';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    MatToolbarModule,
    ViewWorkflowModule,
    DraftWorkflowModule
  ],
  declarations: [AppComponent],
  bootstrap: [AppComponent]
})
export class AppModule {}
