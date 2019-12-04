import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardHoComponent implements OnInit {
  events: string[] = [];
  opened: boolean = true;
  activecheck:boolean =false;
  alertcheck = false;
  constructor(private _router:Router) {
    var logininfo:any = JSON.parse( localStorage.getItem('loginInfo'));
    if(!logininfo){
      this._router.navigate(['home']);
    }
    if(logininfo.role != 'HO'){
      this._router.navigate(['home']);
    }
    // console.log(location.hash);
    // if(location.hash == '#/dashboardHo'){

    //   this.activecheck = true;
    //   console.log(this.activecheck);
    // }
   }
  ngOnInit() {
  }

  logout(){
    this.alertcheck = true;
  }
  finalLogout(){
    localStorage.removeItem('loginInfo');
    localStorage.clear();
    this._router.navigate(['home']);
  }

}
