import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Inject, InjectionToken, Input, OnDestroy, OnInit } from '@angular/core';
import { UsersService } from '../../../../core/services/users.service';
import { combineLatest, SubscriptionLike } from 'rxjs';
import { BooksServerResponse, BooksService } from '../../../../core/services/books.service';
import { getUser } from '../../../../core/models/get-user.model';
import { Router } from '@angular/router';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { User } from '../../../../core/models/user.models';

@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserPageComponent implements OnInit, OnDestroy {

  id: string = localStorage.getItem('id');
  name: string;
  role: string;
  email: string;
  bookIdInUse: string[];
  bookInUse: BooksServerResponse[];
  subscriptions: SubscriptionLike[] = [];

  isModal: boolean;

  constructor(
    private router: Router,
    private usersInfo: UsersService,
    private cdRef: ChangeDetectorRef,
    private bookList: BooksService,
    public dialogRef: MatDialogRef<UserPageComponent>,
    @Inject(MAT_DIALOG_DATA) public externalUser: User,
  ) {
  }

  ngOnInit(): void {
    if (Object.keys(this.externalUser).length !== 0) {
      this.isModal = true;
      this.subscriptions.push(
        this.bookList.getBooks().subscribe(bookList => {
          this.name = this.externalUser.userName;
          this.role = this.externalUser.role;
          const metaBook = [];
          this.externalUser.bookInUse.forEach(id => {
            metaBook.push(bookList.find(book => book.id === id));
            this.bookInUse = metaBook;
          });
          this.email = this.externalUser.email;
          this.cdRef.detectChanges();
        })
      );
    } else {
      this.isModal = false;
      this.subscriptions.push(
        combineLatest([this.usersInfo.getUsers(), this.bookList.getBooks()]).subscribe(
          ([usersInfo, bookList]: any) => {
            this.name = getUser(usersInfo, this.id).userName;
            this.role = getUser(usersInfo, this.id).role;
            this.bookIdInUse = getUser(usersInfo, this.id).bookInUse;
            const metaBook = [];
            this.bookIdInUse?.forEach(id => {
              metaBook.push(bookList.find(book => book.id === id));
              this.bookInUse = metaBook;
            });
            this.email = getUser(usersInfo, this.id).email;
            this.cdRef.detectChanges();
          }
        ));
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(
      (subscription) => subscription.unsubscribe());
    this.subscriptions = [];
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
