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
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';

@NgModule({
  declarations: [
    MulipleSearchPipe,
    MultipleSearchAllorderPipe,
    SearchByDatePipe,
    InvoicesearchPipe
  ],
  imports: [
    // NgxPaginationModule,
    // FilterPipeModule,
    // Ng2SearchPipeModule,
    // MaterialModule,
    // BsDatepickerModule.forRoot()
    
    
  ],
  exports:[
    
    InvoicesearchPipe,
    MulipleSearchPipe,
    MultipleSearchAllorderPipe,
    SearchByDatePipe,
    NgxPaginationModule,
    FilterPipeModule,
    Ng2SearchPipeModule,
    MaterialModule,
    
  ]
})
export class SharedModule { }
