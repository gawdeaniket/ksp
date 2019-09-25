import { Component, OnInit } from '@angular/core';
import { JsonToCsvService } from '../../services/jsonToCsv/json-to-csv.service';
import { Router } from '@angular/router';
import { ExcelService } from '../../services/excel.service';
@Component({
  selector: 'app-home-ho',
  templateUrl: './home-ho.component.html',
  styleUrls: ['./home-ho.component.scss']
})
export class HomeHoComponent implements OnInit {
  loaders: boolean = true;
  stateWise: any[] = [];
  TotalReceived: number;
  TotalDeliverd: number;
  TotalOrder: number;
  TotalDisbursed: any;
  p: any = 1;
  constructor(private excelService: ExcelService, 
              private jToc: JsonToCsvService, 
              private _router: Router) {
    var logininfo: any = JSON.parse(localStorage.getItem('loginInfo'));
    if (!logininfo) {
      this._router.navigate(['home']);
    }
    if (logininfo.role != 'HO') {
      this._router.navigate(['home']);
    }
  }
  ngOnInit() {
    this.TotalOrder = 0;
    this.TotalDeliverd = 0;
    this.TotalReceived = 0;
    this.TotalDisbursed = 0;
    this.jToc.stateWise().then((data: any) => {        //Intiallly display statewise data on table
      // console.log(data);
      if (!data) {                  //if data is empty then closed loaders
        this.loaders = false;
      } else {
        // console.log(data);
        for (let i = 0; i < data.length; i++) {
          this.stateWise.push({
            STATE: data[i].STATE,
            ORDERED: data[i].ORDERED + data[i].INVOICED,  //add invoiced in ordered
            GLP_DELIVERED: data[i].DELIVERED,
            MFI_RECEIVED: data[i].RECEIVED,
            DISBURSED: data[i].DISBURSED
          })
          //Calulate Total value of each column by adding each element
          this.TotalOrder = this.TotalOrder + this.stateWise[i].ORDERED;
          this.TotalDeliverd = this.TotalDeliverd + this.stateWise[i].GLP_DELIVERED;
          this.TotalReceived = this.TotalReceived + this.stateWise[i].MFI_RECEIVED;
          this.TotalDisbursed = this.TotalDisbursed + this.stateWise[i].DISBURSED;
          if (i == data.length - 1) {   //close loader after last for loop element
            this.loaders = false;
          }        //if closed
        }      //for loop closed
      }//else closed

    }).catch((err) => {
      this.loaders = false;
    })
  }

  //statewise conversion of json to excel
  statewise() {
    var d = new Date();
    var n = d.toISOString();
    var filename = "SATIN_statewise" + n;
    this.excelService.exportAsExcelFile(this.stateWise, filename);   //convert json to excel by calling services
    //   this.csvExporter = new ExportToCsv(this.options);
    //  this.csvExporter.generateCsv(this.stateWise);
  }
  //branchwise conversion of json to excel
  branchwise() {
    var d = new Date();
    var n = d.toISOString();
    var filename = "SATIN_branchwise" + n;
    this.jToc.branchWise().then((data: any) => {    //first get branchwise data in json format
      this.excelService.exportAsExcelFile(data, filename);    //convert json to excel
    })
  }
  //customerwise conversion
  customerwise() {
    var d = new Date();
    var n = d.toISOString();
    var filename = "SATIN_customerwise" + n;
    this.jToc.customerWise().then((data: any) => {   //first get customerwise data in json format
      this.excelService.exportAsExcelFile(data, filename);     //convert json to excel
    })
  }
}
