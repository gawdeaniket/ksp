import { Injectable } from '@angular/core';
import {  HttpClient,HttpHeaders } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class LmdService {

  constructor(private httpClient:HttpClient) { }

  getAllAgent(){
    
  const endpoint = '';
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

  deactivatedAgent(){
    const endpoint = '';
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
  // getState(){
  //   return new Promise((resolve, reject) => {
  //     this.httpClient.get('../../ksp/home-registration/state.json')
  //     .subscribe((data)=>{
  //       resolve(data);
  //       console.log(data);
  //     })
  //   })
  // }
}
