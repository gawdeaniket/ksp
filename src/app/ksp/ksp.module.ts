import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material/material.module';
import { FormsModule } from '@angular/forms';
import {KspRoutingModule} from '../ksp/ksp-routing.module';
import { InvoiceManagementComponent } from './invoice-management/invoice-management.component';
import { SatinInvoiceComponent } from './satin-invoice/satin-invoice.component';
import { UploadInvoiceComponent } from './upload-invoice/upload-invoice.component';

import {SharedModule} from '../shared/shared.module';
@NgModule({
  declarations: [
    InvoiceManagementComponent,
    SatinInvoiceComponent,
    UploadInvoiceComponent
    ],
  imports: [
    CommonModule,
    KspRoutingModule,
    SharedModule

  ]
})
export class KspModule { }
