import { Component, OnInit,ElementRef, ViewChild } from '@angular/core';
//import { OrderPipe } from 'ngx-order-pipe';
import {ApprovalService} from '../../services/ho/approval.service';

import {Router} from '@angular/router';
import {ExcelService} from '../../services/excel.service';
@Component({
  selector: 'app-branch-edit',
  templateUrl: './branch-edit.component.html',
  styleUrls: ['./branch-edit.component.scss']
})
export class BranchEditComponent implements OnInit {
  @ViewChild('nameit') private elementRef: ElementRef;
  loaders:boolean = true;
  uploadOrderList:any[] = [];
  order: string = 'info.name';
  reverse: boolean = false;
  saveButton:boolean = false;
  Disabled:boolean = true;
  saveAlert:boolean = false;
  branchId:any;
  fileToUpload: File = null;
  name:any;
  region:any;
  product:any;
  state:any;
  p:number = 1;
  failureResponses: any[];
  loaderscheck: boolean;
  failurelength: any;
  uploadFileSuccess: any;

  constructor(private _eref: ElementRef,private _router:Router,private excelService:ExcelService,private approvalServices:ApprovalService,) {
    var logininfo:any = JSON.parse( localStorage.getItem('loginInfo'));
    if(!logininfo){
      this._router.navigate(['home']);
   }
  }
   ngAfterViewInit(): void {
    // this.elementRef.nativeElement.focus();
  }
 
