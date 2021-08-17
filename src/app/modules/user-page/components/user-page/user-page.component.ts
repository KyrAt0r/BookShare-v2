import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {UsersService} from '../../../../core/services/users.service';
import {Subscription} from 'rxjs';
import {BooksServerResponse, BooksService} from '../../../../core/services/books.service';

@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserPageComponent implements OnInit {
  id: number = Number(localStorage.getItem('id'));
  name: string;
  role: string;
  email: string;
  bookIdInUse: [];
  bookInUse: BooksServerResponse[];

  private subs: Subscription;
  private subsBook: Subscription;

  constructor(private usersInfo: UsersService, private cdRef: ChangeDetectorRef, private bookList: BooksService) {
  }

  ngOnInit(): void {
    this.subs =
      this.usersInfo.getUsers()
        .subscribe(data => {
          this.name = this.getUser(data, this.id).userName;
          this.role = this.getUser(data, this.id).role;
          this.bookIdInUse = this.getUser(data, this.id).bookInUse;
          this.getUserBooks(this.bookIdInUse);
          this.email = this.getUser(data, this.id).email;
          this.cdRef.markForCheck();
        });
  }

  getUser(data, id) {
    return data.find(user => user.id === id);
  }

  getUserBooks(id) {
    this.subsBook =
      this.bookList.getBooks()
        .subscribe(data => {
          console.log(id);
          this.bookInUse = data.filter(book => book.id === id[0]);
          console.log(this.bookInUse);
          this.cdRef.detectChanges();
        });
  }


  // tslint:disable-next-line:typedef use-lifecycle-interface
  ngOnDestroy() {
    if (this.subs) {
      this.subs.unsubscribe();
    }

  }

}
