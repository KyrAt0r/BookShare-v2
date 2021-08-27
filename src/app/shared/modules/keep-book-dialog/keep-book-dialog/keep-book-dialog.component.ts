import {Component, OnInit, ChangeDetectionStrategy, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {UsersService} from '../../../../core/services/users.service';
import {User} from '../../../../core/models/user.models';
import {RoleEnum} from '../../../../core/models/role.models';
import {MatOption} from '@angular/material/core';
import {BooksServerResponse} from '../../../../core/services/books.service';

@Component({
  selector: 'app-keep-book-dialog',
  templateUrl: './keep-book-dialog.component.html',
  styleUrls: ['./keep-book-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class KeepBookDialogComponent implements OnInit {
  titleDialog: string;
  users: User[];
  selectedUser: User;

  constructor(
    public dialogRef: MatDialogRef<KeepBookDialogComponent>,
    private userService: UsersService,
    @Inject(MAT_DIALOG_DATA) public data: BooksServerResponse[]
  ) {
    this.userService.getUsers().subscribe(data => {
      this.users = data.filter(user => user.role === RoleEnum.user);
    });
  }

  ngOnInit(): void {
    if (this.data.length > 1) {
      this.titleDialog = 'Выдать выбранные книги';
    } else {
      this.titleDialog = 'Выдать выбранную книгу';
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  search(value: string) {
    this.users = this.users.filter(user => user.userName.toLowerCase().includes(value.toLowerCase()));
  }

  approve() {
    console.log(this.data)
    // this.data.forEach(book => {
    //   this.selectedUser.bookInUse.push(book.id);
    // });
    // console.log(this.selectedUser);
    // return this.selectedUser;
  }

  selectUser(selected: MatOption) {
    this.selectedUser = this.users.find(user => user.id === selected?.value);
  }
}
