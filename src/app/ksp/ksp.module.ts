import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// import { MaterialModule } from '../material/material.module';
// import { FormsModule } from '@angular/forms';
import {KspRoutingModule} from '../ksp/ksp-routing.module';
import { InvoiceManagementComponent } from './invoice-management/invoice-management.component';
import { SatinInvoiceComponent } from './satin-invoice/satin-invoice.component';
import { UploadInvoiceComponent } from './upload-invoice/upload-invoice.component';
import { NgxLoadingModule,ngxLoadingAnimationTypes } from 'ngx-loading';
import {SharedModule} from '../shared/shared.module';
import { KspdashboardComponent } from './kspdashboard/kspdashboard.component';
import { HomeRegistrationComponent } from './home-registration/home-registration.component';
import { MaterialModule } from '../material/material.module';
 import { FormsModule , ReactiveFormsModule } from '@angular/forms';
@NgModule({
  declarations: [
    InvoiceManagementComponent,
    SatinInvoiceComponent,
    UploadInvoiceComponent,
    KspdashboardComponent,
    HomeRegistrationComponent
    ],
  imports: [
    CommonModule,
    KspRoutingModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    NgxLoadingModule.forRoot({
      animationType: ngxLoadingAnimationTypes.circle,
      backdropBackgroundColour: 'rgba(0,0,0,0.3)',
      fullScreenBackdrop: true,
      backdropBorderRadius: '4px',
      primaryColour: '#fcdb04',
      secondaryColour: '#ffffff',
      tertiaryColour: '#ffffff'
    })

  ]
})
export class KspModule { }
