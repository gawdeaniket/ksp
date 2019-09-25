import { Component, OnInit, Input } from '@angular/core';
import { DeviceDetectorService } from 'ngx-device-detector';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  alertcheck:boolean = false;
  homeIconFlag = true;
  @Input() rootFlag:boolean;
  constructor(private deviceService: DeviceDetectorService,) {
    const isMobile = this.deviceService.isMobile();
    if(isMobile) this.homeIconFlag = false;
    
   }

  ngOnInit() {
    console.log(this.rootFlag);
    if(this.rootFlag){
   this.homeIconFlag = false;
    }else{
      this.homeIconFlag = true;
    }
  }

}
