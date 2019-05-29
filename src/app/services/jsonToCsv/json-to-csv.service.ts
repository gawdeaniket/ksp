import { Injectable } from '@angular/core';
import {  HttpClient,HttpHeaders } from '@angular/common/http';
import { Observable, Subscriber } from 'rxjs';
import {EnvironmentService} from '../environment/environment.service'

@Injectable({
  providedIn: 'root'
})
export class JsonToCsvService {

  commonValue:any ;
  constructor(private httpClient:HttpClient,private envir:EnvironmentService) {
  this.commonValue =  this.envir.globalvalue();
   }

   stateWise(){
    let headers: HttpHeaders = new HttpHeaders();
    headers = headers.append('Accept', 'application/json');
    
        return new Promise((resolve, reject) => {
          
          this.httpClient.get(this.commonValue.endpoint+'mfi-branch/v1.0/ho-state-summary/'+this.commonValue.client_id,  { headers: headers })
          .subscribe((data)=>{
             resolve(data);
          })
    
        })

   }
   branchWise(){

    let headers: HttpHeaders = new HttpHeaders();
    headers = headers.append('Accept', 'application/json');
    
        return new Promise((resolve, reject) => {
          
          this.httpClient.get(this.commonValue.endpoint+'mfi-branch/v1.0/ho-branch-summary/'+this.commonValue.client_id,  { headers: headers })
          .subscribe((data)=>{
             resolve(data);
          })
    
        })

   }
   customerWise(){

    let headers: HttpHeaders = new HttpHeaders();
    headers = headers.append('Accept', 'application/json');
    
        return new Promise((resolve, reject) => {
          
          this.httpClient.get(this.commonValue.endpoint+'mfi-branch/v1.0/orders/'+this.commonValue.client_id,  { headers: headers })
          .subscribe((data)=>{
             resolve(data);
          })
    
        })

   }
}
