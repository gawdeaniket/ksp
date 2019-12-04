import { Component, OnInit, ElementRef } from '@angular/core';
//import { OrderPipe } from 'ngx-order-pipe';
import { ApprovalService } from '../../services/ho/approval.service';
// import { ExportToCsv } from 'export-to-csv';
import { Router } from '@angular/router';
import { ExcelService } from '../../services/excel.service';


@Component({
  
  selector: 'app-upload-orders',
  templateUrl: './upload-orders.component.html',
  styleUrls: ['./upload-orders.component.scss']
})
export class UploadOrdersComponent implements OnInit {
  p: number = 1;   //pagination
  alert1: boolean = false;
  alert2: boolean = false;
  alert3: boolean = false;
  alert4: boolean = false;

  checks: boolean = true;    //used to closed whole table
  loaderscheck: boolean = false;
  boxupload: boolean = true;
  // branch_id: boolean;
  // successalert:boolean = false;
  uploadOrderList: any[] = []; // table 2
  uploadOrder: any[] = [];     // for state list (Table 1)

  order: string = 'branch_id';  // sorting 
  reverse: boolean = false;    // used for sorting 

  // sortedCollection: any;
  // SearchFilter: {};


  // modifyContent: boolean = true;
  //downloadButton: boolean = true;
  // searchbox: boolean = true;
  // modifyButton: boolean = true;
  approvetable: boolean = false;  //2nd table(approval) hide and show
  modifybutton: boolean = true;    //this button will hide and show download and apporve  button on click of modify
  AllApprove: boolean = true;
  totalApproveCount: number = 0;
  // csvExporter: any;
  loaders: any = true;   //to hide and show loader icon
  dateOrder: any;        //save order generated date 
  failurealert: boolean = false;
  fileToUpload: File = null;
  fileName: any;
  failureResponse: any[];
  // alerts: boolean = false;
  uploadAlert: boolean = false;
  downloads: boolean = false;   //it is used to hide whole content and show update message to user viseversa
  // branchId: any = 'B123';
  // name: any = 'aDelhi North';
  // region: any = 'North';
  // product:any = "Price 200"
  // quantity:any = 50;
  // options = {
  //   fieldSeparator: ',',
  //   quoteStrings: '"',
  //   decimalSeparator: '.',
  //   showLabels: false,
  //   showTitle: false,
  //   useTextFile: false,
  //   useBom: true,
  //   filename: "random",
  //   useKeysAsHeaders: true,

  //   // headers: ['Column 1', 'Column 2', etc...] <-- Won't work with useKeysAsHeaders present!
  // };
  //  total: number;
  totalCount: any = 0; //total approved order (prd quantity)
  // successResponse: any;
  alertmessage: string;  //alert box 2 message
  alertbutton: string;  //alert box 2 button title
  failureResponses: any[] = [];//failure response

