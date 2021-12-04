import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-default',
  templateUrl: './default.component.html',
  styleUrls: ['./default.component.scss']
})
export class DefaultComponent {
  sideBarOpen = true;

  constructor() {
  }

  ngOnInit(): void {
  }

  sideBarToggler($event: boolean) {
    this.sideBarOpen = !this.sideBarOpen;
  }
}
