import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import {BranchRoutingModule} from  './branch-routing.module'
@NgModule({
  declarations: [DashboardComponent],
  imports: [
    CommonModule,
    BranchRoutingModule
  ],
  exports: []
})
export class BranchModule { }
