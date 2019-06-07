import { Injectable } from '@angular/core';
import {  HttpClient,HttpHeaders } from '@angular/common/http';
import { Observable, Subscriber } from 'rxjs';
import {EnvironmentService} from '../environment/environment.service'

@Injectable({
  providedIn: 'root'
})
export class DownloadInvoiceService {

  commonValue:any;
  constructor(private httpClient:HttpClient,private envir:EnvironmentService) { 
    this.commonValue =  this.envir.globalvalue();
  }
    
  downloadInvoice(){
    //{{server}}mfi-branch/v1.0/disbursal/{{client_id}}?branch-id={{branch_id}}
// console.log("get");
    const endpoint = this.commonValue.endpoint+'mfi-branch/v1.0/get-disbursal/'+this.commonValue.client_id+ '?branch-id=' + this.commonValue.branch_id;

    // const formData: FormData = new FormData();
    // formData.append('invoice-file', fileToUpload);
  
    let headers: HttpHeaders = new HttpHeaders();
  headers = headers.append('Accept', 'application/json');
  
      return new Promise((resolve, reject) => {
           
        this.httpClient.get(endpoint,  { headers: headers })
        .subscribe((data)=>{
           resolve(data);
        })
  
      })
     
  }

}
