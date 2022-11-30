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
  double(c:number){
    this.dataService.focus = c;
    switch (c){
      case 1:
        this.dataService.data.internet.closed = false
        this.dataService.data.internet.tray = false
        this.dataService.changeMessage(this.dataService.data)
        return
      case 2:
        this.dataService.data.folder.closed = false
        this.dataService.data.folder.tray = false
        this.dataService.changeMessage(this.dataService.data)
        return
      case 3:
        this.dataService.data.calculator.closed = false
        this.dataService.data.calculator.tray = false
        this.dataService.changeMessage(this.dataService.data)
        console.log("nincsbaj")
        return
      case 4:
        this.dataService.data.notepad.closed = false
        this.dataService.data.notepad.tray = false
        this.dataService.changeMessage(this.dataService.data)
        return
    }

  }
}
