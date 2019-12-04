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
  loading:boolean = false;
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
   this.loading = true;
   console.log(files[0].type);
    if(files[0].type == "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" || files[0].type == 'application/vnd.ms-excel'){
      this.fileToUpload = files.item(0);
      this.alerts = false;
      this.loading = false;
    }
    else{
      this.fileToUpload = undefined;
      this.loading = false;
      setTimeout(() => {
        alert("Please upload a file in correct format (xls / xlsx)");
      }, 600);
      
    }
   
}
home(){
  this._router.navigate(['ksp/invoicemanagement']);
}
reload(){
  location.reload();
}
  handleFileInput() {
    this.loading = true;
    this.uploadAlert = false;
   // console.log(this.id);
    if(!this.fileToUpload){
      // this.alerts = true;
      this.loading = false;
      setTimeout(() => {
        alert("Please choose a file to upload");
      }, 600);
      
    }
    else {
      this.branchuploadinvoiceservice.postFile(this.fileToUpload, this.id)
    .then((data:any)=>{
   console.log(data);
   this.loading = false;
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
      this.loading = false;
      var errorsMessage =error.error.Error.MessageToUser; 
      console.log(errorsMessage);
      setTimeout(() => {
        alert(errorsMessage);
      }, 600);
      
    }).catch(error => console.log(error));
      
    }//else
    
}

}
