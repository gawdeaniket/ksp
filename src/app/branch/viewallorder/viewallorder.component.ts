import { Component, OnInit } from '@angular/core';
import {ViewAllOrderService} from '../../services/branch/view-all-order.service';
@Component({
  selector: 'app-viewallorder',
  templateUrl: './viewallorder.component.html',
  styleUrls: ['./viewallorder.component.scss']
})
export class ViewallorderComponent implements OnInit {
   viewAllDelivery:any[] = [];
   DisursedCount:any = 0;
   ReceivedCount:any = 0;
   OrderedCount:any = 0;
  date: any;
  p: any;
  alertBox:boolean = false;
  startDate: any;
  endDate: any;
  datefiltercheck: boolean;
  order: string = 'invoice_id';
  reverse: boolean = false;
  searchText:any;
  invoiceId:any;
  productName:any;
  customerName:any;
  customerPhone:any;
  cutomerAddress:any;
  status:any;
  ReceivedDate;
  disbursalDate;


  constructor(private viewServices:ViewAllOrderService) { }

  ngOnInit() {

    this.viewServices.viewAllOrder().then((data:any)=>{
      console.log(data);
      this.viewAllDelivery = data;
      for(let i=0;i<data.length;i++){
        this.viewAllDelivery[i].invoice_id = data[i].invoice_id;
        this.viewAllDelivery[i].product_name = data[i].product_name;
        this.viewAllDelivery[i].customer_name = data[i].name;
        this.viewAllDelivery[i].customer_phone = data[i].phone_number;
       // this.viewAllDelivery[i].customer_address = 'jksajska sajksajsa jsakjskas skaskas sjaksjas skasks';
       this.viewAllDelivery[i].customer_address = data[i].customer_address;
        this.viewAllDelivery[i].status = data[i].status;
        this.viewAllDelivery[i].received_date = data[i].received_date;
        this.viewAllDelivery[i].disbursal_date = data[i].disbursal_date;
        if(this.viewAllDelivery[i].status == "DISBURSED"){
          this.DisursedCount = this.DisursedCount+1;
        }else if(this.viewAllDelivery[i].status == "INVOICE"){
          this.viewAllDelivery[i].status = 'ORDERED' ;
          this.OrderedCount =  this.OrderedCount + 1;
        }
        else if(this.viewAllDelivery[i].status == "ORDERED"){
          this.OrderedCount =  this.OrderedCount + 1;
        }
        else if(this.viewAllDelivery[i].status == "RECEIVED"){
          this.ReceivedCount = this.ReceivedCount + 1;
        }
        
      }
    }).catch((error)=>{
      console.log(error);
    })
  }
  ngfor(event){
    console.log(event);
  }
  DateFilter(){
    if(this.startDate && this.endDate){
        this.datefiltercheck = true;
    }
    else{
      alert("please Enter Valid StartDate and EndDate ");
    }
  }
  clearDate(){
    this.startDate = '';
    this.endDate = '';
  }
  datechange(event){
    console.log(event);
    console.log(this.date[0].toISOString());
    console.log(typeof this.date[0]);
      let startDate = this.date[0].toISOString();
      let endDate = this.date[1].toISOString();

    let selectedMembers = this.viewAllDelivery.filter(
      m => new Date(m.received_date) >= new Date(startDate) && new Date(m.received_date) <= new Date(endDate)
      );
      this.viewAllDelivery = selectedMembers;
      
      console.log(selectedMembers);

  }
  pagechanged(event){
    this.p = event;
  }



  setOrder(value: string) {
    console.log("s "+value);
    console.log(value);
    if (this.order === value) {
      this.reverse = !this.reverse;
    }
   if(this.reverse){
    this.viewAllDelivery.sort(function(a, b){
     
      var x =  a[value].toLowerCase()  ;
      var y = b[value].toLowerCase()  ;
      if (x < y) {return -1;}
      if (x > y) {return 1;}
      return 0;
    });
  }else {

    this.viewAllDelivery.sort(function(a, b){
    
      var x =  a[value].toLowerCase()  ;
      var y = b[value].toLowerCase()  ;
      if (x > y) {return -1;}
      if (x < y) {return 1;}
      return 0;
    });

  }
    this.order = value;
  }

  
  

}
