import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {UsersService} from '../../../../core/services/users.service';
import {Subscription} from 'rxjs';
import {BooksServerResponse, BooksService} from '../../../../core/services/books.service';
import {getUser} from '../../../../core/models/get-user.model';
import {Router} from '@angular/router';

@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserPageComponent implements OnInit {
  id: string = localStorage.getItem('id');
  name: string;
  role: string;
  email: string;
  bookIdInUse: string[];
  bookInUse: BooksServerResponse[];

  private subs: Subscription;
  private subsBook: Subscription;

  constructor(
    private router: Router,
    private usersInfo: UsersService,
    private cdRef: ChangeDetectorRef,
    private bookList: BooksService
  ) {
  }

  ngOnInit(): void {
    this.subs =
      this.usersInfo.getUsers()
        .subscribe(data => {
          this.name = getUser(data, this.id).userName;
          this.role = getUser(data, this.id).role;
          this.bookIdInUse = getUser(data, this.id).bookInUse;
          this.getUserBooks(this.bookIdInUse);
          this.email = getUser(data, this.id).email;
          this.cdRef.detectChanges();
        });
  }

  getUserBooks(ids): void {
    let books = [];
    this.subsBook =
      this.bookList.getBooks()
        .subscribe(data => {
          ids.forEach(id => {
            books.push(data.find(book => book.id === id));
          });

          this.bookInUse = books;
          this.cdRef.detectChanges();
        });
  }


  ngOnDestroy(): void {
    if (this.subs) {
      this.subs.unsubscribe();
    }

  }

}
