import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {FormGroup,FormBuilder,Validators} from '@angular/forms';
import {LoginService} from '../services/login/login.service'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public loginform:FormGroup ;
  pass_user: boolean = false;
  email_user: boolean= false;
  constructor(private _router: Router,public formbuilder:FormBuilder,public details:LoginService) { 
    this.loginform = this.formbuilder.group({
      email:['',[Validators.required]],
      pass: ['',[Validators.required] ],
      
  
   });
  }

  ngOnInit() {
  }

  
  login(email, password ){
  	let obj = {username: email, password: password};
  
  	
    console.log(obj);
    console.log(this.loginform.invalid);
  
  	if(this.loginform.invalid){
  		
  		this.email_user = true;
  		this.pass_user = true;
    return;
  	}
  	else{
  	 this.details.login(obj ).then((result:any) => {
     // var data:any ={username:result.username,client_id:result.client_id,branch_id:result.branch_id,role:result.role};
      localStorage.setItem('loginInfo', JSON.stringify(result));
     // console.log(data);
      if(result.role == 'HO'){
      //  var check:any =JSON.parse( localStorage.getItem('loginInfo') );
        //console.log(check);
       console.log(JSON.parse( localStorage.getItem('loginInfo')) );
        this._router.navigate(['dashboardHo']);
      }else if(result.role == 'branch'){
        this._router.navigate(['dashboard']);
      }
     
    }, (err) => {
     alert(err);
    });
  	}
 }

  // dashboard(){
  //   this._router.navigate(['dashboardHo']);
     
  // }

}
