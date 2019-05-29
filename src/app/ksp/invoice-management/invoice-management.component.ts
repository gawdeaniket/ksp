import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router'
@Component({
  selector: 'app-invoice-management',
  templateUrl: './invoice-management.component.html',
  styleUrls: ['./invoice-management.component.scss']
})
export class InvoiceManagementComponent implements OnInit {
  public selection:any  ;
  public arrow = true;
  selectOption: any;
  constructor(private _router: Router) { }

  ngOnInit() {
  }

  ChangingValue(events){
    console.log(events);
    console.log(events.target);
    console.log(events.target.value);
    console.log(events.value);
    if(events.target.value && events.target.value == 'satin'){
     this.selectOption = events.target.value;
    }
  }

  select(){
 if(this.selectOption == 'satin'){
  this._router.navigate(['satininvoice']);
 }else{
   alert("Please Select Below Mention Option");
 }
    
    console.log(this.selection);
  //   if(this.selection =='satin' || this.selection == 'bfil'){

  //   this._router.navigate(['satininvoice']);
 
  // }
  // else {
  //   alert("please select below List");
  // }
  }
}
