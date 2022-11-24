import {Component, ElementRef, OnInit, ViewChildren} from '@angular/core';
import {ResizeEvent} from "angular-resizable-element";


@Component({
  selector: 'app-window',
  templateUrl: './window.component.html',
  styleUrls: ['./window.component.scss']
})


export class WindowComponent implements OnInit {

  constructor() { }

  kocka: {'height':number,'width':number,'top':number,'bottom':number,'left':number,'right':number} = {height:300,width:400,top:0,bottom:0,left:0,right:0,};
  fullToggle = false;

  ngOnInit(): void {
  }

  onResizeEnd($event: ResizeEvent) {
    console.log($event.rectangle)
    this.kocka.width = ($event.rectangle.width??400);
    this.kocka.height = ($event.rectangle.height??300);
    this.kocka.top = $event.rectangle.top??20;
    this.kocka.bottom = $event.rectangle.bottom??0;
    this.kocka.left = $event.rectangle.left??0;
    this.kocka.right = $event.rectangle.right??0;

  }

  fullScreen() {
    this.fullToggle = !this.fullToggle;
  }
}
