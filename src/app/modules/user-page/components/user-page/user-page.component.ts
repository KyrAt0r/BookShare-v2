import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {UsersService} from '../../../../core/services/users.service';
import {SubscriptionLike} from 'rxjs';
import {BooksServerResponse, BooksService} from '../../../../core/services/books.service';
import {getUser} from '../../../../shared/models/get-user.model';
import {Router} from '@angular/router';

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
      this.usersInfo.getUsers()
        .subscribe(data => {
          this.name = getUser(data, this.id).userName;
          this.role = getUser(data, this.id).role;
          this.bookIdInUse = getUser(data, this.id).bookInUse;
          this.getUserBooks(this.bookIdInUse);
          this.email = getUser(data, this.id).email;
          this.cdRef.detectChanges();
        }));
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(
      (subscription) => subscription.unsubscribe());
    this.subscriptions = [];
  }

  getUserBooks(ids) {
    const books = [];
    this.subscriptions.push(
      this.bookList.getBooks()
        .subscribe(data => {
          ids.forEach(id => {
            books.push(data.find(book => book.id === id));
          });
          this.bookInUse = books;
          this.cdRef.detectChanges();
        }));
  }

}
