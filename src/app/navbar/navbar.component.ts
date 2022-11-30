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
  activeApp:string[] = []
  showApp:string[] = []
  arrowVisible = false

  ngOnInit(): void {
    setTimeout(() => {
      this.onResize(this.nav?.nativeElement.offsetWidth)
    },0)

    this.dataService.currentMessage.subscribe(value => {
      this.data = value
      this.activeApp = [];
      if (!value.internet.closed) this.activeApp.push('internet');
      if (!value.folder.closed) this.activeApp.push('folder');
      if (!value.calculator.closed) this.activeApp.push('calc');
      if (!value.notepad.closed) this.activeApp.push('notepad');
      this.filterApps()

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
    this.data.calculator.tray = !this.data.calculator.tray
    this.dataService.changeMessage(this.data)
  }
  toggleTrayNote() {
    this.dataService.focus = 4
    this.data.notepad.tray = !this.data.notepad.tray
    this.dataService.changeMessage(this.data)
  }

  onResize(width: number) {
    this.arrowVisible = true
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
      this.arrowVisible = false
    }
    this.filterApps()


  }

  pageUp() {
    this.page<(this.activeApp.length/this.maxShow)?this.page++:this.page=1
    this.filterApps()
  }
  pageDown() {
    this.page>1?this.page--:this.page=4
    this.filterApps()
  }
  filterApps(){
    if (this.maxShow>=this.activeApp.length){
      this.arrowVisible = false
    }
    if (this.page == 1){
      this.showApp = []
      for (let i = 0; i < (this.maxShow<this.activeApp.length?this.maxShow:this.activeApp.length);i++){
        this.showApp.push(this.activeApp[i])
      }
    }
    else if (this.page == 2){
      this.showApp = []
      let l = this.maxShow*2>this.activeApp.length?this.activeApp.length:this.maxShow*2;
      console.log(l)
      for (let i = this.maxShow; i < l; i++){
        this.showApp.push(this.activeApp[i])
      }
    }
    else if (this.page == 3){
      this.showApp = []
      this.showApp.push(this.activeApp[2])

    }
    else {
      this.showApp = []
      this.showApp.push(this.activeApp[3])
    }
    console.log(this.showApp)
    if (this.showApp.length == 0){
      console.log("történik nyugi")
      this.page--;
      this.filterApps()
    }
  }
}
