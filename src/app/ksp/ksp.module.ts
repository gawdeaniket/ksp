import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {KspRoutingModule} from '../ksp/ksp-routing.module';
import { InvoiceManagementComponent } from './invoice-management/invoice-management.component';
import { SatinInvoiceComponent } from './satin-invoice/satin-invoice.component';
import { UploadInvoiceComponent } from './upload-invoice/upload-invoice.component';
import { MaterialModule } from '../material/material.module';
@NgModule({
  declarations: [InvoiceManagementComponent,
     SatinInvoiceComponent,
      UploadInvoiceComponent
    ],
  imports: [
    CommonModule,KspRoutingModule,MaterialModule
  ]
})
export class KspModule { }
