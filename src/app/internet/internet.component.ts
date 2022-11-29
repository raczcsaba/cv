import {Component, ElementRef, Input, OnInit, ViewChildren} from '@angular/core';
import {AppstatusService} from "../appstatus.service";
import {ResizeEvent} from "angular-resizable-element";

@Component({
  selector: 'app-internet',
  templateUrl: './internet.component.html',
  styleUrls: ['./internet.component.scss']
})
export class InternetComponent implements OnInit {
  constructor(public dataService : AppstatusService) { }

  kocka: {'height':number,'width':number,'top':number,'bottom':number,'left':number,'right':number} = {height:300,width:400,top:80,bottom:0,left:80,right:0,};
  fullToggle = false;
  @Input() desktop: any

  ngOnInit(): void {

  }

  onResizeEnd($event: ResizeEvent) {
    this.kocka.width = ($event.rectangle.width??400);
    this.kocka.height = ($event.rectangle.height??300);
    this.kocka.top = $event.rectangle.top??80;
    this.kocka.bottom = $event.rectangle.bottom??0;
    this.kocka.left = $event.rectangle.left??80;
    this.kocka.right = $event.rectangle.right??0;

  }

  fullScreen() {
    this.fullToggle = !this.fullToggle;
  }

  tray() {
    this.dataService.data.internet.tray = true;
    this.dataService.changeMessage(this.dataService.data)
  }

  close() {
    this.dataService.data.internet.closed = true;
    this.dataService.changeMessage(this.dataService.data)
  }
}
