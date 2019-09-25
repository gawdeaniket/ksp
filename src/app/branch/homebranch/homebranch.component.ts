import { Component, OnInit, ElementRef } from '@angular/core';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import { HomeBranchService } from '../../services/branch/home-branch.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-homebranch',
  templateUrl: './homebranch.component.html',
  styleUrls: ['./homebranch.component.scss']
})
export class HomebranchComponent implements OnInit {
  isOpen = false;
  order: string = 'info.name';
  reverse: boolean = false;
  selectTable: boolean = true;
  datePickerConfig: Partial<BsDatepickerConfig>;
  recivedTab: boolean;
  notrecivedTab: boolean;
  recived: any[] = [];
  NotRecived: any[] = [];
  allData: any[] = []
  p1: number = 1;
  p2: number = 1;
  reverseDate: boolean = true;
  alertBox: boolean = false;
  failures: any;
  success: any;
  recivedactive: boolean = true;
  notrecivedactive: boolean = false;
  startDate: any;
  endDate: any;
  datefiltercheck: boolean = false;
  notreceived_startDate;
  notreceived_endDate;
  received_startDate;
  received_endDate;
  notreceived_datefiltercheck = false;
  received_datefiltercheck = false;
  glpCount: any = 0;
  alertcheck: boolean = false;
  markItem: number = 0;
  receivedCount: number = 0;
  loaders: boolean = true


  constructor(private homebranch: HomeBranchService, 
              private _eref: ElementRef,
              private _router: Router) {
    this.datePickerConfig = Object.assign({}, { containerClass: 'theme-orange' });
    var logininfo: any = JSON.parse(localStorage.getItem('loginInfo'));
    if (!logininfo) {
      this._router.navigate(['home']);
    }
    if (logininfo.role != 'BRANCH') {
      this._router.navigate(['home']);
    }
  }

  mark() {
    this.alertcheck = false;
    this.markItem = 0;
    for (let i = 0; i < this.NotRecived.length; i++) {
      if (this.NotRecived[i].selected) {
        this.markItem++;
      }
      if (i === this.NotRecived.length - 1) {
        if (!this.markItem) {
          alert(" Please select an order to mark received ");
        } else {
          this.alertcheck = true;
        }
      }
    }
  }
  tabcheck(activeTab) {
    this.startDate = "";
    this.endDate = "";
    if (activeTab == 'Received') {
      this.recivedactive = true;
      this.notrecivedactive = false;
    } else {
      this.recivedactive = false;
      this.notrecivedactive = true;
    }
  }
  reload() {
    location.reload();
  }
  ngOnInit() {
    this.homebranch.allData()
      .then((data: any) => {
        //console.log(data);
        if (!data || data.delivered_data.length == 0) {
          this.loaders = false;
        }
        var j = 0;
        for (let i = 0; i < data.delivered_data.length; i++) {
          if (data.delivered_data[i].status == 'RECEIVED') {
            this.receivedCount++;
            this.recived.push({
              order_id: data.delivered_data[i].order_id,
              order_date: data.delivered_data[i].order_date,
              product_name: data.delivered_data[i].product_name,
              branch_id: data.delivered_data[i].branch_id,
              status: data.delivered_data[i].status,
              name: data.delivered_data[i].name,
              phone_number: data.delivered_data[i].phone_number,
              email: data.delivered_data[i].email,
              address: data.delivered_data[i].address,
              city: data.delivered_data[i].city,
              state: data.delivered_data[i].state,
              zipcode: data.delivered_data[i].zipcode,
              country: data.delivered_data[i].country,
              client_id: data.delivered_data[i].client_id,
              approval_id: data.delivered_data[i].approval_id,
              invoice_id: data.delivered_data[i].invoice_id,
              dateformat: data.delivered_data[i].order_date.match(/\d+/g).reverse().join('-')
            })

          } else {
            this.glpCount++;
            this.NotRecived.push({
              no: j++,
              order_id: data.delivered_data[i].order_id,
              order_date: data.delivered_data[i].order_date,
              product_name: data.delivered_data[i].product_name,
              branch_id: data.delivered_data[i].branch_id,
              status: data.delivered_data[i].status,
              name: data.delivered_data[i].name,
              phone_number: data.delivered_data[i].phone_number,
              email: data.delivered_data[i].email,
              address: data.delivered_data[i].address,
              city: data.delivered_data[i].city,
              state: data.delivered_data[i].state,
              zipcode: data.delivered_data[i].zipcode,
              country: data.delivered_data[i].country,
              client_id: data.delivered_data[i].client_id,
              approval_id: data.delivered_data[i].approval_id,
              invoice_id: data.delivered_data[i].invoice_id,
              selected: false,
              dateformat: data.delivered_data[i].order_date.match(/\d+/g).reverse().join('-')
            })
          }
          if (i == data.delivered_data.length - 1) {
            this.loaders = false;  //after last item  makeing loader false
          }
        }
      }).catch(() => {
        this.loaders = false;   //if error then closed loader
      })
  }
  Received_setOrder(value: string) {
    if (this.order === value) {
      this.reverse = !this.reverse;
    }
    if (this.reverse) {
      this.NotRecived.sort(function (a, b) {
        var x = a[value].toLowerCase();
        var y = b[value].toLowerCase();
        if (x < y) { return -1; }
        if (x > y) { return 1; }
        return 0;
      });
    } else {
      this.NotRecived.sort(function (a, b) {
        var x = a[value].toLowerCase();
        var y = b[value].toLowerCase();
        if (x > y) { return -1; }
        if (x < y) { return 1; }
        return 0;
      });

    }
    this.order = value;
  }

