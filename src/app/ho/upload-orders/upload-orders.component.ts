import { Component, OnInit,ElementRef, AfterViewInit } from '@angular/core';
//import { OrderPipe } from 'ngx-order-pipe';
import {ApprovalService} from '../../services/ho/approval.service';
import { ExportToCsv } from 'export-to-csv';
import {Router} from '@angular/router';


@Component({
  host: {
    '(document:click)': 'onClick($event)',
  },
  selector: 'app-upload-orders',
  templateUrl: './upload-orders.component.html',
  styleUrls: ['./upload-orders.component.scss']
})
export class UploadOrdersComponent implements OnInit, AfterViewInit {
  p: any;
  
  boxupload:boolean = true;
  successalert:boolean = false;
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
  totalApproveCount:number = 0;
  csvExporter :any;
  loaders:any = true;
  dateOrder:any;
  failurealert:boolean = false;
  fileToUpload: File = null;
  fileName: any;
  failureResponse: any[];
  alerts: boolean= false;
  uploadAlert:boolean = false;
  downloads:boolean = false;
  // branchId: any = 'B123';
  // name: any = 'aDelhi North';
  // region: any = 'North';
  // product:any = "Price 200"
  // quantity:any = 50;
  options = { 
    fieldSeparator: ',',
    quoteStrings: '"',
    decimalSeparator: '.',
    showLabels: false, 
    showTitle: false,
    useTextFile: false,
    useBom: true,
    filename:"random",
    useKeysAsHeaders: true,
    
    // headers: ['Column 1', 'Column 2', etc...] <-- Won't work with useKeysAsHeaders present!
  };
  total: number;
  totalCount: any = 0;
  successResponse: any;
  constructor(private approvalServices:ApprovalService,private _eref: ElementRef,private _router:Router) {
    var logininfo:any = JSON.parse( localStorage.getItem('loginInfo'));
    if(!logininfo){
      this._router.navigate(['home']);
    }
  console.log(this.downloads);
    window.document.body.style.background = 'black';
  }
  closeupload(){
    this.fileToUpload = null;
    this.downloads = false;
  }
  ngOnInit() {
 

    this.approvalServices.getList().then((data:any)=>{
      if(data.pending_approval_list.length == 0 || data.proposed_count_by_state == 0  ){
        this.AllApprove = false;
        this.loaders = false;
      }
      console.log(data);
      if(data){
      this.dateOrder = data.pending_approval_list[1].approval_generated_date
      }
      if(data.pending_approval_list.length == 0 || data.proposed_count_by_state == 0){
        this.loaders = false;
      }
      for(let i=0;i<data.pending_approval_list.length;i++){
        this.uploadOrderList.push({ 
          approval_id:data.pending_approval_list[i].approval_id,
          branch_id:data.pending_approval_list[i].branch_id,
          branch_name:data.pending_approval_list[i].branch_name,
          region:data.pending_approval_list[i].region,
          state:data.pending_approval_list[i].state,
          product_name:data.pending_approval_list[i].product_name,
          product_quantity_proposed:data.pending_approval_list[i].product_quantity_proposed,
          product_qty:data.pending_approval_list[i].product_quantity_proposed,
          appovedate: data.pending_approval_list[i].approval_generated_date,
        })
        
        if(i == data.pending_approval_list.length - 1 || data.pending_approval_list.length  == 0 ){
          
        //  this.loaders = false;
          console.log(this.loaders);
        }
      }
     // this.uploadOrderList = data;
      console.log(this.uploadOrderList);
      console.log(this.AllApprove);
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
        this.totalCount = this.totalCount + this.uploadOrder[i].count;
        if(i ==data.proposed_count_by_state.length-1){
        this.loaders = false;
        }
        
      }
     // this.uploadOrderList = data;
      console.log(this.uploadOrderList);
    })


  }
ngAfterViewInit(){
  window.document.body.style.background = 'black';
}
onClick(event) {
  //this.alertBox = false;
 // this.alertcheck = false;
 if (!this._eref.nativeElement.contains(event.target)) // or some similar check
 
  console.log("alert");
  console.log(this.alertBox);
}
uploadmsl(){
 // this.downloads = true;
  var files = document.getElementById('file');
  console.log(files);
  files.click();
  console.log(this.downloads);
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
            this.approvalServices.PostList(sendItem).then((data:any)=>{
              if(data.failure.length == 0 ){
              this.uploadOrderList = [];
              this.modifyContent = true;
              this.modifyButton = false;
              this.downloadButton = false;
              this.searchbox = false;
              this.alertBox = true;
              }else{
                this.failureResponse = data.failure;
                this.failurealert = true;
              }
              console.log(data);
            })

 }
  }

}
cancelapprove(){
  this.alertcheck =false;
}

