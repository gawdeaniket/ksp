import { Component, OnInit } from '@angular/core';
import { LmdService } from '../../services/ksp/lmd.service';
import { FormGroup, FormArray, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';
@Component({
  selector: 'app-home-registration',
  templateUrl: './home-registration.component.html',
  styleUrls: ['./home-registration.component.scss']
})
export class HomeRegistrationComponent implements OnInit {

  filterContainer: boolean = true;
  state: any[] = [
    {
      "key": "AP",
      name: "Andhra Pradesh"
    },
    {
      "key": "AR",
      name: "Arunachal Pradesh"
    },
    {
      "key": "AS",
      name: "Assam"
    },
    {
      "key": "BR",
      name: "Bihar"
    },
    {
      "key": "CG",
      name: "Chandigarh"
    },
    {
      "key": "CH",
      name: "Chhattisgarh"
    },
    {
      "key": "DH",
      name: "Dadra and Nagar Haveli"
    },
    {
      "key": "DD",
      name: "Daman and Diu"
    },
    {
      "key": "DL",
      name: "Delhi"
    },
    {
      "key": "GA",
      name: "Goa"
    },
    {
      "key": "GJ",
      name: "Gujarat"
    },
    {
      "key": "HR",
      name: "Haryana"
    },
    {
      "key": "HP",
      name: "Himachal Pradesh"
    },
    {
      "key": "JK",
      name: "Jammu and Kashmir"
    },
    {
      "key": "JH",
      name: "Jharkhand"
    },
    {
      "key": "KA",
      name: "Karnataka"
    },
    {
      "key": "KL",
      name: "Kerala"
    },
    {
      "key": "LD",
      name: "Lakshadweep"
    },
    {
      "key": "MP",
      name: "Madhya Pradesh"
    },
    {
      "key": "MH",
      name: "Maharashtra"
    },
    {
      "key": "MN",
      name: "Manipur"
    },
    {
      "key": "ML",
      name: "Meghalaya"
    },
    {
      "key": "MZ",
      name: "Mizoram"
    },
    {
      "key": "NL",
      name: "Nagaland"
    },
    {
      "key": "OR",
      name: "Odisha"
    },
    {
      "key": "PY",
      name: "Puducherry"
    },
    {
      "key": "PB",
      name: "Punjab"
    },
    {
      "key": "RJ",
      name: "Rajasthan"
    },
    {
      "key": "SK",
      name: "Sikkim"
    },
    {
      "key": "TN",
      name: "Tamil Nadu"
    },
    {
      "key": "TS",
      name: "Telangana"
    },
    {
      "key": "TR",
      name: "Tripura"
    },
    {
      "key": "UK",
      name: "Uttar Pradesh"
    },
    {
      "key": "UP",
      name: "Uttarakhand"
    },
    {
      "key": "WB",
      name: "West Bengal"
    }
  ]
  singInDetails: FormGroup;
  allAgent: any[] = [];
  filterAgent: any[] = []
  valiadtionMessage = {
    Agentname: {
      'required': 'Agent name is required',
    },
    MobileNo: {
      'required': 'Phone is required',
      'pattern': 'Moblie no should be in 10 digits'

    },
    Hub: {
      'required': 'Hub is required',
      'hubSelectionValidation': 'Please select the correct Hub'
    }
  };

  formsError: any = {
    AgentName: '',
    MobileNo: '',
    Hub: ''
  }
  hubsValidation: boolean = true;
  filterState: any[] = [];
  searchAgentName: string;
  agentselection: any = {};
  loginUserState: string = 'odisha'
  deactivatedAlert: boolean = false;
  hubs: any[] = [];
  filterHubs: any[] = []
  filterHubView: boolean = false;
  createUserAlert: boolean = false;
  CreateUserDetails:any;
  newUser:any;
  deleteeUserAlert:boolean = false;
  newUserAlert:boolean = false;

  constructor(private lmd: LmdService, private fb: FormBuilder, private _router: Router) {
    if (!localStorage.getItem('kspState')) {
      this._router.navigate(['login']);
    } else {
      this.loginUserState = JSON.parse(localStorage.getItem('kspState'));
    }
    this.lmd.getAllAgent(this.loginUserState)
      .then((data: any) => {
        this.allAgent = data;
      })
    this.lmd.getHub(this.loginUserState).then((data: any[]) => {
      this.hubs = data;
    })
    this.singInDetails = this.fb.group({
      Agentname: ['', [Validators.required]],
      MobileNo: ['', [Validators.required, Validators.pattern('[0-9]{10}')]],
      state: [''],
      Hub: ['', [Validators.required]],
    });

    this.singInDetails.valueChanges
      .subscribe((value) => {
        this.newUser = {};
        this.CreateUserDetails = value;
        // if (value.state) {
        //   // console.log(value.state);
        // }
        this.loadData(this.singInDetails);
      });
    this.singInDetails.get('Hub').valueChanges
      .subscribe((value: any) => {
        if (value) {
          this.hubsValidation = false;
          //this.filterHubView = false;
          this.filterHubs = this.hubs.filter((data) => {
            return data.toLowerCase().indexOf(value.toLowerCase()) !=-1
          });
          const filterData = this.hubs.find((data) => {
            // console.log(data == value);
            return data == value;
          });
          // if(filterData){
          //    this.hubsValidation = true;
          // }else{
          //   this.hubsValidation = false;
          // }
          // // console.log(this.hubs);
          // console.log(this.hubsValidation);
        } else {
          //this.filterHubView = true;
          this.filterHubs = [];
        }

      })
  }

  ngOnInit(){}
  selectState(stateName) {
    this.singInDetails.patchValue({
      state: stateName
    });
    this.singInDetails.get('Hub').enable();
    this.filterState = [];
  }
  selectHub(stateName) {
    this.singInDetails.patchValue({
      Hub: stateName
    });
    this.filterHubView = false;
    this.hubsValidation = true;
    this.filterHubs = [];
  }
  searchByAgent(event) {
    this.agentselection = {};
    if (!this.searchAgentName) return this.filterAgent = [];
    this.filterAgent = this.allAgent.filter((data) => {
      const firstName = data.name.split(" ")[0];
      const lastName = data.name.split(" ")[1];
     if(lastName){
      return ( firstName.toLowerCase().indexOf(this.searchAgentName.toLowerCase()) !=-1 || 
      lastName.toLowerCase().indexOf(this.searchAgentName.toLowerCase()) != -1 ||
       data.name.toLowerCase().indexOf(this.searchAgentName.toLowerCase()) !=-1  ) 
     }else{
       
      return ( data.name.toLowerCase().indexOf(this.searchAgentName.toLowerCase()) !=-1
             || data.mobile.toLowerCase().indexOf(this.searchAgentName.toLowerCase()) !=-1 
             )
     }
      
    });

  }
  reload(){
    location.reload();
  }
  selectedAgent(item) {
    this.agentselection.name = item.name;
    this.agentselection.state = item.state;
    this.agentselection.hub = item.hub;
    this.agentselection.mobileNo = item.mobile;
    this.filterAgent = []
  }
  deactivatedAgent() {
    this.deleteeUserAlert = false;
    this.lmd.deactivatedAgent(this.agentselection.mobileNo)
      .then((data: any) => {
        this.deactivatedAlert = true;
      })
      .catch((err) => {})
  }
  loadData(group = this.singInDetails) {
    Object.keys(group.controls)
      .forEach((key: string) => {
        var abstractValue: any = group.get(key)
        this.formsError[key] = '';
        if (abstractValue && !abstractValue.valid &&
          (abstractValue.touched || abstractValue.dirty)) {
          for (let errorkey in abstractValue.errors) {
            this.formsError[key] += this.valiadtionMessage[key][errorkey] + ' '
            // console.log(errorkey);
          }
        }
        //console.log(abstractValue);
        if (abstractValue instanceof FormGroup) {
          this.loadData(abstractValue);
          // console.log('group');
          // console.log(abstractValue);
        }
        //   if (abstractValue instanceof FormArray) {
        //     console.log("array");
        //     console.log(abstractValue);
        //     for(let controls of abstractValue.controls){
        //       if(controls instanceof FormGroup){
        //         this.loadData(controls);
        //       }
        //     }
        //  }
        // console.log(this.formsError);
      })

  }
  newPassword(){
    this.newUserAlert = false;
    location.reload();
  }
  createUser(){
    const createUser = {
      name: this.CreateUserDetails.Agentname,
      mobile: this.CreateUserDetails.MobileNo.toString(),
      state: this.loginUserState,
      hub: this.CreateUserDetails.Hub
  }
  this.lmd.createUser(createUser)
    .then((data: any)=>{
      console.log(data);
      if(data.ResponseData.Success){
        this.newUser.username = this.CreateUserDetails.Agentname,
        this.newUser.password = data.ResponseData.password
        this.newUserAlert = true;
        this.createUserAlert = false;
      }else{
        this.createUserAlert = false;
        setTimeout(() => {
          alert(data.ResponseData.error);
        }, 500);
      }
    })
    .catch((err)=>{
      this.createUserAlert = false;
      setTimeout(() => {
        alert(err.error.Error.MessageToUser)
      }, 500);
    })
  }

} 