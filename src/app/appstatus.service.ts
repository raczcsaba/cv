import { Injectable } from '@angular/core';
import { AppstatusInterface } from './appstatusInterface'
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AppstatusService {

  constructor() { }
  data:AppstatusInterface = {internet:{closed:true, tray:true},folder:{closed:true, tray:true},calculator:{closed:true, tray:true},notepad:{closed:true, tray:true}}

  //1-ie 2-filemanager 3-calc 4-notepad
  focus = 0

  machineState:{loadState:boolean,turnOn:boolean} = {loadState:true, turnOn:true}

  //datasending
  private messageSource = new BehaviorSubject(this.data);
  public currentMessage = this.messageSource.asObservable();

  private loading = new BehaviorSubject(this.machineState);
  public currentLoading = this.loading.asObservable();


  changeMessage(message:AppstatusInterface) {
    this.data = message
    this.messageSource.next(message)
  }

  changeLoading(loading:boolean,state:boolean) {
    if (!state){
      this.loading.next({loadState:loading,turnOn:state})
      setTimeout(() => {
        this.loading.next({loadState:loading,turnOn:true})
      },11500)

    }else {
      this.loading.next({loadState:loading,turnOn:state})
    }
  }

  toggleOther(v:number){
    if (v==1){
      !this.data.folder.tray?this.focus=2:
        !this.data.calculator.tray?this.focus=3:
          !this.data.notepad.tray?this.focus=4:this.focus=0
    }
    if (v==2){
      !this.data.internet.tray?this.focus=1:
        !this.data.calculator.tray?this.focus=3:
          !this.data.notepad.tray?this.focus=4:this.focus=0
    }
    if (v==3){
      !this.data.internet.tray?this.focus=1:
        !this.data.folder.tray?this.focus=2:
          !this.data.notepad.tray?this.focus=4:this.focus=0
    }
    if (v==4){
      !this.data.internet.tray?this.focus=1:
        !this.data.folder.tray?this.focus=2:
          !this.data.calculator.tray?this.focus=3:this.focus=0
    }

  }
}
