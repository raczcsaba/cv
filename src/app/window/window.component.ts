import {Component, ElementRef, OnInit, ViewChildren} from '@angular/core';
import { AppstatusService } from '../appstatus.service'


@Component({
  selector: 'app-window',
  templateUrl: './window.component.html',
  styleUrls: ['./window.component.scss']
})


export class WindowComponent implements OnInit {

  constructor(public dataService : AppstatusService) { }

  ngOnInit(): void {

  }


  single(){

  }
  double(){
    this.dataService.data.internet.closed = false
    this.dataService.data.internet.tray = false

    this.dataService.changeMessage(this.dataService.data)
    console.log("double")
  }
}
