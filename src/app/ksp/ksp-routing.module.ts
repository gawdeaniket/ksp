import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import {InvoiceManagementComponent} from '../ksp/invoice-management/invoice-management.component';
import {SatinInvoiceComponent} from '../ksp/satin-invoice/satin-invoice.component';
import {UploadInvoiceComponent} from '../ksp/upload-invoice/upload-invoice.component';
import {KspdashboardComponent} from '../ksp/kspdashboard/kspdashboard.component';
import {HomeRegistrationComponent} from '../ksp/home-registration/home-registration.component'
// const routes: Routes = [
//   { 
//     path:'', redirectTo:'kspdashboard' , pathMatch:'full'
//    },
//    { 
//     path:'kspdashboard', component: KspdashboardComponent,
//    },
//   { 
//     path:'invoicemanagement', component:InvoiceManagementComponent,
//    },
//    {
//     path:'satininvoice', component:SatinInvoiceComponent
//    },
//    {
//     path:'upload/:id',component: UploadInvoiceComponent,
//    }
 

// ];
// const routes: Routes = [
//     { path:'',redirectTo:'invoicemanagement',pathMatch:'full'}, 
//     { 
//       path:'invoicemanagement', component:InvoiceManagementComponent,
//      },
//      {
//       path:'homeRegistration',component: HomeRegistrationComponent,
//      },
//      {
//       path:'satininvoice', component:SatinInvoiceComponent
//      },
//      {
//       path:'upload/:id',component: UploadInvoiceComponent,
//      }
// ]
const routes: Routes = [
  {
    path:'', component:KspdashboardComponent, 
  children:[
    { path:'',redirectTo:'invoicemanagement',pathMatch:'full'},
    
    { 
      path:'invoicemanagement', component:InvoiceManagementComponent,
     },
     {
      path:'homeRegistration',component: HomeRegistrationComponent,
     },
     {
      path:'satininvoice', component:SatinInvoiceComponent
     },
     {
      path:'upload/:id',component: UploadInvoiceComponent,
     }
  ]}
];





@NgModule({
  
  imports: [RouterModule.forChild(routes)],
  exports: [ RouterModule   ]
})
export class KspRoutingModule { }
