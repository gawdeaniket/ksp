import { Component, OnInit ,ElementRef} from '@angular/core';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import {HomeBranchService} from '../../services/branch/home-branch.service';
import {ExcelService} from '../../services/excel.service';
import {Router} from '@angular/router';

@Component({
  host: {
    '(document:click)': 'onClick($event)',
  },
  selector: 'app-homebranch',
  templateUrl: './homebranch.component.html',
  styleUrls: ['./homebranch.component.scss']
})
export class HomebranchComponent implements OnInit {
  isOpen = false;
  order: string = 'info.name';
  reverse: boolean = false;
 selectTable:boolean = true;
 datePickerConfig: Partial<BsDatepickerConfig>;
 recivedTab:boolean ;
 notrecivedTab:boolean;
  recived: any[] = [];
  NotRecived:any[] = [];
  allData:any[] = [];
  p1: number = 1;
  p2: number = 1;
  reverseDate : boolean = true;
  alertBox: boolean= false;
  failures: any;
  success: any;
  recivedactive: boolean = true;
  notrecivedactive: boolean = false;
  startDate: any;
  endDate: any;
  datefiltercheck:boolean = false;
  notreceived_startDate ;
  notreceived_endDate ;
  received_startDate;
  received_endDate;
  notreceived_datefiltercheck =false;
  received_datefiltercheck =false;
  glpCount:any = 0;
  alertcheck: boolean = false;
  markItem:number = 0;
  receivedCount:number = 0 ;
  loaders:boolean = true
 
 
  constructor(private homebranch: HomeBranchService,private _eref: ElementRef,private excelService:ExcelService, private _router:Router) {
    this.datePickerConfig = Object.assign({}, { containerClass: 'theme-orange' });
    var logininfo:any = JSON.parse( localStorage.getItem('loginInfo'));
    
    if(!logininfo){
      this._router.navigate(['home']);
    }
    if(logininfo.role !='BRANCH'){
      this._router.navigate(['home']);
    }
    
  

 }

 onClick(event) {
   this.alertBox = false;
  if (!this._eref.nativeElement.contains(event.target)) {
  
  //  // // console.log("alert");
  //  // // console.log(this.alertBox);
  }
 }

dateFilter(){
 // // // console.log("filter date");
  var DataCopy = this.NotRecived;

    if(this.startDate && this.endDate){
       let startDate = this.startDate.toISOString();
      let endDate = this.endDate.toISOString();
      return this.NotRecived.filter(values =>{
      if(values.order_date){
    return  new Date(values.order_date).toISOString() > startDate && new Date(values.order_date).toISOString() < endDate;
      }
 })
         
    }else{
      alert('Please Select Both Start And End Date');
      this.NotRecived = DataCopy;
     
}
//// console.log(this.NotRecived);

}
mark(){
  this.alertcheck = false;
  // alertify.alert('Alert Title', 'Alert Message!', function(){ alertify.success('Ok'); });
    this.markItem =0;
  for(let i=0; i<this.NotRecived.length;i++){
    if(this.NotRecived[i].selected){
     this.markItem++;
      
    }
    if(i === this.NotRecived.length-1){
      if(!this.markItem){
     alert("Please select an order to mark received");
      }else{
   
        this.alertcheck = true;
      }
      
    }

    
  }

  

}
// exportAsXLSX():void {
//   this.excelService.exportAsExcelFile(this.data, 'sample');
// }
tabcheck(activeTab){
  this.startDate = "";
  this.endDate = "";
  if(activeTab == 'Received'){
     this.recivedactive = true;
     this.notrecivedactive = false;
   //  // console.log(this.recivedactive);
  }else{
    
    this.recivedactive = false;
     this.notrecivedactive = true;
   //  // console.log(this.notrecivedactive);
  }
}

reload(){
  location.reload();
}

  ngOnInit() {
    
//// console.log(this.recivedTab);
    this.homebranch.notReceived()
    .then((data:any)=>{
     // // console.log(data);
      if(!data|| data.delivered_data.length ==0 ){
    
        this.loaders = false;
       // // console.log(this.loaders);
      }
      for(let i=0;i<data.delivered_data.length;i++){
        var datepart;
        var year;
        var month;
        var day;
        if(data.delivered_data[i].status == 'RECEIVED')
        {
          this.receivedCount++;
         // // console.log(this.receivedCount);
          this.recived.push({
            
            order_id:data.delivered_data[i].order_id,
            order_date:data.delivered_data[i].order_date,
            product_name:data.delivered_data[i].product_name,
            branch_id:data.delivered_data[i].branch_id,
            status:data.delivered_data[i].status,
            name:data.delivered_data[i].name,
            phone_number:data.delivered_data[i].phone_number,
            email:data.delivered_data[i].email,
            address:data.delivered_data[i].address,
            city:data.delivered_data[i].city,
            state:data.delivered_data[i].state,
            zipcode:data.delivered_data[i].zipcode,
            country:data.delivered_data[i].country,
            client_id:data.delivered_data[i].client_id,
            approval_id:data.delivered_data[i].approval_id,
            invoice_id: data.delivered_data[i].invoice_id,
            dateformat: data.delivered_data[i].order_date.match(/\d+/g).reverse().join('-')
            

          }) 
         

        }else{
          this.glpCount++;
          this.NotRecived.push({
            order_id:data.delivered_data[i].order_id,
            order_date:data.delivered_data[i].order_date,
            product_name:data.delivered_data[i].product_name,
            branch_id:data.delivered_data[i].branch_id,
            status:data.delivered_data[i].status,
            name:data.delivered_data[i].name,
            phone_number:data.delivered_data[i].phone_number,
            email:data.delivered_data[i].email,
            address:data.delivered_data[i].address,
            city:data.delivered_data[i].city,
            state:data.delivered_data[i].state,
            zipcode:data.delivered_data[i].zipcode,
            country:data.delivered_data[i].country,
            client_id:data.delivered_data[i].client_id,
            approval_id:data.delivered_data[i].approval_id,
            invoice_id: data.delivered_data[i].invoice_id,
            selected:false,
            dateformat: data.delivered_data[i].order_date.match(/\d+/g).reverse().join('-')

          }) 
        }

        if(i == data.delivered_data.length -1 ){
    
          this.loaders = false;
          // console.log(this.loaders);
        }
      }
    })

    
//// console.log(this.NotRecived);
  //   this.homebranch.notReceived()
  //   .then((data:any)=>{
  //  // console.log(data);
  //    this.allData = data.delivered_data;
  //    for(let i=0;i<data.delivered_data.length;i++){
  //      this.allData[i].selected = false;
  //    }

  //    for(let i=0;i<data.delivered_data.length;i++){
         
  //    }
  //    // console.log(this.NotRecived);


  //   })
  }

