import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardHoComponent } from './dashboard/dashboard.component';
import { UploadOrdersComponent } from './upload-orders/upload-orders.component';
import { UploadMslComponent } from './upload-msl/upload-msl.component';
import { HomeHoComponent } from './home-ho/home-ho.component';
import {HoRoutingModule} from './ho-routing.module'
@NgModule({
 imports: [
    CommonModule,HoRoutingModule
  ]
})
export class HoModule { }
