import {ChangeDetectionStrategy, Component, OnInit, ViewChild} from '@angular/core';
import {UsersService} from '../../../../core/services/users.service';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {Subscription} from 'rxjs';
import {User} from '../../../../core/models/user.models';

@Component({
  selector: 'app-user-list-page',
  templateUrl: './user-list-page.component.html',
  styleUrls: ['./user-list-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [UsersService]
})

export class UserListPageComponent implements OnInit {

  users: User[] = [];
  private subs: Subscription;

  constructor(private usersList: UsersService) {
  }

  displayedColumns: string[] = ['login', 'e-mail', 'role'];
  dataSource = new MatTableDataSource<User>(this.users);

  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngOnInit(): void {
    this.loadUsers();
  }

  // tslint:disable-next-line:typedef
  loadUsers() {
    this.subs =
      this.usersList.getUsers()
        .subscribe(data => {
          this.dataSource = new MatTableDataSource(data);
          this.dataSource.paginator = this.paginator;
        });
  }

  // tslint:disable-next-line:typedef
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  ngOnDestroy() {
    if (this.subs) this.subs.unsubscribe()
  }
}
