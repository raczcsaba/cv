import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import { AppstatusService } from '../appstatus.service'
import {AppstatusInterface} from "../appstatusInterface";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  public now: Date = new Date();
  data:AppstatusInterface = {internet:{closed:false, tray:true},folder:{closed:true, tray:false},calculator:{closed:true, tray:false},notepad:{closed:true, tray:false}}

  constructor(public dataService : AppstatusService) {
    setInterval(() => {
      this.now = new Date();
    }, 100);
  }

  @ViewChild('nav') nav?: ElementRef;

  toggleStart = false;

  maxShow = 4
  page = 1

  ngOnInit(): void {
    setTimeout(() => {
      this.onResize(this.nav?.nativeElement.offsetWidth)
    },0)

    this.dataService.currentMessage.subscribe(value => {
      this.data = value
    })
  }

  ngAfterViewChecked(){
  }

  starToggle() {
    this.toggleStart = !this.toggleStart;
  }

  toggleTrayIe() {
    this.dataService.focus = 1
    this.data.internet.tray = !this.data.internet.tray
    this.dataService.changeMessage(this.data)
  }
  toggleTrayFile() {
    this.dataService.focus = 2
    this.data.folder.tray = !this.data.folder.tray
    this.dataService.changeMessage(this.data)
  }
  toggleTrayCalc() {
    this.dataService.focus = 3
    this.data.internet.tray = !this.data.internet.tray
    this.dataService.changeMessage(this.data)
  }
  toggleTrayNote() {
    this.dataService.focus = 4
    this.data.folder.tray = !this.data.folder.tray
    this.dataService.changeMessage(this.data)
  }

  onResize(width: number) {
    if (width<631){
      this.maxShow = 1;
    }
    else if (width<775){
      this.maxShow = 2;
    }
    else if (width<838){
      this.maxShow = 3;
    }
    else {
      this.maxShow = 4
    }

  }

  pageUp() {
    this.page<4?this.page++:this.page=1
  }
  pageDown() {
    this.page>1?this.page--:this.page=4
  }
}
