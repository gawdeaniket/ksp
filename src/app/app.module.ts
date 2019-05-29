import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import {BranchRoutingModule} from './branch/branch-routing.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MaterialModule } from './material/material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { LoginComponent } from './login/login.component';

// BRANCH COMPONENT
import { DashboardComponent } from '../app/branch/dashboard/dashboard.component';
import { HomebranchComponent } from '../app/branch/homebranch/homebranch.component';
import {ViewallorderComponent} from '../app/branch/viewallorder/viewallorder.component';
import {DownloadinvoiceComponent} from '../app/branch/downloadinvoice/downloadinvoice.component';
import {UploadinvoiceComponent} from './branch/uploadinvoice/uploadinvoice.component';

// ksp

import {KspModule} from './ksp/ksp.module';
import {KspRoutingModule} from './ksp/ksp-routing.module';


//ho
 import {DashboardHoComponent} from './ho/dashboard/dashboard.component';
import {HoRoutingModule} from './ho/ho-routing.module';
import {HoModule} from './ho/ho.module';
import {BranchModule} from './branch/branch.module';
 import {HomeHoComponent} from './ho/home-ho/home-ho.component';
 import {UploadMslComponent} from './ho/upload-msl/upload-msl.component';
 import {UploadOrdersComponent} from './ho/upload-orders/upload-orders.component';




import { HttpClientModule } from '@angular/common/http';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';

import {MulipleSearchPipe} from './shared/pipe/muliple-search.pipe';
import {SearchByDatePipe} from './shared/pipe/search-by-date.pipe';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import {NgxPaginationModule} from 'ngx-pagination';
import { FilterPipeModule } from 'ngx-filter-pipe';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import {BranchUploadInvoiceService} from '../app/services/branch/branch-upload-invoice.service';
import { MultipleSearchAllorderPipe } from './shared/pipe/multiple-search-allorder.pipe';

import {JsonToCsvService} from './services/jsonToCsv/json-to-csv.service';
import { ExcelService } from './services/excel.service';
import { InvoicesearchPipe } from './shared/pipe/invoicesearch.pipe';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    HomebranchComponent,
    ViewallorderComponent,
    DownloadinvoiceComponent,
    UploadinvoiceComponent,
   // InvoiceManagementComponent,
    // SatinInvoiceComponent,
    // UploadInvoiceComponent,
    HomeHoComponent,
    DashboardHoComponent,
    UploadMslComponent,UploadOrdersComponent,
    MulipleSearchPipe,
    SearchByDatePipe,
    MultipleSearchAllorderPipe,
    InvoicesearchPipe
  ],
  imports: [
    BrowserModule,FormsModule,
    
    HoRoutingModule,
    KspModule,
    KspRoutingModule,
    HoModule,
    BranchModule,
  //  BranchRoutingModule,
    AppRoutingModule,
    MaterialModule,
    BrowserAnimationsModule,
    BsDatepickerModule.forRoot(),
    HttpClientModule,
     ReactiveFormsModule, NgxPaginationModule,FilterPipeModule,Ng2SearchPipeModule
  ],
  providers: [
    BranchUploadInvoiceService,ExcelService,JsonToCsvService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