  failurelength: any = 0;  //length of failure
  uploadFileSuccess: any;  //total succesfull length of upload file
  macCheck:boolean = false;
  constructor(private excelService: ExcelService, private approvalServices: ApprovalService, private _eref: ElementRef, private _router: Router) {
   
    this.macCheck = false;
    var isMacLike = /(Mac|iPhone|iPod|iPad|MAC|MacIntel)/i.test(navigator.platform);
   // console.log(isMacLike);
   if(isMacLike) this.macCheck = true;
    
    var logininfo: any = JSON.parse(localStorage.getItem('loginInfo'));
    if (!logininfo) {
      this._router.navigate(['home']);
    }
   // console.log(this.downloads);

  }
  closeupload() {
    this.fileToUpload = null;
    this.downloads = false;
  }
  ngOnInit() {

    this.approvalServices.getList().then((data: any) => {
      if (data.pending_approval_list.length == 0 || data.proposed_count_by_state.length == 0) {  //if one of the table length is zero
        this.AllApprove = false;   //both table will be not visible and no oder message will be displayed
        this.loaders = false;       //loaders will be closed
      //  console.log('loader ' + this.loaders);
      }
      else {
        this.dateOrder = data.pending_approval_list[0].approval_generated_date.match(/\d+/g).reverse().join('-')
        var j = 0;
        for (let i = 0; i < data.pending_approval_list.length; i++) {
          this.uploadOrderList.push({
            no: j++,
            approval_id: data.pending_approval_list[i].approval_id,
            branch_id: data.pending_approval_list[i].branch_id,
            branch_name: data.pending_approval_list[i].branch_name,
            region: data.pending_approval_list[i].region,
            state: data.pending_approval_list[i].state,
            product_name: data.pending_approval_list[i].product_name,
            product_quantity_proposed: data.pending_approval_list[i].product_quantity_proposed,
            product_qty: data.pending_approval_list[i].product_quantity_proposed,
            appovedate: data.pending_approval_list[i].approval_generated_date,
          })
          if (i == data.pending_approval_list.length - 1) { //last data 
            this.loaders = false;
          //  console.log(this.loaders);
          }
        }  // for loop closed
        for (let i = 0; i < data.proposed_count_by_state.length; i++) {
          this.uploadOrder.push({
            state: data.proposed_count_by_state[i].state,
            count: data.proposed_count_by_state[i].count,
          })
          this.totalCount = this.totalCount + this.uploadOrder[i].count;
          if (i == data.proposed_count_by_state.length - 1) {
            this.loaders = false;
          }
        }
      }
      // this.uploadOrderList = data;
     // console.log(this.uploadOrderList);
     // console.log(this.AllApprove);
    }).catch((error) => {
      this.loaders = false;
     // console.log(error);
    })


    // this.approvalServices.getList().then((data:any)=>{
    //   console.log(data.proposed_count_by_state);
    //   if(data.proposed_count_by_state.length == 0 ){
    //     this.AllApprove = false;
    //     this.loaders = false;
    //   }
    //   console.log(data);
    //   for(let i=0;i<data.proposed_count_by_state.length;i++){
    //     this.uploadOrder.push({ 
    //       state:data.proposed_count_by_state[i].state,
    //       count:data.proposed_count_by_state[i].count,

    //     })
    //     this.totalCount = this.totalCount + this.uploadOrder[i].count;
    //     if(i ==data.proposed_count_by_state.length-1){
    //     this.loaders = false;
    //     }

    //   }
    //  // this.uploadOrderList = data;
    //   console.log(this.uploadOrderList);
    // })


  }
  // ngAfterViewInit(){
  //   window.document.body.style.background = 'black';
  // }
  // onClick(event) {
  //   //this.alert2 = false;
  //   // this.alert4 = false;
  //   if (!this._eref.nativeElement.contains(event.target)) // or some similar check

  //     console.log("alert");
  //   console.log(this.alert2);
  // }

  // uploadmsl(){
  //  // this.downloads = true;
  //   var files = document.getElementById('file');
  //   console.log(files);
  //   files.click();

  //   console.log(this.downloads);
  // }

  //this method will open the second table(approved order)
  modifyApproval() {
    this.approvetable = true;  //second table
    // this.modifyContent = false;
    this.modifybutton = false;
  }

  Download() {
    var d = new Date();
    var n = d.toISOString();
    var filename = "SATIN_ApproveOrders_" + n;
    var obj = [];
    for (let i = 0; i < this.uploadOrderList.length; i++) {
      obj.push({
        Approval_Id: this.uploadOrderList[i].approval_id,
        Branch_Id: this.uploadOrderList[i].branch_id,
        Branch_Name: this.uploadOrderList[i].branch_name,
        Region: this.uploadOrderList[i].region,
        Product_Name: this.uploadOrderList[i].product_name,
        product_Quantity_proposed: this.uploadOrderList[i].product_quantity_proposed
      })
      if (i == this.uploadOrderList.length - 1) {
        this.excelService.exportAsExcelFile(obj, filename);
      }
    }
    //         })
    //   var wrongApprovalId =[];
    //   console.log(wrongApprovalId);
    //   for(let i=0; i<this.uploadOrderList.length;i++){
    //   console.log(this.uploadOrderList[i].product_qty);
    //   if( this.uploadOrderList[i].product_qty%5 != 0 || this.uploadOrderList[i].product_qty < 0){
    //     wrongApprovalId.push(this.uploadOrderList[i].approval_id);
    //    // alert("please enter a correct no for "+this.uploadOrderList[i].approval_id +"Approval Id" );

    //   }
    //   if(i == this.uploadOrderList.length-1){
    //     console.log("in");
    //        if(wrongApprovalId.length){
    //        console.log("lebgth "+ wrongApprovalId.length);
    //         alert(' Please enter a correct quantity in multiple of 5');
    //        }else{
    //         //  for(let i=0;i<this.uploadOrderList.length;i++){
    //         //    this.totalApproveCount = this.totalApproveCount+  this.uploadOrderList[i].product_qty ;
    //         //    console.log();
    //         //    if(i == this.uploadOrderList.length - 1){
    //         //      console.log(this.totalApproveCount);
    //         //      console.log();
    //         //      this.total = this.totalApproveCount
    //         //     this.alert4 =true;
    //         //    }
    //         //  }
    //         var obj = [];
    //         for(let i=0;i<this.uploadOrderList.length;i++){
    //         obj.push({
    //           Approval_Id:this.uploadOrderList[i].approval_id,
    //           Branch_Id:this.uploadOrderList[i].branch_id,
    //           Branch_Name:this.uploadOrderList[i].branch_name,
    //           Region:this.uploadOrderList[i].region,
    //           Product_Name:this.uploadOrderList[i].product_name,
    //           product_Quantity_proposed:this.uploadOrderList[i].product_quantity_proposed


    //         })
    //         if(i == this.uploadOrderList.length -1){
    //           var d = new Date();
    //           var n = d.toISOString();
    //         console.log(n);

    //         this.options.filename = "SATIN_ApproveOrders_"+n;
    //         this.excelService.exportAsExcelFile(obj, this.options.filename);
    //           //   this.csvExporter = new ExportToCsv(this.options);

    //           //  this.csvExporter.generateCsv(obj);
    //         }
    //         }




    //        }
    // }


    //   }
  }

