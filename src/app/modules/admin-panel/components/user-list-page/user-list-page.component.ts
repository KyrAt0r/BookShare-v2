import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { UsersService } from '../../../../core/services/users.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { User } from '../../../../core/models/user.models';
import { MatDialog } from '@angular/material/dialog';
import { UserPageComponent } from '../../../user-page/components/user-page/user-page.component';
import { AddUserDialogComponent } from '../../../../shared/modules/add-user-dialog/add-user-dialog.component';
import { FakeBackEndService } from '../../../../core/services/fake-back-end.service';

@Component({
  selector: 'app-user-list-page',
  templateUrl: './user-list-page.component.html',
  styleUrls: ['./user-list-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [UsersService]
})

export class UserListPageComponent implements OnInit, OnDestroy {

  users: User[] = [];
  private subs: Subscription;

  constructor(
    private usersList: UsersService,
    public dialog: MatDialog,
    private cdRef: ChangeDetectorRef,
    private fb: FakeBackEndService,
  ) {
  }

  displayedColumns: string[] = ['login', 'e-mail', 'role'];
  dataSource = new MatTableDataSource<User>(this.users);

  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngOnInit(): void {
    this.loadUsers();
  }

  ngOnDestroy() {
    if (this.subs) {
      this.subs.unsubscribe();
    }
  }

  // tslint:disable-next-line:typedef
  loadUsers() {
    this.subs =
      this.usersList.getUsers()
        .subscribe(data => {
          this.buildData(data);
          this.cdRef.detectChanges();
        });
  }

  // tslint:disable-next-line:typedef
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }


  onClick(user: User[]) {
    console.log(user);
    this.dialog.open(UserPageComponent, {
      width: '90rem',
      height: '47rem',
      data: user
    });
  }

  addUser() {
    this.dialog.open(AddUserDialogComponent).afterClosed().subscribe(model => this.buildData(this.fb.users));
  }

  private buildData(user: User[]) {
    this.dataSource = new MatTableDataSource(user);
    this.dataSource.paginator = this.paginator;
  }
}
