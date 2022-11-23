import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor() { }

  toggleStart = false;

  ngOnInit(): void {
  }

  starToggle() {
    this.toggleStart = !this.toggleStart;
  }
}
