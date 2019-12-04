import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import {MslService} from '../../services/ho/msl.service';
import {ApprovalService} from '../../services/ho/approval.service';
import {ExcelService} from '../../services/excel.service';
import { promise } from 'protractor';
import { async } from 'rxjs/internal/scheduler/async';
@Component({
  selector: 'app-upload-msl',
  templateUrl: './upload-msl.component.html',
  styleUrls: ['./upload-msl.component.scss']
})
export class UploadMslComponent implements OnInit {
  @ViewChild('target') private target: ElementRef;
  p: any;
  order: string = 'info.name';
  reverse: boolean = false;
  viewAllDelivery:any;
  searchText:any;
  date:any;
  loaderscheck: boolean;
  alerts: boolean;
  failurealert: boolean;
  fileToUpload: any;
  // uploadAlert: boolean;
  mslData:any[] = [];
  loaders: boolean = true;
  filename: string;
  alertcheck:boolean = false;
  successUploadAlert:boolean = false;
  failureResponses:any[] = [];
  updateAlert:boolean = false;
  successFileCount:number = 0;
  alertBoxs:boolean = false;
  failurelength:number = 0;
  successupdate:boolean = false;
  macCheck:boolean = false;
  constructor(private excelService:ExcelService,private mslServices:MslService) { }

  ngOnInit() {
    this.macCheck = false;
  var isMacLike = /(Mac|iPhone|iPod|iPad|MAC|MacIntel)/i.test(navigator.platform);
  //console.log(isMacLike);
 if(isMacLike) this.macCheck = true;
    this.getdata();

   

  }
  getdata(){
    this.loaders = true;
    this.mslData = [];
  // console.log("refresh");
    this.mslServices.getList().then((data:any)=>{
      if(!data ||data.msl_list.length == 0   ){
        
        this.loaders = false;
      }
    //  console.log(data);
     
      var j=0;
      for(let i=0;i<data.msl_list.length;i++){
        this.mslData.push({ 
          no:j++,
          branch_id:data.msl_list[i].branch_id,
          branch_name:data.msl_list[i].branch_name,
          region:data.msl_list[i].region,
          state:data.msl_list[i].state,
          product_name:data.msl_list[i].product_name,
          product_quantity_proposed:data.msl_list[i].min_stock_limit,
          product_qty:data.msl_list[i].min_stock_limit,
          appovedate: data.msl_list[i].approval_generated_date,
        })
        
        if(i == data.msl_list.length - 1 || data.msl_list.length  == 0 ){
          
         this.loaders = false;
        //  console.log(this.loaders);
        }
      }
     // this.uploadOrderList = data;
      // console.log(this.uploadOrderList);
      // console.log(this.AllApprove);
    }).catch((error)=>{
     // console.log(error)
      this.loaders = false;
    })

  
  }
  pagechanged(event){
    this.p = event;
  }
  uploadmsl(){
    this.failurealert = false;
    // this.downloads = true;
     var files = document.getElementById('file');
    // console.log(files);
     files.click();
   
    // console.log(this.downloads);
   }
   setOrder(value: string) {
   // console.log("s "+value);
   // console.log(value);
    if (this.order === value) {
      this.reverse = !this.reverse;
    }
   if(this.reverse){
    this.mslData.sort(function(a, b){
      var x =  a[value].toLowerCase()  ;
      var y = b[value].toLowerCase()  ;
      if (x < y) {return -1;}
      if (x > y) {return 1;}
      return 0;
    });
  }else {

    this.mslData.sort(function(a, b){
      var x =  a[value].toLowerCase()  ;
      var y = b[value].toLowerCase()  ;
      if (x > y) {return -1;}
      if (x < y) {return 1;}
      return 0;
    });

  }
    this.order = value;
  }
   handleFile(target) {
    this.loaderscheck = true;
    var files = target.files
    this.alerts = false;
    this.failurealert = false;
   // console.log(this.failurealert);
     if(files[0].type == "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"){
       this.fileToUpload = files.item(0);
       this.alerts = false;
       this.loaderscheck = false;
       this.handleFileInput();
     }
     else{
       this.fileToUpload = undefined;
       this.loaderscheck = false;
       alert("Please upload a file in correct format (xls / xlsx)");
     }
    // console.log(files);
     
     target.value = '';
 }

