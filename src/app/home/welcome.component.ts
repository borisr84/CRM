import { Component, OnInit } from '@angular/core';

@Component({
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {
  public subTitle = 'Angular Playground';
  constructor() { }

  ngOnInit(): void {
  }

}
