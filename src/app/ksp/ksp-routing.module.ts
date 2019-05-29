import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import {InvoiceManagementComponent} from '../ksp/invoice-management/invoice-management.component';
import {SatinInvoiceComponent} from '../ksp/satin-invoice/satin-invoice.component';
import {UploadInvoiceComponent} from '../ksp/upload-invoice/upload-invoice.component';
const routes: Routes = [
  { 
    path:'invoicemanagement', component:InvoiceManagementComponent,
   },
   {
    path:'satininvoice', component:SatinInvoiceComponent
   },
   {
    path:'upload/:id',component: UploadInvoiceComponent,
   }
 

];



@NgModule({
  
  imports: [RouterModule.forChild(routes)],
  exports: [ RouterModule   ]
})
export class KspRoutingModule { }
