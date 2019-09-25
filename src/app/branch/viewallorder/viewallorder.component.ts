import { Component, OnInit } from '@angular/core';
import {ViewAllOrderService} from '../../services/branch/view-all-order.service';
import {Router} from '@angular/router';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
@Component({
  selector: 'app-viewallorder',
  templateUrl: './viewallorder.component.html',
  styleUrls: ['./viewallorder.component.scss']
})
export class ViewallorderComponent implements OnInit {
  loaders:boolean = true;
   viewAllDelivery:any[] = [];
   DisursedCount:any = 0;
   ReceivedCount:any = 0;
   OrderedCount:any = 0;
   DeliveredCount:any = 0;
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
  minDate1:any;
  maxDate1;any;
  minDate2:any;
  maxDate2:any;
  bsConfig: Partial<BsDatepickerConfig>;

  constructor(private viewServices:ViewAllOrderService, 
              private _router:Router) {
    this.bsConfig = Object.assign({}, { containerClass: 'theme-orange',showWeekNumbers: false });
    var logininfo:any = JSON.parse( localStorage.getItem('loginInfo'));
    if(!logininfo){
      this._router.navigate(['home']);
    }
   }
dateset(){
  this.minDate2 = this.startDate;
}
datesetend($event){
  this.maxDate1 = this.endDate;
}
  ngOnInit() {
    this.minDate1 = new Date();
    this.maxDate1 = new Date();
    this.maxDate2 = new Date();
    this.maxDate1.setDate(this.maxDate1.getDate() );
    this.maxDate2.setDate(this.maxDate1.getDate() );
    this.viewServices.viewAllOrder().then((data:any)=>{
    if(!data){
      this.loaders = false;
    }
    this.viewAllDelivery = data;
    var j=0,k=0,l=0,m=0,nomatch = 0;
    for(let i=0;i<data.length;i++){
      this.viewAllDelivery[i].invoice_id = data[i].invoice_id;
      this.viewAllDelivery[i].product_name = data[i].product_name;
      this.viewAllDelivery[i].customer_name = data[i].name;
      this.viewAllDelivery[i].customer_phone = data[i].phone_number;
      this.viewAllDelivery[i].address = data[i].address;
      this.viewAllDelivery[i].status = data[i].status;
      this.viewAllDelivery[i].received_date = data[i].received_date;
      this.viewAllDelivery[i].disbursal_date = data[i].disbursal_date;
      this.viewAllDelivery[i].order_date = data[i].order_date;
      if(data[i].order_date){
        this.viewAllDelivery[i].dateformat_order = data[i].order_date.match(/\d+/g).reverse().join('-');
      }
      if(data[i].disbursal_date){
        this.viewAllDelivery[i].dateformat_disbursal = data[i].disbursal_date.match(/\d+/g).reverse().join('-');
      }
      if(data[i].received_date){
        this.viewAllDelivery[i].dateformat_received = data[i].received_date.match(/\d+/g).reverse().join('-');
       }
      if(this.viewAllDelivery[i].status == "DISBURSED"){
        j++
        this.DisursedCount = this.DisursedCount+1;
      }else if(this.viewAllDelivery[i].status == "INVOICED"){
        k++;
        this.viewAllDelivery[i].status = 'ORDERED' ;
        this.OrderedCount =  this.OrderedCount + 1;
      }
      else if(this.viewAllDelivery[i].status == "ORDERED"){
        l++;
        this.OrderedCount =  this.OrderedCount + 1;
      }
      else if(this.viewAllDelivery[i].status == "RECEIVED"){
        m++;
        this.ReceivedCount = this.ReceivedCount + 1;
      }else if(this.viewAllDelivery[i].status == "DELIVERED"){
        nomatch++
        this.DeliveredCount = this.DeliveredCount + 1;
      }
      if(i == data.length -1 ){
        this.loaders = false;
      }
    }
    }).catch((error)=>{
      this.loaders = false;
    })
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
    let startDate = this.date[0].toISOString();
    let endDate = this.date[1].toISOString();
    let selectedMembers = this.viewAllDelivery.filter(
      m => new Date(m.received_date) >= new Date(startDate) && new Date(m.received_date) <= new Date(endDate)
      );
    this.viewAllDelivery = selectedMembers;
  }
  pagechanged(event){
    this.p = event;
  }
  setOrder(value: string) {
    if (this.order === value) {
      this.reverse = !this.reverse;
    }
    if(this.reverse){
      this.viewAllDelivery.sort(function(a, b){
        if(a[value] == null || a[value] == undefined){
          a[value]= '';
        }
        if( b[value]== null || b[value]== undefined){
          b[value]= '';
        }
        var x =  a[value].toLowerCase()  ;
        var y = b[value].toLowerCase()  ;
        if (x < y) {return -1;}
        if (x > y) {return 1;}
        return 0;
    });
  }else {
    this.viewAllDelivery.sort(function(a, b){
      if(a[value] == null || a[value] == undefined){
        a[value]= '';
      }
      if( b[value]== null || b[value]== undefined){
        b[value]= '';
      }
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
