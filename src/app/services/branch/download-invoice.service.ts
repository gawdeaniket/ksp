import { Injectable } from '@angular/core';
import {  HttpClient,HttpHeaders } from '@angular/common/http';
import { Observable, Subscriber } from 'rxjs';
import {EnvironmentService} from '../environment/environment.service'

@Injectable({
  providedIn: 'root'
})
export class DownloadInvoiceService {
  commonValue: any;
  constructor(private httpClient: HttpClient,
              private envir: EnvironmentService) { 
    this.commonValue =  this.envir.globalvalue();
  }
  downloadInvoice(){
    this.commonValue =  this.envir.globalvalue();
    const endpoint = this.commonValue.endpoint+'mfi-branch/v1.0/get-disbursal/'+this.commonValue.client_id+ '?branch-id=' + this.commonValue.branch_id;
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
