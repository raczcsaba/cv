import {Component, OnInit} from '@angular/core';
import { AppstatusService } from  './appstatus.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'cv';

  loading = true
  clickVal = false

  constructor(public dataService : AppstatusService) {
  }

  ngOnInit() {
    this.dataService.currentLoading.subscribe( (value: { loadState:boolean,turnOn:boolean }) => {
      this.loading = value.loadState
    })
  }

  click() {
    this.clickVal = !this.clickVal
  }
}
