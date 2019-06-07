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
  
   // const endpoint = 'http://52.205.99.171:7777/mfi-branch/v1.0/order-approval/CL001';
    // const formData: FormData = new FormData();
    // formData.append('invoice-file', fileToUpload);
  
    let headers: HttpHeaders = new HttpHeaders();
  headers = headers.append('Accept', 'application/json');
  
      return new Promise((resolve, reject) => {
           
        this.httpClient.get(this.commonValue.endpoint+'mfi-branch/v1.0/order-approval/'+this.commonValue.client_id,  { headers: headers })
        .subscribe((data)=>{
           resolve(data);
        })
  
      })


  }

  PostList(uploadData){

    const endpoint = this.commonValue.endpoint+'mfi-branch/v1.0/approval/'+this.commonValue.client_id;
    // const formData: FormData = new FormData();
    // formData.append('invoice-file', fileToUpload);
  console.log(endpoint);
    let headers: HttpHeaders = new HttpHeaders();
  headers = headers.append('Accept', 'application/json');
  
      return new Promise((resolve, reject) => {
           
        this.httpClient.post(endpoint,  uploadData,{ headers: headers })
        .subscribe((data)=>{
           resolve(data);
        })
  
      })


  }


  uploadApprove(fileToUpload){
    
     
      console.log(fileToUpload);
     
      const formData: FormData = new FormData();
     var endpoint = this.commonValue.endpoint+'mfi-branch/v1.0/upload-approval-file/'+this.commonValue.client_id;
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
