import { Component, OnInit,ElementRef } from '@angular/core';
import {BranchUploadInvoiceService} from '../../services/branch/branch-upload-invoice.service'
import { ActivatedRoute,Router } from '@angular/router';
import { map } from 'rxjs/operators';

@Component({
  host: {
    '(document:click)': 'onClick($event)',
  },
  selector: 'app-upload-invoice',
  templateUrl: './upload-invoice.component.html',
  styleUrls: ['./upload-invoice.component.scss']
})
export class UploadInvoiceComponent implements OnInit {
  
  fileToUpload: File = null;
  fileName: any;
  failureResponse: any[];
  alerts: boolean= false;
  uploadAlert:boolean = false;
  state$:any;
  id:any;
  successResponse:any[];
  successalert:boolean = false;
  heading: any;
  failurealert:boolean = false;
  constructor(private _router:Router,private branchuploadinvoiceservice: BranchUploadInvoiceService,public activatedRoute: ActivatedRoute,private _eref: ElementRef) { }

  ngOnInit() {
     this.id = this.activatedRoute.snapshot.paramMap.get('id');
    // console.log(this.id);
     if( this.id =='markDeliverd'){
       this.heading = "Mark Deliverd";
     }else {
      this.heading = "Upload Invoice";
     }
  }
  upload(){
    this.uploadAlert = true;
    this.fileToUpload = null;
  }
  onClick(event) {
   if (!this._eref.nativeElement.contains(event.target)) {
   this.uploadAlert = false;
  }
}

 handleFile(files: FileList) {
  // console.log(files);
   this.alerts = false;
   this.failurealert = false;
    if(files[0].type == "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"){
      this.fileToUpload = files.item(0);
      this.alerts = false;
    }
    else{
      this.fileToUpload = undefined;
      alert("Please upload a file in correct format (xls / xlsx)");
    }
   
}
home(){
  this._router.navigate(['ksp/invoicemanagement']);
}
reload(){
  location.reload();
}
  handleFileInput() {

    this.uploadAlert = false;
   // console.log(this.id);
    if(!this.fileToUpload){
      // this.alerts = true;
      alert("Please choose a file to upload");
    }
    else {
      this.branchuploadinvoiceservice.postFile(this.fileToUpload, this.id)
    .then((data:any)=>{
  // console.log(data);
   this.successResponse = data.success;
   if(this.successResponse.length){
    this.successalert =true;
   }
   
     this.failureResponse = data.failure;
     if(this.failureResponse.length){
      this.failurealert = true;
     }
     
    // console.log(this.failureResponse);


    },(error:any)=>{
      var errorsMessage =error.error.Error.MessageToUser; 
     // console.log(errorsMessage);
      alert(errorsMessage);
    }).catch(error => console.log(error));
      
    }//else
    
}

}
