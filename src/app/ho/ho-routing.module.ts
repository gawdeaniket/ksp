import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import {DashboardHoComponent} from '../ho/dashboard/dashboard.component';
import {UploadMslComponent} from '../ho/upload-msl/upload-msl.component';
import {UploadOrdersComponent} from '../ho/upload-orders/upload-orders.component';
import {HomeHoComponent} from '../ho/home-ho/home-ho.component';
import {BranchEditComponent} from './branch-edit/branch-edit.component';
const routes: Routes = [
  {path:'', component:DashboardHoComponent,
  
  children:[
  {
    path:'', redirectTo:'HO_Home',pathMatch:'full'
  },
  {
   path:'HO_Home',component:HomeHoComponent 
  },
  {
   path:'uploadMsl',component:UploadMslComponent
  },
  {
    path:'ApproveOrders', component:UploadOrdersComponent
  },
  {
    path:'branchEdit', component:BranchEditComponent
  }
]}
 

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [ RouterModule   ]
  
})
export class HoRoutingModule { }
