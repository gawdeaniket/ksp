import { Component, OnInit } from '@angular/core';
import {DownloadInvoiceService} from '../../services/branch/download-invoice.service';
//import { saveAs } from 'file-saver';
@Component({
  selector: 'app-downloadinvoice',
  templateUrl: './downloadinvoice.component.html',
  styleUrls: ['./downloadinvoice.component.scss']
})
export class DownloadinvoiceComponent implements OnInit {
  public InvoiceRecords:any[] = [];
  received_startDate:any;
  received_endDate:any;
  received_datefiltercheck:any;
  order: string = 'invoice_id';
  reverse: boolean = false;
  receivedSearchText:any;
  p:number = 1;
  constructor(private download_service:DownloadInvoiceService) {

  }

ngOnInit() {

  this.download_service.downloadInvoice().then((data:any)=>{
     console.log(data); 
     this.InvoiceRecords = data;
         
     for(let i=0;i<data.length;i++){
      this.InvoiceRecords[i].invoice_id = data[i].invoice_id;
      this.InvoiceRecords[i].customer_address = data[i].address;
      this.InvoiceRecords[i].customer_name = data[i].name;
      this.InvoiceRecords[i].customer_phone = data[i].phone_number;
      this.InvoiceRecords[i].disbursal_date = data[i].disbursal_date;
      this.InvoiceRecords[i].status = data[i].status;
      this.InvoiceRecords[i].invoice_url = data[i].invoice_url;
      this.InvoiceRecords[i].product_name = data[i].product_name;
      this.InvoiceRecords[i].received_date = data[i].received_date;
      this.InvoiceRecords[i].selected = false;
      console.log(this.InvoiceRecords[i].invoice_url);
    }

  }).catch((error)=>{
    alert(error);
  })

 



  }
  
  // DateFilter(){
  //   if(this.startDate && this.endDate){
  //       this.datefiltercheck = true;
  //   }
  //   else{
  //     alert("please Enter Valid StartDate and EndDate ");
  //   }
  // }
  clearDate(){
    this.received_startDate = '';
    this.received_endDate = '';
  }
  Selected(event,i){
   // console.log(event);
   // console.log(i);
    this.InvoiceRecords[i].selected = !this.InvoiceRecords[i].selected;
   // console.log(this.NotRecived[i]);
  }
  DateFilter(){
     if(this.received_startDate && this.received_endDate){
      this.received_datefiltercheck = true;
      
    }
    else{
      alert("please Enter Valid StartDate and EndDate ");
    }
  }

  selectall(){
    for(let i = 0 ;i<this.InvoiceRecords.length;i++){
      this.InvoiceRecords[i].selected = true;
    }
  }

  clearall(){
    for(let i = 0 ;i<this.InvoiceRecords.length;i++){
      this.InvoiceRecords[i].selected = false;
    }
  }
  setOrder(value: string) {
    console.log("s "+value);
    console.log(value);
    if (this.order === value) {
      this.reverse = !this.reverse;
    }
   if(this.reverse){
    this.InvoiceRecords.sort(function(a, b){
      var x =  a[value].toLowerCase()  ;
      var y = b[value].toLowerCase()  ;
      if (x < y) {return -1;}
      if (x > y) {return 1;}
      return 0;
    });
  }else {

    this.InvoiceRecords.sort(function(a, b){
      var x =  a[value].toLowerCase()  ;
      var y = b[value].toLowerCase()  ;
      if (x > y) {return -1;}
      if (x < y) {return 1;}
      return 0;
    });

  }
    this.order = value;
  }
  downloadinvoice(index){

    var markItem:any[] = []
    for(let i=0; i<this.InvoiceRecords.length;i++){
      if(this.InvoiceRecords[i].selected){
        markItem.push(this.InvoiceRecords[i].invoice_url);
      }
      if(i === this.InvoiceRecords.length-1){
        let thefile = {};
        thefile = new Blob(markItem, { type: 'application/octet-stream' });
        let url = window.URL.createObjectURL(thefile);
        window.open(url);
      }
    }
   


  //  console.log(this.InvoiceRecords[index].invoice_url);
   
  }


  // downloadPdf(){
  // //  var pdfFile = 
  //   var newBlob = new Blob([x], { type: "application/pdf" });
  //   if (window.navigator && window.navigator.msSaveOrOpenBlob) {
  //     window.navigator.msSaveOrOpenBlob(newBlob);
  //     return;
  // }




  // }

  }


