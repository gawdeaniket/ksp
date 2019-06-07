import { Component, OnInit } from '@angular/core';
import {JsonToCsvService} from '../../services/jsonToCsv/json-to-csv.service'
import { ExportToCsv } from 'export-to-csv';
import {Router} from '@angular/router';
@Component({
  selector: 'app-home-ho',
  templateUrl: './home-ho.component.html',
  styleUrls: ['./home-ho.component.scss']
})
export class HomeHoComponent implements OnInit {
  loaders:boolean = true;
  csvExporter :any;
  stateWise:any;
  TotalReceived: number;
  TotalDeliverd: number;
  TotalOrder: number;
  TotalDisbursed: any;
  searchText:any;
  date:any;
  p:any;
  pagechanged:any;
  constructor(private jToc: JsonToCsvService,private _router:Router) {
    var logininfo:any = JSON.parse( localStorage.getItem('loginInfo'));
    if(!logininfo){
      this._router.navigate(['home']);
    }
    if(logininfo.role !='HO'){
      this._router.navigate(['home']);
    }
   }
   options = { 
    fieldSeparator: ',',
    quoteStrings: '"',
    decimalSeparator: '.',
    showLabels: true, 
    showTitle: false,
    useTextFile: false,
    useBom: true,
    filename:"random",
    useKeysAsHeaders: true,
    // headers: ['Column 1', 'Column 2', etc...] <-- Won't work with useKeysAsHeaders present!
  };
  ngOnInit() {

    this.jToc.stateWise().then((data:any)=>{
// console.log(data);
if(!data){
  this.loaders = false;
}
this.stateWise = data;
 this.TotalOrder = 0;
this.TotalDeliverd = 0;
this.TotalReceived = 0;
this.TotalDisbursed = 0;
for(let i=0;i <data.length;i++){
  // this.stateWise.push({ 
  //   STATE:data[i].STATE,
  //   ORDERED:data[i].ORDERED,
  //   INVOICE:data[i].INVOICE,
  //   DELIVERED:data[i].DELIVERED,
  //   RECEIVED:data[i].RECEIVED
  // })
 
  this.TotalOrder =this.TotalOrder + (this.stateWise[i].ORDERED +this.stateWise[i].INVOICED);
  // console.log(this.stateWise[i].ORDERED + this.stateWise[i].INVOICED);
  this.TotalDeliverd = this.TotalDeliverd + this.stateWise[i].DELIVERED;
  this.TotalReceived = this.TotalReceived + this.stateWise[i].RECEIVED;
  this.TotalDisbursed = this.TotalDisbursed +  this.stateWise[i].DISBURSED;
  if(i == data.length -1 ){
    
    this.loaders = false;
    // console.log(this.loaders);
  }
  
}



    })
  }

  statewise(){

    var d = new Date();
    var n = d.toISOString();
  
  
  this.options.filename = "SATIN_statewise"+n;
  
      this.csvExporter = new ExportToCsv(this.options);
  
     this.csvExporter.generateCsv(this.stateWise);
  

  }



  branchwise(){
   
    var d = new Date();
  var n = d.toISOString();


this.options.filename = "SATIN_branchwise"+n;

    this.csvExporter = new ExportToCsv(this.options);
 this.jToc.branchWise().then((data)=>{
   // console.log(data);
   this.csvExporter.generateCsv(data);

 })
  }
  customerwise(){
    var d = new Date();
    var n = d.toISOString();
    this.options.filename = "SATIN_customerwise"+n;

    this.csvExporter = new ExportToCsv(this.options);
    this.jToc.customerWise().then((data)=>{
      this.csvExporter.generateCsv(data);
    })

  }


}
