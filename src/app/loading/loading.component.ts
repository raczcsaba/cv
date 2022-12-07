import { Component, OnInit} from '@angular/core';
import { AppstatusService } from '../appstatus.service'
import {Subscription} from "rxjs";

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss']
})
export class LoadingComponent implements OnInit{
  constructor(public dataService : AppstatusService) {
  }

  state = false
  load = {loadState: true, turnOn: true}
  subscription: Subscription | undefined
  ngOnInit() {

    this.subscription = this.dataService.currentLoading.subscribe(value => {
      this.load = value
    })
    setTimeout(() => {
      this.state = true
    },6000)
    setTimeout(() => {
      this.dataService.changeLoading(false, true);
    },11400)

  }

  ngOnDestroy() {
    this.subscription?.unsubscribe();
  }
}
