import { Injectable } from '@angular/core';
import {  HttpClient,HttpHeaders } from '@angular/common/http';
import { stat } from 'fs';
@Injectable({
  providedIn: 'root'
})
export class LmdService {

  constructor(private httpClient:HttpClient) { }

  getAllAgent(state){
    const userdetails = {
      "state": state
    }
  const endpoint = 'https://lmd.glpapps.com/mfi-lmd/v1.0/ksp-portal/user/search';
  let headers: HttpHeaders = new HttpHeaders();
  headers = headers.append('Accept', 'application/json');
  return new Promise((resolve, reject) => {
    this.httpClient.post(endpoint, userdetails, { headers: headers })
    .subscribe((data)=>{
      resolve(data);
    }, (err) =>{
      reject(err);
    })
  })  
  }

  getHub(state){
    const userdetails = {
      "state": state
    }
    // console.log(userdetails);
  const endpoint = 'https://lmd.glpapps.com/mfi-lmd/v1.0/ksp-portal/hubs';
  let headers: HttpHeaders = new HttpHeaders();
  headers = headers.append('Accept', 'application/json');
  return new Promise((resolve, reject) => {
    this.httpClient.post(endpoint, userdetails, { headers: headers })
    .subscribe((data)=>{
      resolve(data);
    }, (err) =>{
      reject(err);
    })
  })  
  }

  createUser(userDetails){
    
    console.log(userDetails);
  const endpoint = 'https://lmd.glpapps.com/mfi-lmd/v1.0/ksp-portal/user/create';
  let headers: HttpHeaders = new HttpHeaders();
  headers = headers.append('Accept', 'application/json');
  return new Promise((resolve, reject) => {
    this.httpClient.post(endpoint, userDetails, { headers: headers })
    .subscribe((data)=>{
      resolve(data);
    }, (err) =>{
      reject(err);
    })
  })  
  }

  deactivatedAgent(mobileNo){
    const userdetails = {
      "mobile" : mobileNo
    }
    // console.log(userdetails);
    const endpoint = 'https://lmd.glpapps.com/mfi-lmd/v1.0/ksp-portal/user/deactivate';
  let headers: HttpHeaders = new HttpHeaders();
  headers = headers.append('Accept', 'application/json');
  return new Promise((resolve, reject) => {
    this.httpClient.post(endpoint,userdetails,  { headers: headers })
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
  //       // console.log(data);
  //     })
  //   })
  // }
}
