import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {AppstatusService} from "../appstatus.service";
import {ResizeEvent} from "angular-resizable-element";

@Component({
  selector: 'app-internet',
  templateUrl: './internet.component.html',
  styleUrls: ['./internet.component.scss']
})
export class InternetComponent implements OnInit{

  constructor(public dataService : AppstatusService, ) {
  }

  @ViewChild('rect') rect?: ElementRef;

  kocka: {'height':number,'width':number,'top':number,'bottom':number,'left':number,'right':number} = {height:300,width:340,top:14,bottom:0,left:14,right:0,};
  fullToggle = true;
  @Input() height: number = 0
  @Input() width: number = 0
  subValue = 90
  browserHeight = this.height-this.subValue;
  urlValue = 'raczcsaba.tech'
  title = true;
  school = [{
    title:'52-481-02 (OKJ) Irodai Informatikus',
    year:'2021',
    description:'Kiskunfélegyházi Szent Benedek PG Két \n Tanítási Nyelvű Technikum és Kollégium',
    place:'Kiskunfélegyháza Kossuth utca 24.'
  },{
    title:'3142/9 FEOR számú számítógépes rendszerkarbantartó',
    year:'2021',
    description:'Kiskunfélegyházi Szent Benedek PG Két \n Tanítási Nyelvű Technikum és Kollégium',
    place:'Kiskunfélegyháza Kossuth utca 24.'
  },{
    title:'Két tanítási nyelvű érettségi',
    year:'2016 - 2021',
    description:'Kiskunfélegyházi Szent Benedek PG Két \n Tanítási Nyelvű Technikum és Kollégium',
    place:'Kiskunfélegyháza Kossuth utca 24.'
  }]

  ngOnInit() {
    setTimeout(() => {
      this.browserHeight = this.height-this.subValue;
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
    if(this.fullToggle){
      this.browserHeight = this.height - this.subValue
      this.title = this.width > 1035

    }else {
      setTimeout(() => {
        this.browserHeight = this.rect?.nativeElement.offsetHeight -this.subValue
        this.title = this.rect?.nativeElement.offsetWidth > 1035

      },0)
    }
    this.dataService.focus = 1
  }

  tray() {
    this.dataService.data.internet.tray = true;
    this.dataService.changeMessage(this.dataService.data)
    this.dataService.toggleOther(1)
  }

  close() {
    this.dataService.data.internet.closed = true;
    this.dataService.data.internet.tray = true;
    this.dataService.changeMessage(this.dataService.data)
    this.dataService.toggleOther(1)
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
    const minheight: number = 200;
    if (
      event.rectangle.width &&
      event.rectangle.height &&
      (event.rectangle.width < minwidth ||
        event.rectangle.height < minheight)
    ) {
      return false;
    }
    if (event.rectangle.height != null) {
      this.browserHeight = event.rectangle.height-this.subValue
      console.log(this.browserHeight)
    }
    if (event.rectangle.width != null) {
      this.title = event.rectangle.width > 1035
    }
    return true;
  }
  focus() {
    this.dataService.focus = 1
  }

  rick(offsetWidth: number, offsetHeight: number) {
    if (offsetWidth>700 && offsetHeight >400){
      return true;
    }else {
      return false
    }
  }
}
