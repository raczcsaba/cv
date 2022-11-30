import { Injectable } from '@angular/core';
import { AppstatusInterface } from './appstatusInterface'
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AppstatusService {

  constructor() { }
  data:AppstatusInterface = {internet:{closed:false, tray:true},folder:{closed:false, tray:true},calculator:{closed:false, tray:true},notepad:{closed:false, tray:true}}

  //1-ie 2-filemanager 3-calc 4-notepad
  focus = 0

  //datasending
  private messageSource = new BehaviorSubject(this.data);
  public currentMessage = this.messageSource.asObservable();

  changeMessage(message:AppstatusInterface) {

    this.messageSource.next(message)
  }
}
