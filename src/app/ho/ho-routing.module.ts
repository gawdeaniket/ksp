import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import {DashboardHoComponent} from '../ho/dashboard/dashboard.component';
import {UploadMslComponent} from '../ho/upload-msl/upload-msl.component';
import {UploadOrdersComponent} from '../ho/upload-orders/upload-orders.component';
import {HomeHoComponent} from '../ho/home-ho/home-ho.component';
const routes: Routes = [
  {path:'dashboardHo', component:DashboardHoComponent,
  
    children:[
    {
      path:'', component:HomeHoComponent,outlet:'m3'
    },
    {
     path:'homeho',component:HomeHoComponent, outlet:'m3'
    },
    {
     path:'uploadMsl',component:UploadMslComponent, outlet:'m3'
    },
    {
      path:'uploadOrders', component:UploadOrdersComponent,outlet:'m3'
    }
]},
 

];

@NgModule({
  imports: [RouterModule.forChild(routes),CommonModule],
  exports: [ RouterModule   ]
  
})
export class HoRoutingModule { }
