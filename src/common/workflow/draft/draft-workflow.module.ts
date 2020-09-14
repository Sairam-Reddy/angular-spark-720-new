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
import { DraftWorkflowComponent } from "./draft-workflow.component";
import { MatIconModule } from "@angular/material/icon";
import { HttpClientModule } from "@angular/common/http";

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
  declarations: [DraftWorkflowComponent],
  exports: [DraftWorkflowComponent]
})
export class DraftWorkflowModule {}
