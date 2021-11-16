import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-default',
  templateUrl: './default.component.html',
  styleUrls: ['./default.component.scss']
})
export class DefaultComponent implements OnInit {
  sideBarOpen = true;

  constructor() {
  }

  ngOnInit(): void {
    // document.getElementById('btn-add').click();
  }

  sideBarToggler($event: boolean) {
    this.sideBarOpen = !this.sideBarOpen;
  }
}
