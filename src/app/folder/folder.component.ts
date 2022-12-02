import {Component, ElementRef, Input, ViewChild} from '@angular/core';
import {AppstatusService} from "../appstatus.service";
import {ResizeEvent} from "angular-resizable-element";

@Component({
  selector: 'app-folder',
  templateUrl: './folder.component.html',
  styleUrls: ['./folder.component.scss']
})
export class FolderComponent {
  constructor(public dataService : AppstatusService,) {
  }
  transVal:DOMMatrix = new WebKitCSSMatrix();

  kocka: {'height':number,'width':number,'top':number,'bottom':number,'left':number,'right':number} = {height:300,width:340,top:14,bottom:0,left:14,right:0,};
  fullToggle = true;
  @Input() height?: number
  @Input() width?: number
  @ViewChild('rect') rect?: ElementRef;

  onResizeEnd($event: ResizeEvent) {
    this.kocka.width = ($event.rectangle.width??400);
    this.kocka.height = ($event.rectangle.height??300);
    this.kocka.top = $event.rectangle.top??80;
    this.kocka.bottom = $event.rectangle.bottom??0;
    this.kocka.left = $event.rectangle.left??80;
    this.kocka.right = $event.rectangle.right??0;

  }

  fullScreen() {
    !this.fullToggle?this.transVal = new WebKitCSSMatrix(getComputedStyle(this.rect?.nativeElement).transform):''

    this.fullToggle = !this.fullToggle;
    this.dataService.focus = 2
    console.log("gec" + this.dataService.focus)
  }

  tray() {
    this.dataService.data.folder.tray = true;
    this.dataService.changeMessage(this.dataService.data)
    this.dataService.toggleOther(2)

  }

  close() {
    this.dataService.data.folder.closed = true;
    this.dataService.changeMessage(this.dataService.data)
    this.dataService.toggleOther(2)

  }

  validate(event: ResizeEvent): boolean {
    //border
    //transform coords
    let transx
    transx = Number(getComputedStyle(this.rect?.nativeElement).transform.split(',')[4]??0)
    let transy
    transy = getComputedStyle(this.rect?.nativeElement).transform.split(',')[5]
    transy = transy?Number(transy.slice(0,-1)):0

    //nullish check
    this.width = this.width??0
    this.height = this.height??0

    //sides maximális méretprobléma
    if (transx + event.rectangle.right - 13 > this.width){
      return false
    }
    if (transy + event.rectangle.bottom - 13 > this.height){
      return false
    }
    if (transy + event.rectangle.top < 14){
      return false
    }
    if (transx + event.rectangle.left < 13){
      return false
    }

    //min max size check
    const minwidth: number = 332;
    const minheight: number = 100;
    if (
      event.rectangle.width &&
      event.rectangle.height &&
      (event.rectangle.width < minwidth ||
        event.rectangle.height < minheight)
    ) {
      return false;
    }
    return true;
  }

  focus() {
    console.log(this.dataService.focus)
    this.dataService.focus = 2
  }
}
