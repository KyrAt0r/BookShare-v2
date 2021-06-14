import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.scss']
})
export class UserPageComponent implements OnInit {
  id: number;
  name: string = localStorage.getItem('userName');
  role: string;
  email: string;

  constructor() { }

  ngOnInit(): void {
  }

}
