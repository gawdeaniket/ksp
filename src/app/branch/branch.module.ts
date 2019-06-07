import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
//import { DashboardComponent } from './dashboard/dashboard.component';
import {BranchRoutingModule} from  './branch-routing.module';
import {DashboardComponent} from './dashboard/dashboard.component';
import {HomebranchComponent} from './homebranch/homebranch.component';
import {ViewallorderComponent} from './viewallorder/viewallorder.component';
import {DownloadinvoiceComponent} from './downloadinvoice/downloadinvoice.component';
import {UploadinvoiceComponent} from './uploadinvoice/uploadinvoice.component';
 import { MaterialModule } from '../material/material.module';
 import { FormsModule } from '@angular/forms';
 import {NgxPaginationModule} from 'ngx-pagination';
import { FilterPipeModule } from 'ngx-filter-pipe';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import {SearchByDatePipe} from '../shared/pipe/search-by-date.pipe';
import {InvoicesearchPipe} from '../shared/pipe/invoicesearch.pipe';
import {MulipleSearchPipe} from '../shared/pipe/muliple-search.pipe';
import {SharedModule} from '../shared/shared.module';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
@NgModule({
  imports: [
   CommonModule,
    FormsModule,
    BranchRoutingModule,
     MaterialModule,NgxPaginationModule,FilterPipeModule,Ng2SearchPipeModule,SharedModule, BsDatepickerModule.forRoot(),
  ],
  declarations: [
    DashboardComponent,
    HomebranchComponent,
    ViewallorderComponent,
    DownloadinvoiceComponent,
    UploadinvoiceComponent,
  ],
  exports: []
})
export class BranchModule { }
