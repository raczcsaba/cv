import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {AppstatusService} from "../appstatus.service";
import {ResizeEvent} from "angular-resizable-element";

@Component({
  selector: 'app-notepad',
  templateUrl: './notepad.component.html',
  styleUrls: ['./notepad.component.scss']
})
export class NotepadComponent implements OnInit{
  constructor(public dataService : AppstatusService,) {
  }

  kocka: {'height':number,'width':number,'top':number,'bottom':number,'left':number,'right':number} = {height:700,width:420,top:14,bottom:0,left:14,right:0,};
  fullToggle = false;
  @Input() height?: number
  @Input() width?: number
  @ViewChild('rect') rect?: ElementRef;
  mytext =
    "import { IT Ismeretek } from '@myknowledge/core';\n" +
    "\n" +
    "\n" +
    "@Component({\n" +
    "  selector: 'app-root',\n" +
    "  templateUrl: './app.component.html',\n" +
    "  styleUrls: ['./app.component.scss']\n" +
    "})\n" +
    "\n" +
    "export class Rácz Csaba {\n" +
    "  \n" +
    "  title = 'Önéletrajz';\n" +
    "  \n" +
    "  Szakmai_tudás: It Ismeretek = {\n" +
    "    Verziókövetés: 'Github',\n" +
    "    KeretRendszerek: [\n" +
    "      'Angular',\n" +
    "      '.Net 6'\n" +
    "    ],\n" +
    "    CSS: [\n" +
    "      'SCSS',\n" +
    "      'SASS'\n" +
    "    ],\n" +
    "    BackEnd: 'Strapi CMS'\n" +
    "  }\n" +
    "  \n" +
    "  Soft Skillek: string = [\n" +
    "\t'Csapatmunka',\n" +
    "\t'Kreatív gondolkodás',\n" +
    "\t'Probléma megoldás',\n" +
    "\t'Precíz munkavégzés'\n" +
    "  ]\n" +
    "}\n"

  ngOnInit() {
    setTimeout(() => {
      this.kocka.height = (this.height??0)<710?200:700
      this.kocka.width = (this.width??0)<450?340:420
    },0)
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
    this.dataService.focus = 4
  }

  tray() {
    this.dataService.data.notepad.tray = true;
    this.dataService.changeMessage(this.dataService.data)
    this.dataService.toggleOther(4)

  }

  close() {
    this.dataService.data.notepad.closed = true;
    this.dataService.data.notepad.tray = true;
    this.dataService.changeMessage(this.dataService.data)
    this.dataService.toggleOther(4)

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
    this.dataService.focus = 4
  }
}
