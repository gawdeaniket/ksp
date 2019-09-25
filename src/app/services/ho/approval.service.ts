import { Injectable } from '@angular/core';
import {  HttpClient,HttpHeaders } from '@angular/common/http';
import { Observable, Subscriber } from 'rxjs';
import {EnvironmentService} from '../environment/environment.service'
@Injectable({
  providedIn: 'root'
})
export class ApprovalService {
  commonValue:any ;
  constructor(private httpClient:HttpClient,private envir:EnvironmentService) {
    this.commonValue =  this.envir.globalvalue();
  }
  getList(){
    this.commonValue =  this.envir.globalvalue();
    let headers: HttpHeaders = new HttpHeaders();
    headers = headers.append('Accept', 'application/json');
    return new Promise((resolve, reject) => {
      this.httpClient.get(this.commonValue.endpoint+'mfi-branch/v1.0/order-approval/'+this.commonValue.client_id,  { headers: headers })
      .subscribe((data)=>{
        resolve(data);
      },(error)=>{
        reject(error)
      })
    })
  }
  PostList(uploadData){
    this.commonValue =  this.envir.globalvalue();
    const endpoint = this.commonValue.endpoint+'mfi-branch/v1.0/approval/'+this.commonValue.client_id;
    let headers: HttpHeaders = new HttpHeaders();
    headers = headers.append('Accept', 'application/json');
    return new Promise((resolve, reject) => {
      this.httpClient.post(endpoint,  uploadData,{ headers: headers })
      .subscribe((data)=>{
        resolve(data);
      },
      (error)=>{
        reject(error);
      })
    })
  }
  uploadApprove(fileToUpload){
    this.commonValue =  this.envir.globalvalue();
    const formData: FormData = new FormData();
    let endpoint = this.commonValue.endpoint+'mfi-branch/v1.0/upload-approval-file/'+this.commonValue.client_id+"?is_validated=false";
    formData.append('approval_file', fileToUpload);
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
  Approvefile(fileToUpload){
    this.commonValue =  this.envir.globalvalue();
    const formData: FormData = new FormData();
    var endpoint = this.commonValue.endpoint+'mfi-branch/v1.0/upload-approval-file/'+this.commonValue.client_id+'?is_validated=true';
    formData.append('approval_file', fileToUpload);
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
