import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardHoComponent } from './dashboard/dashboard.component';
import { UploadOrdersComponent } from './upload-orders/upload-orders.component';
import { UploadMslComponent } from './upload-msl/upload-msl.component';
import { HomeHoComponent } from './home-ho/home-ho.component';
import {HoRoutingModule} from './ho-routing.module'
import {SharedModule} from '../shared/shared.module';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';

// import { MaterialModule } from '../material/material.module';
import { FormsModule } from '@angular/forms';
import {NgxPaginationModule} from 'ngx-pagination';
import { FilterPipeModule } from 'ngx-filter-pipe';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
@NgModule({
 
  imports: [
    CommonModule,
    FormsModule,
    HoRoutingModule,
    //  NgxPaginationModule,
    //  FilterPipeModule,
    //  Ng2SearchPipeModule,
     SharedModule,
      BsDatepickerModule.forRoot(),
  ],
  declarations:[
    DashboardHoComponent,
    UploadMslComponent,
    HomeHoComponent,
    UploadOrdersComponent
  ]
})
export class HoModule { }
