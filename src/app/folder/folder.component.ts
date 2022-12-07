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

  kocka: {'height':number,'width':number,'top':number,'bottom':number,'left':number,'right':number} = {height:300,width:340,top:14,bottom:0,left:14,right:0,};
  fullToggle = true;
  me = false
  //Különleges probléma, különleges megoldása :DDD
  filesystem = {
    expand:true,
    img:'../../assets/img/mycomp.png',
    pretty:'Wut',
    MyComputer:{
      expand:true,
      img:'../../assets/img/mycomp.png',
      pretty:'My Computer',
      C:{
        expand:true,
        img:'../../assets/img/drive.png',
        pretty:'Local Drive (C:)',
        Windows:{
          expand:false,
          img:'../../assets/img/mapap.png',
          pretty:'Windows'
        },
        ProgramFiles:{
          expand:false,
          img:'../../assets/img/mapap.png',
          pretty:'Program Files'
        },
        Documents:{
          expand:true,
          img:'../../assets/img/mapap.png',
          pretty:'Documents and Settings',
          Guests:{
            expand:false,
            img:'../../assets/img/mapap.png',
            pretty:'All Users'
          },
          Csabi:{
            expand:true,
            img:'../../assets/img/mapap.png',
            pretty:'Csabi',
            Pictures:{
              expand:true,
              img:'../../assets/img/pictures.png',
              pretty:'Pictures',
              me:{
                expand:false,
                img:'../../assets/img/me.jpg',
                pretty:'me.jpg'
              },
            },
            Music:{
              expand:false,
              img:'../../assets/img/music.png',
              pretty:'Music'
            },
            MyWork:{
              expand:true,
              img:'../../assets/img/mapap.png',
              pretty:'My Work',
              hovirag:{
                expand:false,
                img:'../../assets/img/angular.png',
                pretty:'hovirag.hu'
              },
              digitmatek:{
                expand:false,
                img:'../../assets/img/digi.gif',
                pretty:'digitmatek.hu'

              }
            }
          }
        }
      }
    }
  }

  place:any = this.filesystem.MyComputer;
  actual:string[] = Object.keys(this.filesystem.MyComputer).slice(3)
  history:any[] = [this.filesystem]
  @Input() height?: number
  @Input() width?: number
  @ViewChild('rect') rect?: ElementRef;

  ngOnChanges(){
    if (this.height && this.width){
      if (this.height<this.kocka.height){
        this.kocka.height = this.height - 10
      }
      if (this.width<this.kocka.width){
        this.kocka.width = this.width - 10
      }
      if (this.height<140 || this.width<340){
        this.close()
      }
    }
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
    this.dataService.focus = 2
  }

  tray() {
    this.dataService.data.folder.tray = true;
    this.dataService.changeMessage(this.dataService.data)
    this.dataService.toggleOther(2)
  }

  close() {
    this.dataService.data.folder.closed = true;
    this.dataService.data.folder.tray = true;
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
    this.dataService.focus = 2
  }

  foldnav(i: string) {
    this.actual = Object.keys(this.place[i]).slice(3);
    this.history.push(this.place);
    this.place = this.place[i];
  }

  navback() {
    this.place = this.history[this.history.length-1];
    this.history.pop()
    this.actual = Object.keys(this.place).slice(3);
  }

  foldEvent(i: string) {
    switch (i) {
      case 'Windows':
        alert("No Permission");
        return
      case 'ProgramFiles':
        alert("No Permission");
        return
      case 'Guests':
        alert("No Permission");
        return
      case 'me':
        this.me = true
        return
      case 'Music':
        window.open('//youtube.com/watch?v=hC8CH0Z3L54&list=PLvJ99cyIh4bgKiDDlBYCqtrg6V5GFzN0z', "_blank")
        return
      case 'hovirag':
        window.open('//hovirag.procats.hu', "_blank")
        return
      case 'digitmatek':
        window.open('//digitmatek.hu', "_blank")
        return
    }
    console.log('HIHI' + i)

  }

  myComp() {
    this.place = this.filesystem.MyComputer;
    this.actual = Object.keys(this.filesystem.MyComputer).slice(3)
    this.history = [this.filesystem]
  }

  docu() {
    this.place = this.filesystem.MyComputer.C.Documents.Csabi;
    this.actual = Object.keys(this.place).slice(3)
    this.history = [this.filesystem,this.filesystem.MyComputer,this.filesystem.MyComputer.C,this.filesystem.MyComputer.C.Documents]
  }
}
