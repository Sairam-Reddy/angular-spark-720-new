import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule } from "@angular/forms";
import "@progress/kendo-ui";

import { AppComponent } from "./app.component";
import { MatToolbarModule } from "@angular/material/toolbar";
import { DraftWorkflowModule } from "../common/workflow/draft/draft-worklfow.module";
import { ViewWorkflowModule } from "../common/workflow/create/view-workflow.module";
import { AngularFireModule } from 'angularfire2'; 
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFirestore } from 'angularfire2/firestore';
import { environment } from './environment';
import { WorkflowService } from "../common/workflow/services/workflow.service";


@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    MatToolbarModule,
    ViewWorkflowModule,
    DraftWorkflowModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule
  ],
  declarations: [AppComponent],
  bootstrap: [AppComponent],
  providers: [AngularFirestore, WorkflowService]
})
export class AppModule {}
