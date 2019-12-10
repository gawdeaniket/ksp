import { Injectable } from '@angular/core';
import {  HttpClient,HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private httpClient: HttpClient) { }

  login(uploadData){
    const endpoint = 'https://lmd.glpapps.com/mfi-lmd/v1.0/ksp-portal/login';
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
}
