import {Component, OnInit, ViewChild} from '@angular/core';
import {UserServerResponse, UsersService} from '../../../../core/services/users.service';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';



@Component({
  selector: 'app-user-list-page',
  templateUrl: './user-list-page.component.html',
  styleUrls: ['./user-list-page.component.scss'],
  providers: [UsersService]
})

export class UserListPageComponent implements OnInit {

  users: UserServerResponse[] = [];

  constructor(private usersList: UsersService) {
  }
  displayedColumns: string[] = ['login', 'e-mail'];
  dataSource = new MatTableDataSource<UserServerResponse>(this.users);

  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngOnInit(): void {
    this.loadUsers();
  }

  // tslint:disable-next-line:typedef
  loadUsers() {
    this.usersList.getUsers()
      .subscribe(data => {
        console.log(data);
        this.dataSource = new MatTableDataSource(data);
        this.dataSource.paginator = this.paginator;
      });
  }
}
