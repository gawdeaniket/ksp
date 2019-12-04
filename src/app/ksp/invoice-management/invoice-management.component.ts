import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
@Component({
  selector: 'app-invoice-management',
  templateUrl: './invoice-management.component.html',
  styleUrls: ['./invoice-management.component.scss']
})
export class InvoiceManagementComponent implements OnInit {
  public selection:any  ;
  public arrow = true;
  selectOption: any;
  flagToHeader:boolean = true;
  constructor(private _router: Router) { }

  ngOnInit() {
  }

  ChangingValue(events){
    if(events.target.value && events.target.value == 'bfil'){
      this.selectOption = events.target.value;
    }
  }

  select(){
    if(this.selectOption == 'bfil'){
      this._router.navigate(['ksp/satininvoice']);
    }else{
      alert("Please Select Below Mention Option");
    }
  }
}
