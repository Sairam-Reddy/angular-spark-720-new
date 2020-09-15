import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import {MatCardModule} from '@angular/material/card';
import { DashboardComponent } from './dashboard.component';
import { DashboardRoutingModule } from './dashboard.routing.module';

@NgModule({
  imports:      [ DashboardRoutingModule,BrowserModule, FormsModule, MatCardModule ],
  declarations: [ DashboardComponent ]
})
export class DashboardModule{}