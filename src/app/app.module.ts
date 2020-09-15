import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule } from "@angular/forms";
import "@progress/kendo-ui";

import { AppComponent } from "./app.component";
import { MatToolbarModule } from "@angular/material/toolbar";
import { DraftWorkflowModule } from "../common/workflow/draft/draft-workflow.module";
import { ViewWorkflowModule } from "../common/workflow/view/view-workflow.module";
import { environment } from "./environment";

// 1. Import the libs you need
import { AngularFireModule } from "@angular/fire";
import { AngularFirestoreModule } from "@angular/fire/firestore";
import { AngularFireStorageModule } from "@angular/fire/storage";
import { AngularFireAuthModule } from "@angular/fire/auth";
import { UpdateWorkflowModule } from "../common/workflow/update/update-workflow.module";
import { AppRoutingModule } from "./app.routing.module";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MatCardModule } from "@angular/material/card";
import { MatIconModule } from "@angular/material/icon";
import { HttpClientModule } from "@angular/common/http";

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    MatToolbarModule,
    ViewWorkflowModule,
    DraftWorkflowModule,
    UpdateWorkflowModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireStorageModule,
    AppRoutingModule,
    MatCardModule,
    MatIconModule,
    HttpClientModule,
    BrowserAnimationsModule
  ],
  declarations: [AppComponent],
  bootstrap: [AppComponent]
})
export class AppModule {}
