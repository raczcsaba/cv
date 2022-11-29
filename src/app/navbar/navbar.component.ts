import { Component, OnInit } from '@angular/core';
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

  toggleStart = false;

  ngOnInit(): void {
    this.dataService.currentMessage.subscribe(value => {
      this.data = value
    })
  }

  starToggle() {
    this.toggleStart = !this.toggleStart;
  }

  toggleTray() {
    this.data.internet.tray = !this.data.internet.tray
    this.dataService.changeMessage(this.data)
  }
}
