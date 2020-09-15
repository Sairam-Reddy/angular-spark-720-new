import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule } from "@angular/forms";
import { MatSidenavModule } from "@angular/material/sidenav";
import "@progress/kendo-ui";

import { MatToolbarModule } from "@angular/material/toolbar";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import {MatExpansionModule} from '@angular/material/expansion';
import {MatMenuModule} from '@angular/material/menu';
import { MatButtonModule } from "@angular/material/button";
import {MatDividerModule} from '@angular/material/divider';
import { DraftWorkflowModule } from "../draft/draft-workflow.module";
import { ViewWorkflowComponent } from "./view-workflow.component";
import { WorkflowService } from "../services/workflow.service";
import { WorkflowToDiagramConverterService } from "../utilities/workflow-to-diagram.converter.service";

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    MatToolbarModule,
    MatSidenavModule,
    MatExpansionModule,
    MatMenuModule,
    MatButtonModule,
    MatDividerModule    
  ],
  declarations: [ViewWorkflowComponent],
  exports: [ViewWorkflowComponent],
  providers: [WorkflowService, WorkflowToDiagramConverterService]
})
export class ViewWorkflowModule {}
