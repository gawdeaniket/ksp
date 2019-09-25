import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {InvoicesearchPipe} from './pipe/invoicesearch.pipe';
import {MulipleSearchPipe} from './pipe/muliple-search.pipe';
import {MultipleSearchAllorderPipe} from './pipe/multiple-search-allorder.pipe';
import {SearchByDatePipe} from './pipe/search-by-date.pipe';

import { MaterialModule } from '../material/material.module';
import {NgxPaginationModule} from 'ngx-pagination';
import { FilterPipeModule } from 'ngx-filter-pipe';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { MutipleSearchMslPipe } from './pipe/mutiple-search-msl.pipe';
import {HeaderComponent} from '../shared/components/header/header.component';
import { RouterModule } from '@angular/router';
@NgModule({
  declarations: [
    MulipleSearchPipe,
    MultipleSearchAllorderPipe,
    SearchByDatePipe,
    InvoicesearchPipe,
    MutipleSearchMslPipe,
    HeaderComponent
  ],
  imports: [
    RouterModule,
    CommonModule
  ],
  exports:[
    MutipleSearchMslPipe,
    InvoicesearchPipe,
    MulipleSearchPipe,
    MultipleSearchAllorderPipe,
    SearchByDatePipe,
    NgxPaginationModule,
    FilterPipeModule,
    Ng2SearchPipeModule,
    MaterialModule,
    HeaderComponent
  ]
})
export class SharedModule { }