  // download(){
  // const csvExporter = new ExportToCsv(this.options);
  // console.log(this.uploadOrderList);
  // csvExporter.generateCsv(this.uploadOrderList);
  // }


  // cancelapprove() {
  //   this.alert4 = false;
  // }


  // after clicking on approve button 
  sendApprove() {
    // this.total = 0;  
    this.totalApproveCount = 0; // used to check total order(product quantity) counts
    this.failurealert = false;   // if failure container is open closed it
    var j = 0;
    for (let i = 0; i < this.uploadOrderList.length; i++) {
      if (this.uploadOrderList[i].product_qty % 5 != 0 || this.uploadOrderList[i].product_qty < 0 || this.uploadOrderList[i].product_qty == null) {
        j++;
        i = this.uploadOrderList.length - 1;  // and directly stop exceution of for loop
      }

      if (i == this.uploadOrderList.length - 1) {   //for last value in for loop
        if (j > 0) {    // if prd quantity value is incorrect
          alert(' Please enter a correct quantity in multiple of 5');
        } else {
          this.productQuantityCount()   // calling product quantity count function if all values(product quantity) are correct
        } // else closed


      }

    }

  }
  //to count total prd uantity by adding each order quantity
  productQuantityCount() {
    for (let i = 0; i < this.uploadOrderList.length; i++) { // used to count total product quantity 
      this.totalApproveCount = this.totalApproveCount + this.uploadOrderList[i].product_qty;
      if (i == this.uploadOrderList.length - 1) {
        //  this.total = this.totalApproveCount
        this.alert4 = true;   //show approved dialog box
      }
    }
  }
  //after clicking on approve, alert box gets open after that if we click on ok approved 
  UploadApprove() {
    var sendItem: any[] = []  //send the array of object to API in below format
    for (let i = 0; i < this.uploadOrderList.length; i++) {
      sendItem.push({
        "approval_id": this.uploadOrderList[i].approval_id.toString(),
        "quantity": this.uploadOrderList[i].product_qty.toString(),
        "product_name": this.uploadOrderList[i].product_name,
        "branch_id": this.uploadOrderList[i].branch_id.toString()
      });

      if (i == this.uploadOrderList.length - 1) {  // last element in loop 
        this.approvalServices.PostList(sendItem).then((data: any) => {  //send the item to approved
          this.alert4 = false;
          if (data.failure.length == 0) {       // if all success
            this.AllApprove = false;
            this.uploadOrderList = [];
            //  this.modifyContent = true;
            // this.modifyButton = false;
            // this.downloadButton = false;
            // this.searchbox = false;
            this.alert1 = true;
            // this.alert2 = true;
          } else {//else show failure
            this.failureResponse = data.failure;
            this.failurealert = true;
          }
        }).catch((error) => {
          this.alert4 = false;
          alert(error.error.Error.MessageToUser);
        })

      }
    }

  }

  // changed product quantity manually
  changedValue(event, i) {
    if (event % 5 == 0) { // check if i/p vaue is multiple of 5 if yes changed the value
      this.uploadOrderList[i].product_qty = event;
    }
    else {
      this.uploadOrderList[i].product_qty = null;
    }
  }

  setOrder(value: string) {      // value = object property name
    if (this.order === value) {
      this.reverse = !this.reverse;
    }
    if (this.reverse) {
      this.uploadOrderList.sort(function (a, b) {
        var x = a[value].toLowerCase();
        var y = b[value].toLowerCase();
        if (x < y) { return -1; }
        if (x > y) { return 1; }
        return 0;
      });
    } else {

      this.uploadOrderList.sort(function (a, b) {
        var x = a[value].toLowerCase();
        var y = b[value].toLowerCase();
        if (x > y) { return -1; }
        if (x < y) { return 1; }
        return 0;
      });

    }
    this.order = value;
  }

