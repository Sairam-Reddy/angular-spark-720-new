import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule } from "@angular/forms";
import { MatSidenavModule } from "@angular/material/sidenav";
import "@progress/kendo-ui";

import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MatIconModule } from "@angular/material/icon";
import { HttpClientModule } from "@angular/common/http";
import { UpdateWorkflowComponent } from "./update-workflow.component";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatExpansionModule } from "@angular/material/expansion";
import { MatMenuModule } from "@angular/material/menu";
import { MatButtonModule } from "@angular/material/button";
import { MatDividerModule } from "@angular/material/divider";
import { WorkflowService } from "../services/workflow.service";
import { WorkflowToDiagramConverterService } from "../utilities/workflow-to-diagram.converter.service";

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
    MatIconModule   
  ],
  declarations: [UpdateWorkflowComponent],
  exports: [UpdateWorkflowComponent],
   providers: [WorkflowService, WorkflowToDiagramConverterService]
})
export class UpdateWorkflowModule {}
