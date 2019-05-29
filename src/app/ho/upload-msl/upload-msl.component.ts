import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-upload-msl',
  templateUrl: './upload-msl.component.html',
  styleUrls: ['./upload-msl.component.scss']
})
export class UploadMslComponent implements OnInit {
  p: any;
  viewAllDelivery:any;
  searchText:any;
  date:any;
  constructor() { }

  ngOnInit() {
  }
  pagechanged(event){
    this.p = event;
  }
}