  ngOnInit() {
    this.uploadOrderList = [
         {no:0,approval_id: 1001,branch_id:'0001',region:'Alwar',state:'Rajasthan',status:'Active',branch_name:'Alwar city'},
         {no:1,approval_id: 1002,branch_id:'0002',region:'Mumbai',state:'Maharashtra',status:'InActive',branch_name:'Mumbai East'},
         {no:2,approval_id: 1003,branch_id:'0003',region:'Delhi',state:'Delhi',status:'Active',branch_name:'Delhi South'},
         {no:3,approval_id: 1004,branch_id:'0004',region:'Jaipur',state:'Rajasthan',status:'Active',branch_name:'Jaipur North'},
         {no:4,approval_id: 1005,branch_id:'0005',region:'Kolkata',state:'West Bengal',status:'InActive',branch_name:' Kolkata West'},
         {no:5,approval_id: 1002,branch_id:'0002',region:'Mumbai',state:'Maharashtra',status:'InActive',branch_name:'Mumbai East'},
         {no:6,approval_id: 1003,branch_id:'0003',region:'Delhi',state:'Delhi',status:'Active',branch_name:'Delhi South'},
         {no:7,approval_id: 1004,branch_id:'0004',region:'Jaipur',state:'Rajasthan',status:'Active',branch_name:'Jaipur North'},
         
    ]
    this.loaders = false;
    // this.uploadOrderList = []
    // for(let i=0;i<5;i++){
    //   this.uploadOrderList.push({ 
    //           no:i,
    //           approval_id:1000+i,
    //           branch_id:i+'0001',
    //           branch_name:'branch',
    //           region:'Mumbai',
    //           state:'Active',
    //           product_name:'BOOM',
    //           // product_quantity_proposed:data.pending_approval_list[i].product_quantity_proposed,
    //           // product_qty:data.pending_approval_list[i].product_quantity_proposed,
    //           // appovedate: data.pending_approval_list[i].approval_generated_date,
    //         })

    // }

    // this.approvalServices.getList().then((data:any)=>{
    //   if(data.pending_approval_list.length == 0 || data.proposed_count_by_state == 0  ){
    //     // this.AllApprove = false;
    //     this.loaders = false;
    //   }
    //   console.log(data);
    //   // if(data){
    //   // this.dateOrder = data.pending_approval_list[0].approval_generated_date.match(/\d+/g).reverse().join('-')
    //   // }
    //   if(data.pending_approval_list.length == 0 || data.proposed_count_by_state == 0){
    //     this.loaders = false;
    //   }
    //   var j=0;
    //   for(let i=0;i<data.pending_approval_list.length;i++){
    //     this.uploadOrderList.push({ 
    //       no:j++,
    //       approval_id:data.pending_approval_list[i].approval_id,
    //       branch_id:data.pending_approval_list[i].branch_id,
    //       branch_name:data.pending_approval_list[i].branch_name,
    //       region:data.pending_approval_list[i].region,
    //       state:'Active',
    //       product_name:data.pending_approval_list[i].product_name,
    //       // product_quantity_proposed:data.pending_approval_list[i].product_quantity_proposed,
    //       // product_qty:data.pending_approval_list[i].product_quantity_proposed,
    //       // appovedate: data.pending_approval_list[i].approval_generated_date,
    //     })
        
    //     if(i == data.pending_approval_list.length - 1 || data.pending_approval_list.length  == 0 ){
          
    //       this.loaders = false;
    //       console.log(this.loaders);
    //     }
    //   }
    //  // this.uploadOrderList = data;
    //   console.log(this.uploadOrderList);
    //   // console.log(this.AllApprove);
    // }).catch((error)=>{
    //   this.loaders = false;
    //   console.log(error);
    // })


    // this.approvalServices.getList().then((data:any)=>{
    //   console.log(data.proposed_count_by_state);
    //   if(data.proposed_count_by_state.length == 0 ){
    //     // this.AllApprove = false;
    //   }
    //   console.log(data);
    //   for(let i=0;i<data.proposed_count_by_state.length;i++){
    //     this.uploadOrder.push({ 
    //       state:data.proposed_count_by_state[i].state,
    //       count:data.proposed_count_by_state[i].count,
         
    //     })
    //     this.totalCount = this.totalCount + this.uploadOrder[i].count;
    //     if(i ==data.proposed_count_by_state.length-1){
    //     this.loaders = false;
    //     }
        
    //   }
    //  // this.uploadOrderList = data;
    //   console.log(this.uploadOrderList);
    // })


  }
  saveChanged(){
  this.saveAlert = false;
  }
  DiscardChanged(){
    location.reload();
  }
edit(){
  this.Disabled = false;
  this.saveButton = true;
  // this.elementRef.nativeElement.focus();
}
  setOrder(value: string) {
    //console.log("s "+value);
   // console.log(value);
    if(!this.Disabled) return;
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

  // Download(){
  //   var wrongApprovalId =[];
  //   console.log(wrongApprovalId);
  //   for(let i=0; i<this.mslData.length;i++){
  //   console.log(this.mslData[i].product_qty);
  //   if(  this.mslData[i].product_qty < 0){
  //     wrongApprovalId.push(this.mslData[i].approval_id);
  //    // alert("please enter a correct no for "+this.uploadOrderList[i].approval_id +"Approval Id" );
  
  //   }
  //   if(i == this.mslData.length-1){
  //     console.log("in");
  //        if(wrongApprovalId.length){
  //        console.log("lebgth "+ wrongApprovalId.length);
  //         alert(' Please enter a correct quantity greater then 0');
  //        }else{
  //         //  for(let i=0;i<this.uploadOrderList.length;i++){
  //         //    this.totalApproveCount = this.totalApproveCount+  this.uploadOrderList[i].product_qty ;
  //         //    console.log();
  //         //    if(i == this.uploadOrderList.length - 1){
  //         //      console.log(this.totalApproveCount);
  //         //      console.log();
  //         //      this.total = this.totalApproveCount
  //         //     this.alertcheck =true;
  //         //    }
  //         //  }
  //         var obj = [];
  //         for(let i=0;i<this.mslData.length;i++){
  //         obj.push({
  //           Branch_Id:this.mslData[i].branch_id,
  //           Branch_Name:this.mslData[i].branch_name,
  //           Region:this.mslData[i].region,
  //           Product_Name:this.mslData[i].product_name,
  //           min_stock_limit:this.mslData[i].product_quantity_proposed
           
  
  //         })
  //         if(i == this.mslData.length -1){
  //           var d = new Date();
  //           var n = d.toISOString();
          
          
  //         this.filename = "SATIN_Update_MSL"+n;
  //         console.log(obj);
  //         this.excelService.exportAsExcelFile(obj, this.filename);
  //           //   this.csvExporter = new ExportToCsv(this.options);
          
  //           //  this.csvExporter.generateCsv(obj);
  //         }
  //         }
  
          
  
          
  //        }
  // }
  
  
  //   }
  // }

  statusChanged(index){
    if(this.uploadOrderList[((this.p-1)*5) + index].status == 'Active'){
 this.uploadOrderList[((this.p-1)*5) + index].status = 'InActive'
    }else{
      this.uploadOrderList[((this.p-1)*5) + index].status = 'Active'
    }
  }

save(){
  //console.log('in');
  var j = 0 ;
  for(let i=0;i<this.uploadOrderList.length;i++){
    if(!this.uploadOrderList[i].branch_id  || !this.uploadOrderList[i].branch_name || !this.uploadOrderList[i].region || !this.uploadOrderList[i].state){
       j++;
       break;
      //  console.log(j);
    }
    // if(i == this.uploadOrderList.length-1 && j==0){
    //   this.saveAlert = true;
    // }
    // if( j>0){
     
    //   alert('Field cannot be empty');
    // }
  }
  if( j>0) return alert('Field cannot be empty');
  this.saveAlert = true;
}
changedValue(value,event,index,i){
  //console.log(value);
  //console.log(event);
  //console.log(index);
  //console.log(i);
 // console.log(this.p);
 // console.log(this.uploadOrderList);
  this.uploadOrderList[((this.p-1)*5) + i][value] = event;
  
 // console.log(this.uploadOrderList[index].branch_id);


}
  uploadExcel(){
    // this.downloads = true;
     var files = document.getElementById('file');
    // console.log(files);
     files.click();
   
    // console.log(this.downloads);
   }

  



  handleFile(target) {
    this.failureResponses = [];
    this.loaderscheck = true;
    var files = target.files
    // this.alerts = false;
    // this.failurealert = false;
    // console.log(this.failurealert);
     if(files[0].type == "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"){
       this.fileToUpload = files.item(0);
      //  this.alerts = false;
       this.loaderscheck = false;
       this.handleFileInput();
     }
     else{
       this.fileToUpload = undefined;
       this.loaderscheck = false;
       alert("Please upload a file in correct format (xls / xlsx)");
     }
     //console.log(files);
     
     target.value = '';
 }

  handleFileInput() {
    this.loaderscheck = true;
    // console.log(this.fileToUpload);
    // this.uploadAlert = false;
    // this.failurealert = false;
   // console.log(this.id);
    if(!this.fileToUpload){
      // this.alerts = true;
      alert("Please choose a file to upload");
      this.loaderscheck = false;
    }
    else {
      // this.successalert =true;
      // this.boxupload = false;
      this.approvalServices.uploadApprove(this.fileToUpload)
    .then((data:any)=>{
   // console.log(data);
   this.loaderscheck = false;
   if(data.success && data.success.length && !data.failure.length){
        // this.downloads = true;
        this.uploadFileSuccess = data.success.length
   }else{
     
   
    //  this.checks = false;
    //  this.failurealert = true;
    //  this.alertBoxs = true;
     this.failurelength = data.failure.length;
    //console.log(data.failure[0].approval_id);
     for(let i=0;i<data.failure.length;i++){
       this.failureResponses.push({
         approval_id: data.failure[i].approval_id,
         status: data.failure[i].status,
         Remarks: data.failure[i].Remarks
       })
       
        if(i== data.failure.length-1){
       //   alert(data.failure.length+' failure while Uploading file ');
          console.log(this.failureResponses);
        }
     }
 


   }
  //  this.successResponse = data.success;
  //  if(this.successResponse &&this.successResponse.length){
  //   this.downloads = true;
  //   this.successalert =true;
  //  }
   
  //    this.failureResponse = data.failure;
  //    if(this.failureResponse.length){
  //     //alert("File data incorrect")
  //     this.failurealert = true;
  //    }
     
  //    console.log(this.failureResponse);


    },(error:any)=>{
      this.loaderscheck = false;
      var errorsMessage =error.error.Error.MessageToUser; 
     // console.log(errorsMessage);
      alert(errorsMessage);
    }).catch(error =>
       console.log(error)
       );
      
    }//else
    

    
}

}