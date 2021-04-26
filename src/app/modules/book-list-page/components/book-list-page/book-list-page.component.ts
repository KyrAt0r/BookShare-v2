import {Component, OnInit} from '@angular/core';
import {BooksServerResponse, BooksService} from '../../../../core/services/books.service';
import {UserServerResponse} from '../../../../core/services/users.service';

@Component({
  selector: 'app-book-list-page',
  templateUrl: './book-list-page.component.html',
  styleUrls: ['./book-list-page.component.scss']
})
export class BookListPageComponent implements OnInit {

  books: BooksServerResponse[] = [];

  constructor(private bookList: BooksService) {
  }

  // tslint:disable-next-line:typedef
  ngOnInit()  {
    this.bookList.getBooks()
      .subscribe(data => {
        console.log(data['bookList']);
        this.books = data['bookList'];
      });
  }
}
