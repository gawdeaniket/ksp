import { Component, OnInit } from '@angular/core';
import {BranchUploadInvoiceService} from '../../services/branch/branch-upload-invoice.service'
@Component({
  selector: 'app-uploadinvoice',
  templateUrl: './uploadinvoice.component.html',
  styleUrls: ['./uploadinvoice.component.scss']
})
export class UploadinvoiceComponent implements OnInit {
  fileToUpload: File = null;
  fileName: any;
  failureResponse: any[];
  alerts: boolean= false;
  constructor(
    private branchuploadinvoiceservice: BranchUploadInvoiceService
  ) { }

  ngOnInit() {}

  handleFile(files: FileList) {
    console.log(files);
    
    this.fileToUpload = files.item(0);
    this.alerts = false;
    
}

  handleFileInput() {
    if(!this.fileToUpload){
      this.alerts = true;
    }
    else {

      this.branchuploadinvoiceservice.postFile(this.fileToUpload,'uploadInvoice')
    .then((data:any)=>{
   console.log(data);
     this.failureResponse = data.failure;
     console.log(this.failureResponse);


    })
      
    }//else
    
}

}
