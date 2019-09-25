import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router'
@Component({
  selector: 'app-satin-invoice',
  templateUrl: './satin-invoice.component.html',
  styleUrls: ['./satin-invoice.component.scss']
})
export class SatinInvoiceComponent implements OnInit {

  constructor(private _router: Router) { }

  ngOnInit() {
  }
 
upload(value){
  console.log(value);
  this._router.navigate(['ksp/upload', value]);
  
}
}