  // tables(check){
  //   // console.log(check);
  //   if(check == "notrecived"){
  //     this.selectTable = false;
  //   }
  //   else{
  //     this.selectTable = true;
  //   }
  // }

  // pagechanged(event){
  //   this.p = event;
  //   // console.log(event);
  // }
  
  Received_setOrder(value: string) {
    // // console.log("s "+value);
    // // console.log(value);
    if (this.order === value) {
      this.reverse = !this.reverse;
    }
   if(this.reverse){
    this.NotRecived.sort(function(a, b){
      var x =  a[value].toLowerCase()  ;
      var y = b[value].toLowerCase()  ;
      if (x < y) {return -1;}
      if (x > y) {return 1;}
      return 0;
    });
  }else {

    this.NotRecived.sort(function(a, b){
      var x =  a[value].toLowerCase()  ;
      var y = b[value].toLowerCase()  ;
      if (x > y) {return -1;}
      if (x < y) {return 1;}
      return 0;
    });

  }
    this.order = value;
  }

  Notreceived_setOrder(value: string) {
    // // console.log("s "+value);
    // // console.log(value);
    if (this.order === value) {
      this.reverse = !this.reverse;
    }
   if(this.reverse){
    this.NotRecived.sort(function(a, b){
      // // console.log(a[value]);
      var x =  a[value].toLowerCase()  ;
      var y = b[value].toLowerCase()  ;
      if (x < y) {return -1;}
      if (x > y) {return 1;}
      return 0;
    });
  }else {

    this.NotRecived.sort(function(a, b){
      var x =  a[value].toLowerCase()  ;
      var y = b[value].toLowerCase()  ;
      if (x > y) {return -1;}
      if (x < y) {return 1;}
      return 0;
    });

  }
    this.order = value;
  }



DateFilter(){
  if(this.notreceived_startDate && this.notreceived_endDate){
      this.notreceived_datefiltercheck = true;
  }else if(this.received_startDate && this.received_endDate){
    this.received_datefiltercheck = true;
    
  }
  else{
    alert("please Enter Valid StartDate and EndDate ");
  }
}
  Selected(event,i){
    // // console.log(event);
    // // console.log(i);
    this.NotRecived[i].selected = !this.NotRecived[i].selected;
    // // console.log(this.NotRecived[i]);
  }
  selectall(){
    for(let i = 0 ;i<this.NotRecived.length;i++){
      this.NotRecived[i].selected = true;
    }
  }
  sortByDate(){
    
    if(this.reverseDate){

      this.NotRecived.sort(function(a,b){
        var dateA:any = new Date(b.order_date);
         var dateB:any = new Date(a.order_date)
        
         return  dateA - dateB;
       });
       this.reverseDate = ! this.reverseDate;
    }
    else {

      this.NotRecived.sort(function(a,b){
        var dateA:any = new Date(b.order_date);
         var dateB:any = new Date(a.order_date)
        
         return  dateB - dateA;
       });
       this.reverseDate = ! this.reverseDate;

    }
    
   
  }

markReceived(){
  this.alertcheck = false;
  // alertify.alert('Alert Title', 'Alert Message!', function(){ alertify.success('Ok'); });
   var markItem:any[] = []
   var d = new Date();
  var n = d.toISOString().substring(0, 10);
  // // console.log(n);
  for(let i=0; i<this.NotRecived.length;i++){
    if(this.NotRecived[i].selected){
      markItem.push({
        order_id:this.NotRecived[i].order_id.toString(),
        received_date: n

      });
      
    }
    if(i === this.NotRecived.length-1){
      // // console.log(markItem);
       this.homebranch.markreceived(markItem)
       .then((data:any)=>{
         // // console.log(data);
         this.reload();
         this.failures = data.failure;
         this.success = data.success;
         this.alertBox = true;
       })
    }

    
  }

  

}


clearall(){
  for(let i = 0 ;i<this.NotRecived.length;i++){
    this.NotRecived[i].selected = false;
  }
}


}
