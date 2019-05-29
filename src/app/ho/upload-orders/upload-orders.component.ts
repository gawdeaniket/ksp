import { Component, OnInit,ElementRef } from '@angular/core';
//import { OrderPipe } from 'ngx-order-pipe';
import {ApprovalService} from '../../services/ho/approval.service';
import { ExportToCsv } from 'export-to-csv';


@Component({
  host: {
    '(document:click)': 'onClick($event)',
  },
  selector: 'app-upload-orders',
  templateUrl: './upload-orders.component.html',
  styleUrls: ['./upload-orders.component.scss']
})
export class UploadOrdersComponent implements OnInit {
  p: any;
  uploadOrderList: any[]= [];
  branch_id: boolean;
  order: string = 'info.name';
  reverse: boolean = false;
  sortedCollection: any;
  SearchFilter: { };
  alertBox: boolean= false;
  alertcheck:boolean = false;
  modifyContent: boolean = true;
  downloadButton:boolean = true;
  searchbox:boolean = true;
  modifyButton:boolean = true;
  approvetable:boolean = false;
  modifybutton:boolean = true;
  uploadOrder:any[] = [];
  AllApprove:boolean = true;
  // branchId: any = 'B123';
  // name: any = 'aDelhi North';
  // region: any = 'North';
  // product:any = "Price 200"
  // quantity:any = 50;
   options = { 
    fieldSeparator: ',',
    quoteStrings: '"',
    decimalSeparator: '.',
    showLabels: true, 
    showTitle: true,
    title: 'Approve Records',
    useTextFile: false,
    useBom: true,
    useKeysAsHeaders: true,
    // headers: ['Column 1', 'Column 2', etc...] <-- Won't work with useKeysAsHeaders present!
  };
  constructor(private approvalServices:ApprovalService,private _eref: ElementRef) {
    
  }

  ngOnInit() {
 

    this.approvalServices.getList().then((data:any)=>{
      if(data.pending_approval_list.length == 0 ){
        this.AllApprove = false;
      }
      console.log(data);
      for(let i=0;i<data.pending_approval_list.length;i++){
        this.uploadOrderList.push({ 
          approval_id:data.pending_approval_list[i].approval_id,
          branch_id:data.pending_approval_list[i].branch_id,
          branch_name:data.pending_approval_list[i].branch_name,
          region:data.pending_approval_list[i].region,
          product_name:data.pending_approval_list[i].product_name,
          product_quantity_proposed:data.pending_approval_list[i].product_quantity_proposed,
          product_qty:data.pending_approval_list[i].product_quantity_proposed
        })
      }
     // this.uploadOrderList = data;
      console.log(this.uploadOrderList);
    })


    this.approvalServices.getList().then((data:any)=>{
      console.log(data.proposed_count_by_state);
      if(data.proposed_count_by_state.length == 0 ){
        this.AllApprove = false;
      }
      console.log(data);
      for(let i=0;i<data.proposed_count_by_state.length;i++){
        this.uploadOrder.push({ 
          state:data.proposed_count_by_state[i].state,
          count:data.proposed_count_by_state[i].count,
         
        })
      }
     // this.uploadOrderList = data;
      console.log(this.uploadOrderList);
    })

}

onClick(event) {
  //this.alertBox = false;
 // this.alertcheck = false;
 if (!this._eref.nativeElement.contains(event.target)) // or some similar check
 
  console.log("alert");
  console.log(this.alertBox);
}

modifyApproval(){
  this.approvetable = true;
  this.modifyContent = false;
  this.modifybutton = false;
}

download(){
  const csvExporter = new ExportToCsv(this.options);
console.log(this.uploadOrderList);
csvExporter.generateCsv(this.uploadOrderList);
}
  
UploadApprove(){


  var sendItem:any[] = []

  for(let i=0; i<this.uploadOrderList.length;i++){
    console.log(this.uploadOrderList[i].product_quantity_proposed);
      console.log(this.uploadOrderList[i].product_qty);

    sendItem.push({
            "approval_id":this.uploadOrderList[i].approval_id.toString(),
        "quantity": this.uploadOrderList[i].product_qty.toString(),
        "product_name": this.uploadOrderList[i].product_name,
        "branch_id": this.uploadOrderList[i].branch_id.toString()
      
          });

          if(i == this.uploadOrderList.length-1){
            this.alertcheck = false;
            this.AllApprove = false;
            console.log(sendItem);
            this.approvalServices.PostList(sendItem).then((data)=>{
              this.uploadOrderList = [];
              this.modifyContent = true;
              this.modifyButton = false;
              this.downloadButton = false;
              this.searchbox = false;
              this.alertBox = true;
              console.log(data);
            })

 }
  }

}
cancelapprove(){
  this.alertcheck =false;
}
sendApprove(){

  var wrongApprovalId =[];
  console.log(wrongApprovalId);
  for(let i=0; i<this.uploadOrderList.length;i++){
  console.log(this.uploadOrderList[i].product_qty);
  if(!this.uploadOrderList[i].product_qty|| this.uploadOrderList[i].product_qty%5 != 0 || this.uploadOrderList[i].product_qty < 0){
    wrongApprovalId.push(this.uploadOrderList[i].approval_id);
   // alert("please enter a correct no for "+this.uploadOrderList[i].approval_id +"Approval Id" );

  }
  if(i == this.uploadOrderList.length-1){
    console.log("in");
       if(wrongApprovalId.length){
       console.log("lebgth "+ wrongApprovalId.length);
        alert("please enter a correct Quantity In Multiple of 5 and Greater Then 0 for below mention Approval Id "+   wrongApprovalId );
       }else{
        this.alertcheck =true;
       }


  }
  
}
  
  console.log(this.alertcheck);
}

changedValue(event,i){
  if(event%5 == 0 ){
    this.uploadOrderList[i].product_qty= event;
  }
  else {
    this.uploadOrderList[i].product_qty= null;
   // alert("please enter Value In Multiple Of 5");
  }
  
  console.log(typeof event)
 console.log( this.uploadOrderList[i].product_quantity_proposed)

} 

  setOrder(value: string) {
    console.log("s "+value);
    console.log(value);
    if (this.order === value) {
      this.reverse = !this.reverse;
    }
   if(this.reverse){
    this.uploadOrderList.sort(function(a, b){
      var x =  a[value].toLowerCase()  ;
      var y = b[value].toLowerCase()  ;
      if (x < y) {return -1;}
      if (x > y) {return 1;}
      return 0;
    });
  }else {

    this.uploadOrderList.sort(function(a, b){
      var x =  a[value].toLowerCase()  ;
      var y = b[value].toLowerCase()  ;
      if (x > y) {return -1;}
      if (x < y) {return 1;}
      return 0;
    });

  }
    this.order = value;
  }

clearValue(){
  for(let i=0;i<this.uploadOrderList.length;i++){
   
     
    this.uploadOrderList[i].product_qty = this.uploadOrderList[i].product_quantity_proposed;
   
  }

}
  pagechanged(event){
    this.p = event;
  }
  increase(index){
    if( this.uploadOrderList[index].product_qty && this.uploadOrderList[index].product_qty%5 == 0){
    this.uploadOrderList[index].product_qty = this.uploadOrderList[index].product_qty + 5;
    }
  }
  decrease(index){
    if(this.uploadOrderList[index].product_qty == 0){
      return
    }
    if(this.uploadOrderList[index].product_qty && this.uploadOrderList[index].product_qty%5 == 0){
    this.uploadOrderList[index].product_qty = this.uploadOrderList[index].product_qty - 5;
    }
  }
}
