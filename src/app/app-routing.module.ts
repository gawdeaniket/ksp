import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LoginComponent} from './login/login.component';

import {DashboardHoComponent} from './ho/dashboard/dashboard.component';
import {HoRoutingModule} from './ho/ho-routing.module';
import {BranchModule} from './branch/branch.module';
 import {HomeHoComponent} from './ho/home-ho/home-ho.component';
 import {UploadMslComponent} from './ho/upload-msl/upload-msl.component';
 import {UploadOrdersComponent} from './ho/upload-orders/upload-orders.component';
//  import { DashboardComponent } from '../app/branch/dashboard/dashboard.component';
// import { HomebranchComponent } from '../app/branch/homebranch/homebranch.component';
// import {ViewallorderComponent} from '../app/branch/viewallorder/viewallorder.component';
// import {DownloadinvoiceComponent} from '../app/branch/downloadinvoice/downloadinvoice.component';
  import {KspModule} from './ksp/ksp.module';

const routes: Routes = [ 
  { path: 'home', component: LoginComponent },
  { path: 'dashboard', loadChildren: './branch/branch.module#BranchModule' },
  { path: 'dashboardHo', loadChildren: './ho/ho.module#HoModule' },
  { path: 'ksp', loadChildren: './ksp/ksp.module#KspModule' },
//   {path:'dashboardHo', component:DashboardHoComponent,
  
//     children:[
//     {
//       path:'', redirectTo:'HO_Home',pathMatch:'full'
//     },
//     {
//      path:'HO_Home',component:HomeHoComponent 
//     },
//     {
//      path:'uploadMsl',component:UploadMslComponent
//     },
//     {
//       path:'ApproveOrders', component:UploadOrdersComponent
//     }
// ]},

// {path:'dashboard', component:DashboardComponent,
   
// children:[
//   {
//     path:'',redirectTo:'homebranch',pathMatch:'full'
//    },
// {
//  path:'homebranch',component:HomebranchComponent
// },
// {
//  path:'viewallorder',component:ViewallorderComponent
// },

// {
//   path:'downloadinvoice', component:DownloadinvoiceComponent
// },
// {
//   path:'uploadinvoice', component:UploadinvoiceComponent
// }
// ]},
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  // {path:'**', component:DashboardComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash:true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
