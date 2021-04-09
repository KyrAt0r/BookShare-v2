import {Component, Input, OnInit} from '@angular/core';
import {User, UsersService} from "../../../../services/users.service";
import {switchMap} from "rxjs/operators";

@Component({
  selector: 'app-user-list-page',
  templateUrl: './user-list-page.component.html',
  styleUrls: ['./user-list-page.component.scss'],
  providers: [UsersService]
})

export class UserListPageComponent implements OnInit {

  users: User[]=[];

  constructor(private usersList: UsersService) {}

  ngOnInit(): void {
    this.usersList.getUsers().subscribe(data => this.users=data);
  }

}