Download(){
  var wrongApprovalId =[];
  console.log(wrongApprovalId);
  for(let i=0; i<this.uploadOrderList.length;i++){
  console.log(this.uploadOrderList[i].product_qty);
  if( this.uploadOrderList[i].product_qty%5 != 0 || this.uploadOrderList[i].product_qty < 0){
    wrongApprovalId.push(this.uploadOrderList[i].approval_id);
   // alert("please enter a correct no for "+this.uploadOrderList[i].approval_id +"Approval Id" );

  }
  if(i == this.uploadOrderList.length-1){
    console.log("in");
       if(wrongApprovalId.length){
       console.log("lebgth "+ wrongApprovalId.length);
        alert(' Please enter a correct quantity in multiple of 5');
       }else{
        //  for(let i=0;i<this.uploadOrderList.length;i++){
        //    this.totalApproveCount = this.totalApproveCount+  this.uploadOrderList[i].product_qty ;
        //    console.log();
        //    if(i == this.uploadOrderList.length - 1){
        //      console.log(this.totalApproveCount);
        //      console.log();
        //      this.total = this.totalApproveCount
        //     this.alertcheck =true;
        //    }
        //  }
        var obj = [];
        for(let i=0;i<this.uploadOrderList.length;i++){
        obj.push({
          Approval_Id:this.uploadOrderList[i].approval_id,
          Branch_Id:this.uploadOrderList[i].branch_id,
          Branch_Name:this.uploadOrderList[i].branch_name,
          Region:this.uploadOrderList[i].region,
          Product_Name:this.uploadOrderList[i].product_name,
          product_Quantity_proposed:this.uploadOrderList[i].product_quantity_proposed
         

        })
        if(i == this.uploadOrderList.length -1){
          var d = new Date();
          var n = d.toISOString();
        
        
        this.options.filename = "SATIN_ApproveOrders_"+n;
        
            this.csvExporter = new ExportToCsv(this.options);
        
           this.csvExporter.generateCsv(obj);
        }
        }

        

        
       }
}


  }
}

sendApprove(){
this.total = 0;
this.totalApproveCount = 0;
this.failurealert = false;

  var wrongApprovalId =[];
  console.log(wrongApprovalId);
  for(let i=0; i<this.uploadOrderList.length;i++){
  console.log(this.uploadOrderList[i].product_qty);
  // var pattern = /^[a-zA-Z0-9!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]*$/;
  // console.log(this.uploadOrderList[i].product_qty);
  // if(this.uploadOrderList[i].product_qty.match(pattern)){
  //   wrongApprovalId.push(this.uploadOrderList[i].approval_id);
  // }
  if( this.uploadOrderList[i].product_qty%5 != 0 || this.uploadOrderList[i].product_qty < 0 || this.uploadOrderList[i].product_qty == null){
    wrongApprovalId.push(this.uploadOrderList[i].approval_id);
   // alert("please enter a correct no for "+this.uploadOrderList[i].approval_id +"Approval Id" );

  }
  if(i == this.uploadOrderList.length-1){
    console.log("in");
       if(wrongApprovalId.length){
      
        alert(' Please enter a correct quantity in multiple of 5' ) ;
       }else{
         for(let i=0;i<this.uploadOrderList.length;i++){
           this.totalApproveCount = this.totalApproveCount+  this.uploadOrderList[i].product_qty ;
           console.log();
           if(i == this.uploadOrderList.length - 1){
             console.log(this.totalApproveCount);
             console.log();
             this.total = this.totalApproveCount
            this.alertcheck =true;
           }
         }
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
    if( this.uploadOrderList[index].product_qty >=0 && this.uploadOrderList[index].product_qty%5 == 0){
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

  handleFile(files: FileList) {
    
    this.alerts = false;
    this.failurealert = false;
    console.log(this.failurealert);
     if(files[0].type == "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"){
       this.fileToUpload = files.item(0);
       this.alerts = false;
       this.downloads = true;
     }
     else{
       this.fileToUpload = undefined;
       alert("Please upload a file in correct format (xls / xlsx)");
     }
     console.log(files);
     
     
 }

  handleFileInput() {

    this.uploadAlert = false;
    this.failurealert = false;
   // console.log(this.id);
    if(!this.fileToUpload){
      // this.alerts = true;
      alert("Please choose a file to upload");
    }
    else {
      // this.successalert =true;
      // this.boxupload = false;
      this.approvalServices.uploadApprove(this.fileToUpload)
    .then((data:any)=>{
   console.log(data);
   this.successResponse = data.success;
   if(this.successResponse &&this.successResponse.length){
    this.successalert =true;
   }
   
     this.failureResponse = data.failure;
     if(this.failureResponse.length){
      //alert("File data incorrect")
      this.failurealert = true;
     }
     
     console.log(this.failureResponse);


    },(error:any)=>{
      var errorsMessage =error.error.Error.MessageToUser; 
      console.log(errorsMessage);
      alert(errorsMessage);
    }).catch(error => console.log(error));
      
    }//else
    
}


approvedupload(){
// this.approvalServices.Approvefile().then((data)=>{

// })
}

cancelapproved(){
  
    location.reload();

  
}



}
