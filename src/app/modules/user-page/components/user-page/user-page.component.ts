import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { UsersService } from '../../../../core/services/users.service';
import { combineLatest, SubscriptionLike } from 'rxjs';
import { BooksServerResponse, BooksService } from '../../../../core/services/books.service';
import { getUser } from '../../../../core/models/get-user.model';
import { Router } from '@angular/router';

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

  constructor(
    private router: Router,
    private usersInfo: UsersService,
    private cdRef: ChangeDetectorRef,
    private bookList: BooksService
  ) {
  }

  ngOnInit(): void {
    this.subscriptions.push(
      combineLatest([this.usersInfo.getUsers(), this.bookList.getBooks()]).subscribe(
        ([usersInfo, bookList]: any) => {
          this.name = getUser(usersInfo, this.id).userName;
          this.role = getUser(usersInfo, this.id).role;
          this.bookIdInUse = getUser(usersInfo, this.id).bookInUse;
          const i = [];
          this.bookIdInUse?.forEach(id => {
            console.log(bookList.find(book => book.id === id));
            i.push(bookList.find(book => book.id === id));
            console.log(i);
            this.bookInUse = i;
          });
          console.log(this.bookInUse);
          this.email = getUser(usersInfo, this.id).email;
          this.cdRef.detectChanges();
        }
      ));
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(
      (subscription) => subscription.unsubscribe());
    this.subscriptions = [];
  }
}
