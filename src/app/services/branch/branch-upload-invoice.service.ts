import { Injectable } from '@angular/core';
import {  HttpClient,HttpHeaders } from '@angular/common/http';
import { Observable, Subscriber,throwError } from 'rxjs';
import {EnvironmentService} from '../environment/environment.service';

@Injectable({
  providedIn: 'root'
})
export class BranchUploadInvoiceService {

  commonValue:any;
  constructor(private httpClient:HttpClient,private envir:EnvironmentService) {
    this.commonValue =  this.envir.globalvalue();
   }

  postFile(fileToUpload: File, state) {
    console.log(state);
    var endpoint;
    const formData: FormData = new FormData();
    if(state == 'uploadInvoice'){
      console.log("invoice")
       endpoint = this.commonValue.endpoint+'mfi-branch/v1.0/upload-invoice/'+this.commonValue.client_id;
       formData.append('invoice-file', fileToUpload);
    }else{
      endpoint = this.commonValue.endpoint+'mfi-branch/v1.0/upload-delivery/'+this.commonValue.client_id;
      formData.append('delivery-file', fileToUpload);
    }
    console.log(fileToUpload);
   
    
    

    let headers: HttpHeaders = new HttpHeaders();
headers = headers.append('Accept', 'application/json');

      return new Promise((resolve, reject) => {
           
        this.httpClient.post(endpoint, formData, { headers: headers })
        .subscribe((data)=>{
           resolve(data);
        },
        (error)=>{
         
          reject(error);
        })

      })

  
     
}


}

