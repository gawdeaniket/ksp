import { Component, OnInit } from '@angular/core';
import { LmdService } from '../../services/ksp/lmd.service';
import { FormGroup, FormArray, Validators, FormBuilder } from '@angular/forms';
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
  allAgent:any[] = [];
  filterAgent:any [] = []
  valiadtionMessage = {
    Agentname: {
      'required': 'Agent name is required',
      'minlength': 'Min 3 and max 10 char'
    },
    MobileNo: {
      'required': 'Phone is required'
    },
    state: {
      'required': 'state is required'
    },
    Hub: {
      'required': 'Hub is required'
    }
  };

  formsError: any = {
    AgentName: '',
    MobileNo: '',
    state: '',
    Hub: ''
  }
  filterState: any[] = [];
  searchAgentName:string;
  agentselection:any = {};
  constructor(private lmd: LmdService, private fb: FormBuilder) {
    
    this.singInDetails = this.fb.group({
      Agentname: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
      MobileNo: ['', Validators.required],
      state: ['', Validators.required],
      Hub: ['', Validators.required],
    });
    this.singInDetails.get('Hub').disable();
    //this.lmd.getState().then((data)=> console.log(data));
    this.singInDetails.valueChanges
      .subscribe((value) => {
        console.log(value);
        
        if(value.state){
          console.log(value.state);
          
          
        }
        this.loadData(this.singInDetails);
      });
      
    this.singInDetails.get('state').valueChanges
      .subscribe((value) => {
        console.log(value);
        this.filterState = this.state.filter((data) => {
          console.log(data.name.toLowerCase());
         return data.name.toLowerCase().indexOf(value.toLowerCase()) != -1
        });
        console.log(this.filterState);
        this.singInDetails.get('Hub').disable();
          this.singInDetails.patchValue({
            Hub: ''
          })
        if(value == '') return this.filterState = [];
      })
  }

  ngOnInit() {
    // this.lmd.getAllAgent()
    // .then((data:any)=>{
    //   this.allAgent = data;
    // })
    this.allAgent = [
      { name:'a',MobileNo:22222222,state:'m',hub:'hub1'},
      { name:'a1',MobileNo:22222222,state:'m',hub:'hub1'},
      { name:'a12',MobileNo:22222222,state:'m',hub:'hub1'},
      { name:'a123',MobileNo:22222222,state:'m',hub:'hub1'},
      { name:'a1234',MobileNo:22222222,state:'m',hub:'hub1'},
      { name:'a12345',MobileNo:22222222,state:'m',hub:'hub1'}
    ]
  }
  selectState(stateName){
    this.singInDetails.patchValue({
      state:stateName
    });
    this.singInDetails.get('Hub').enable();
    this.filterState = [];
  }
  searchByAgent(event){
    console.log(event);
    this.agentselection = {};
    if(!this.searchAgentName) return this.filterAgent = [];
    this.filterAgent = this.allAgent.filter((data) => {
     return data.name.toLowerCase().indexOf(this.searchAgentName.toLowerCase()) != -1;
    });
    
  }
  selectedAgent(item){
 this.agentselection.name = item.name;
 this.agentselection.state = item.state;
 this.agentselection.hub= item.hub;
 this.agentselection.mobileNo = item.mobileNo;
 this.filterAgent = []
  }
  loadData(group = this.singInDetails) {
    Object.keys(group.controls)
      .forEach((key: string) => {
        var abstractValue: any = group.get(key)
        this.formsError[key] = '';
        if (abstractValue && !abstractValue.valid &&
          (abstractValue.touched || abstractValue.dirty)) {
          // console.log(abstractValue.errors);
          // console.log(this.valiadtionMessage[key]);
          for (let errorkey in abstractValue.errors) {
            // console.log(errorkey);
            this.formsError[key] += this.valiadtionMessage[key][errorkey] + ' '
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

}
