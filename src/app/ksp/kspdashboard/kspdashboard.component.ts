import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
@Component({
  selector: 'app-kspdashboard',
  templateUrl: './kspdashboard.component.html',
  styleUrls: ['./kspdashboard.component.scss']
})
export class KspdashboardComponent implements OnInit {

  events: string[] = [];
  opened: boolean = true;
  branchDate:any;
  alertcheck = false;
  // activecheck:boolean =false;
  constructor(private _router:Router) {
    // console.log(location.hash);
    // if(location.hash == '#/dashboard'){

    //   this.activecheck = true;
    //   console.log(this.activecheck);
    // }
  //   var logininfo:any = JSON.parse( localStorage.getItem('loginInfo'));
  //   this.branchDate = logininfo.branch_name;
  // //  console.log(!logininfo );
  //   if(!logininfo ){
  //     this._router.navigate(['home']);
  //   }
  //   if(logininfo.role !='BRANCH'){
  //     this._router.navigate(['home']);
  //   }
   }

  ngOnInit() {
  }
logout(){
  this.alertcheck = true;
 // console.log(this.alertcheck);
  
}



finalLogout(){
  localStorage.removeItem('loginInfo');
  localStorage.clear();
  this._router.navigate(['']);
  // location.reload();
  
}

// closeactive(){
//   this.activecheck = false;
// }

}
