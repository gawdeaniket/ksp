import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardHoComponent implements OnInit {
  events: string[] = [];
  opened: boolean = true;
  constructor() { }

  ngOnInit() {
  }

}