  Notreceived_setOrder(value: string) {
    if (this.order === value) {
      this.reverse = !this.reverse;
    }
    if (this.reverse) {
      this.NotRecived.sort(function (a, b) {
        var x = a[value].toLowerCase();
        var y = b[value].toLowerCase();
        if (x < y) { return -1; }
        if (x > y) { return 1; }
        return 0;
      });
    } else {
      this.NotRecived.sort(function (a, b) {
        var x = a[value].toLowerCase();
        var y = b[value].toLowerCase();
        if (x > y) { return -1; }
        if (x < y) { return 1; }
        return 0;
      });

    }
    this.order = value;
  }

  pageChange(event) {
    this.p2 = event;
  }
  Selected(event, i) {
    this.NotRecived[i].selected = !this.NotRecived[i].selected;
  }
  selectall() {
    for (let i = 0; i < this.NotRecived.length; i++) {
      this.NotRecived[i].selected = true;
    }
  }
  sortByDate() {
    if (this.reverseDate) {
      this.NotRecived.sort(function (a, b) {
        var dateA: any = new Date(b.order_date);
        var dateB: any = new Date(a.order_date)
        return dateA - dateB;
      });
      this.reverseDate = !this.reverseDate;
    }
    else {
      this.NotRecived.sort(function (a, b) {
        var dateA: any = new Date(b.order_date);
        var dateB: any = new Date(a.order_date)
        return dateB - dateA;
      });
      this.reverseDate = !this.reverseDate;
    }
  }

  markReceived() {
    this.alertcheck = false;
    var markItem: any[] = []
    var d = new Date();
    var n = d.toISOString().substring(0, 10);
    for (let i = 0; i < this.NotRecived.length; i++) {
      if (this.NotRecived[i].selected) {
        markItem.push({
          order_id: this.NotRecived[i].order_id.toString(),
          received_date: n
        });
      }
      if (i === this.NotRecived.length - 1) {
        this.homebranch.markreceived(markItem)
          .then((data: any) => {
            this.reload();
            this.failures = data.failure;
            this.success = data.success;
            this.alertBox = true;
          })
      }
    }
  }

  clearall() {
    for (let i = 0; i < this.NotRecived.length; i++) {
      this.NotRecived[i].selected = false;
    }
  }
}