  //reset all value to its original 
  clearValue() {
    // this.uploadOrderList[ ].product_quantity_proposed  contains original value
    for (let i = 0; i < this.uploadOrderList.length; i++) {
      this.uploadOrderList[i].product_qty = this.uploadOrderList[i].product_quantity_proposed;
    }
  }

  // pagechanged(event) {
  //   this.p = event;
  // }

  //increse prd quantity on click of button 
  increase(index) {
    if (this.uploadOrderList[index].product_qty >= 0 && this.uploadOrderList[index].product_qty % 5 == 0) {
      this.uploadOrderList[index].product_qty = this.uploadOrderList[index].product_qty + 5;
    }
  }

  // decrease prd quantity
  decrease(index) {
    if (this.uploadOrderList[index].product_qty == 0) {
      return
    }
    if (this.uploadOrderList[index].product_qty && this.uploadOrderList[index].product_qty % 5 == 0) {
      this.uploadOrderList[index].product_qty = this.uploadOrderList[index].product_qty - 5;
    }
  }

  //on selection of file
  handleFile(target) {
    // this.failureResponses = [];   
    // this.loaderscheck = true;
    var files = target.files
    // this.alerts = false;
    // this.failurealert = false;
   // console.log(this.failurealert);
    if (files[0].type == "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet") {
      this.fileToUpload = files.item(0);
      // this.alerts = false;
      // this.loaderscheck = false;
      this.handleFileInput();   //this method contains the API call to send file
    }
    else {
      this.fileToUpload = undefined;
      // this.loaderscheck = false;
      alert("Please upload a file in correct format (xls / xlsx)");
    }
   // console.log(files);
    target.value = '';
  }

  handleFileInput() {
    // this.loaderscheck = true;
  //  console.log(this.fileToUpload);
    this.uploadAlert = false;
    this.failurealert = false;
    this.failureResponses = [];
    // console.log(this.id);
    if (!this.fileToUpload) {  //re checking if file length is not zero
      // this.alerts = true;
      alert("Please choose a file to upload");
      // this.loaderscheck = false;
    }
    else {
      // this.successalert =true;
      this.boxupload = false;
      this.approvalServices.uploadApprove(this.fileToUpload)
        .then((data: any) => {
          // console.log(data);
          // this.loaderscheck = false;
          if (data.success && data.success.length && !data.failure.length) {  //if All success
            this.downloads = true;    //show approve file message
            this.uploadFileSuccess = data.success.length;
            this.boxupload = true;
          } else {  //if failure
            this.checks = false;
            this.failurealert = true;
            this.alert3 = true;
            this.failurelength = data.failure.length;
            for (let i = 0; i < data.failure.length; i++) {
              this.failureResponses.push({
                approval_id: data.failure[i].approval_id,
                status: data.failure[i].status,
                Remarks: data.failure[i].Remarks
              })

              // if (i == data.failure.length - 1) {
              //   //   alert(data.failure.length+' failure while Uploading file ');
              //   console.log(this.failureResponses);
              // }
            }



          }
          //  this.successResponse = data.success;
          //  if(this.successResponse &&this.successResponse.length){
          //   this.downloads = true;
          //   this.successalert =true;
          //  }

          //    this.failureResponse = data.failure;
          //    if(this.failureResponse.length){
          //     //alert("File data incorrect")
          //     this.failurealert = true;
          //    }

          //    console.log(this.failureResponse);


        }, (error: any) => {
          // this.loaderscheck = false;
          var errorsMessage = error.error.Error.MessageToUser;
          alert(errorsMessage);
        }).catch(error => console.log(error));

    }//else

  }

  // on failure response there is back button to go back to main screen
  back() {
    this.approvetable = true;
    this.alert3 = false;
    this.failurealert = false;
    this.checks = true;
  }

  //once file get upload successfully it need to be apporved
  approvedupload() {
    this.loaders = true;
    // this.loaderscheck = true;
    this.alertmessage = '';
    this.approvalServices.Approvefile(this.fileToUpload).then((data: any) => {
      this.alert2 = true;
      this.boxupload = false;
      this.loaders = false;
      if (data.failure.length > 0) {
        this.alertmessage = "Error Occur ! Please correct  failure and try again. ";
        this.alertbutton = 'Cancel'
        // this.failurealert = true;
        // this.failureResponse = data.failure
      } else {
        this.alertmessage = "All orders approved successfully";
        this.alertbutton = 'OK';
      }
    }).catch((error) => {
      this.loaders = false;
      var errorsMessage = error.error.Error.MessageToUser;
      alert(errorsMessage);
    })
  }

  cancelapproved() {
    location.reload();
  }



}
