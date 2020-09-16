import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule } from "@angular/forms";
import { MatSidenavModule } from "@angular/material/sidenav";
import "@progress/kendo-ui";

import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MatIconModule } from "@angular/material/icon";
import { HttpClientModule } from "@angular/common/http";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatExpansionModule } from "@angular/material/expansion";
import { MatMenuModule } from "@angular/material/menu";
import { MatButtonModule } from "@angular/material/button";
import { MatDividerModule } from "@angular/material/divider";
import { WorkflowService } from "../services/workflow.service";
import { WorkflowToDiagramConverterService } from "../utilities/workflow-to-diagram.converter.service";
import { MatNativeDateModule } from "@angular/material/core";
import { MatListModule } from "@angular/material/list";
import { MatCardModule } from "@angular/material/card";
import { WorkflowListComponent } from "./workflow-list.component";

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    MatToolbarModule,
    MatSidenavModule,
    MatExpansionModule,
    MatMenuModule,
    MatButtonModule,
    MatDividerModule,
    MatIconModule,
    MatNativeDateModule,
    MatListModule,
    MatCardModule
  ],
  declarations: [WorkflowListComponent],
  exports: [WorkflowListComponent],
   providers: [WorkflowService, WorkflowToDiagramConverterService]
})
export class WorkflowListModule {}
