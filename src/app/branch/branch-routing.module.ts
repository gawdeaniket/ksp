
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {DashboardComponent} from './dashboard/dashboard.component';
import {HomebranchComponent} from './homebranch/homebranch.component';
import {ViewallorderComponent} from './viewallorder/viewallorder.component';
import {DownloadinvoiceComponent} from './downloadinvoice/downloadinvoice.component';
import {UploadinvoiceComponent} from './uploadinvoice/uploadinvoice.component';


const routes: Routes = [
   {path:'dashboard', component:DashboardComponent,
   
     children:[
     {
       path:'', component:HomebranchComponent,outlet:'m2'
     },
     {
      path:'homebranch',component:HomebranchComponent, outlet:'m2'
     },
     {
      path:'viewallorder',component:ViewallorderComponent, outlet:'m2'
     },
     {
       path:'downloadinvoice', component:DownloadinvoiceComponent,outlet:'m2'
     },
     {
       path:'uploadinvoice', component:UploadinvoiceComponent,outlet:'m2'
     }
 ]},
  

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [ RouterModule   ]
})
export class BranchRoutingModule { }