  handleFileInput() {
    this.failureResponses = [];
    this.loaderscheck = true;
    this.failurealert = false;
   //  console.log(this.fileToUpload);
    // this.uploadAlert = false;
    this.failurealert = false;
    this.alertBoxs = false;
   // console.log(this.id);
    if(!this.fileToUpload){
      // this.alerts = true;
      alert("Please choose a file to upload");
      this.loaderscheck = false;
    }
    else {
      // this.successalert =true;
      // this.boxupload = false;
      this.mslServices.uploadApprove(this.fileToUpload)
    .then((data:any)=>{
  // console.log(data);
   this.loaderscheck = false;
   if(data.success && data.success.length && !data.failure.length ){
        this.updateAlert = true;
        this.successFileCount = data.success.length;
      //  console.log(this.updateAlert)
      //  console.log(this.successFileCount);
   }
   if(data.failure && data.failure.length){
    
   this.failurelength = data.failure.length
    this.alertBoxs = true;
    this.failurealert = true;
    for(let i=0;i<data.failure.length;i++){
       this.failureResponses.push({
         approval_id: data.failure[i].branch_id,
         status: data.failure[i].status,
         Remarks: data.failure[i].remarks
       })
       
        if(i== data.failure.length-1){
          
        //  this.target.nativeElement.scrollIntoView();
        //   console.log(this.target);
          // window.scrollTo(0,document.body.scrollHeight);
          
       //   alert(data.failure.length+' failure while Uploading file ');
         // console.log(this.failureResponses);
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
    //  console.log(errorsMessage);
      alert(errorsMessage);
    }).catch(error => console.log(error));
      
    }//else
    
}

Download(){
  var wrongApprovalId =[];
 // console.log(wrongApprovalId);
  for(let i=0; i<this.mslData.length;i++){
 // console.log(this.mslData[i].product_qty);
  if(  this.mslData[i].product_qty < 0){
    wrongApprovalId.push(this.mslData[i].approval_id);
   // alert("please enter a correct no for "+this.uploadOrderList[i].approval_id +"Approval Id" );

  }
  if(i == this.mslData.length-1){
  //  console.log("in");
       if(wrongApprovalId.length){
     //  console.log("lebgth "+ wrongApprovalId.length);
        alert(' Please enter a correct quantity greater then 0');
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
        for(let i=0;i<this.mslData.length;i++){
        obj.push({
          Branch_Id:this.mslData[i].branch_id,
          Branch_Name:this.mslData[i].branch_name,
          Region:this.mslData[i].region,
          Product_Name:this.mslData[i].product_name,
          min_stock_limit:this.mslData[i].product_quantity_proposed
         

        })
        if(i == this.mslData.length -1){
          var d = new Date();
          var n = d.toISOString();
        
        
        this.filename = "SATIN_Update_MSL"+n;
       // console.log(obj);
        this.excelService.exportAsExcelFile(obj, this.filename);
          //   this.csvExporter = new ExportToCsv(this.options);
        
          //  this.csvExporter.generateCsv(obj);
        }
        }

        

        
       }
}


  }
}

changedValue(event,i){
 // console.log(event);
  if(event > 0 ){
    this.mslData[i].product_qty= event;
  }
  else {
  //    this.mslData[i].product_qty= null;
  //  alert("please enter Value In Multiple Of 5");
  }
  
 // console.log(typeof event)
// console.log( this.mslData[i].product_quantity_proposed)

} 

increase(index){
  if( this.mslData[index].product_qty >-1 ){
  this.mslData[index].product_qty = this.mslData[index].product_qty + 1;
  }
}
decrease(index){
 
  if(this.mslData[index].product_qty >1){
  this.mslData[index].product_qty = this.mslData[index].product_qty - 1;
  }
}

save(){
  // this.total = 0;
  // this.totalApproveCount = 0;
   this.failurealert = false;
    var j = 0;
    
    for(let i=0; i<this.mslData.length;i++){
    //console.log(this.mslData[i].product_qty);
    
    if(  !this.mslData[i].product_qty || this.mslData[i].product_qty <0 ){
      j++;
   
    }
    if(i == this.mslData.length-1){
    //  console.log("in");
         if(j>0){
        
          alert(' Please enter a correct MSL value ' ) ;
         }else{
          this.alertcheck =true;
        //  console.log(this.alertcheck)
         }
  
  
    }
    
  }
    
    
  }

  updateMsl(){

    this.successUploadAlert = false;
  var sendItem:any[] = []

  for(let i=0; i<this.mslData.length;i++){
   // console.log(this.mslData[i].product_quantity_proposed);
    //  console.log(this.mslData[i].product_qty);

    sendItem.push({
        "branch_id":this.mslData[i].branch_id.toString(),
        "product_name": this.mslData[i].product_name,
        "msl": this.mslData[i].product_qty.toString()
      
          });

          if(i == this.mslData.length-1){
            
          //  console.log(sendItem);
            this.mslServices.PostList(sendItem).then((data:any)=>{
            //  console.log(data.failure);
              if(data.failure.length == 0 ){
                this.alertcheck = false;
                this.loaders = true;
                 this.mslData = [];
                  this.getdata()
                   this.successUploadAlert = true;
                  // console.log(this.successUploadAlert);
               
                
            //     this.alertcheck = false;
            // this.AllApprove = false;
            //   this.uploadOrderList = [];
            //   this.modifyContent = true;
            //   this.modifyButton = false;
            //   this.downloadButton = false;
            //   this.searchbox = false;
            //   this.successUploadAlert = true;
            //  // this.alertBox = true;
            //   this.successUploadAlert = true;
            //   console.log("checking....");
              }else{
                alert('Incorrect Data Field');
                this.alertcheck = false;
                // console.log("checking....");
                // this.alertcheck = false;
                // this.failureResponse = data.failure;
                // this.failurealert = true;
              }
             // console.log(data);
            }).catch((error)=>{
              this.loaders = false;
             // this.alertBox = true;
              
              this.alertcheck = false;
            // alert(error.error.Error.MessageToUser);
            })

 }
  }

}

clearValue(){
  for(let i=0;i<this.mslData.length;i++){
   
     
    this.mslData[i].product_qty = this.mslData[i].product_quantity_proposed;
   
  }

}

approvedupload(){
  this.loaders = true;
  this.updateAlert = false;
  this.successupdate = false;
  
this.mslServices.Approvefile(this.fileToUpload).then((data:any)=>{
  this.loaderscheck = false;
//console.log(data);
this.loaders = false;

if(data.success){
  
this.getdata();
this.successupdate = true;
}
  


}).catch((err)=>{
alert("Something went wrong Please try again later")
})
}
back(){
  this.failurealert = false
  this.alertBoxs = false;
}
}
