import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import {MatCardModule} from '@angular/material/card';
import { DashboardComponent } from './dashboard.component';
import { DashboardRoutingModule } from './dashboard.routing.module';
import { MatToolbarModule } from '@angular/material/toolbar';

@NgModule({
  imports:      [ DashboardRoutingModule,BrowserModule, FormsModule, MatCardModule, MatToolbarModule ],
  declarations: [ DashboardComponent ]
})
export class DashboardModule{}