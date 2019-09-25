
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {DashboardComponent} from './dashboard/dashboard.component';
import {HomebranchComponent} from './homebranch/homebranch.component';
import {ViewallorderComponent} from './viewallorder/viewallorder.component';
import {DownloadinvoiceComponent} from './downloadinvoice/downloadinvoice.component';
import {UploadinvoiceComponent} from './uploadinvoice/uploadinvoice.component';
const routes: Routes = [
  {path:'', component:DashboardComponent, 
  children:[
    { path:'',redirectTo:'homebranch',pathMatch:'full'},
    { path:'homebranch',component:HomebranchComponent },
    { path:'viewallorder',component:ViewallorderComponent },
    { path:'downloadinvoice', component:DownloadinvoiceComponent },
    { path:'uploadinvoice', component:UploadinvoiceComponent }
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [ RouterModule   ]
})
export class BranchRoutingModule { }
