import { Injectable } from '@angular/core';
import {  HttpClient,HttpHeaders } from '@angular/common/http';
import { Observable, Subscriber } from 'rxjs';
import {EnvironmentService} from '../environment/environment.service'
@Injectable({
  providedIn: 'root'
})
export class HomeBranchService {

  commonValue:any;
  constructor(private httpClient: HttpClient,private envir: EnvironmentService) {
    this.commonValue =  this.envir.globalvalue();
   }

allData() {
  this.commonValue =  this.envir.globalvalue();
  const endpoint = this.commonValue.endpoint+'mfi-branch/v1.0/receive/'+this.commonValue.client_id+'/'+this.commonValue.branch_id;
  let headers: HttpHeaders = new HttpHeaders();
  headers = headers.append('Accept', 'application/json');
  return new Promise((resolve, reject) => {
    this.httpClient.get(endpoint,  { headers: headers })
    .subscribe((data)=>{
      resolve(data);
    }, (err) =>{
      reject(err);
    })
  })
}
markreceived(markedItem){
  this.commonValue =  this.envir.globalvalue();
  const endpoint =this.commonValue.endpoint+'mfi-branch/v1.0/receive/'+this.commonValue.client_id;
  let headers: HttpHeaders = new HttpHeaders();
  headers = headers.append('Accept', 'application/json');
  return new Promise((resolve, reject) => {
    this.httpClient.post(endpoint,markedItem,  { headers: headers })
    .subscribe((data)=>{
      resolve(data);
    }, (err) =>{
      reject(err);
    })
  })
}



}