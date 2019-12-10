import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ErrorComponent } from '../app/error/error.component';
const routes: Routes = [
  { path: 'home', component: LoginComponent },
  // { path: 'dashboard', loadChildren: './branch/branch.module#BranchModule' },
  // { path: 'dashboardHo', loadChildren: './ho/ho.module#HoModule' },
  { path: 'dashboard', loadChildren: './ksp/ksp.module#KspModule' },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  {path: '**', redirectTo:'/home', pathMatch:'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash:true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
