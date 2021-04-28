import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {BooksServerResponse, BooksService} from '../../../../core/services/books.service';

@Component({
  selector: 'app-book-list-page',
  templateUrl: './book-list-page.component.html',
  styleUrls: ['./book-list-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [BooksService]
})
export class BookListPageComponent implements OnInit {
  books: BooksServerResponse[] = [];

  constructor(
    private bookList: BooksService,
    private cdRef: ChangeDetectorRef) {
  }

  // tslint:disable-next-line:typedef
  ngOnInit() {

    this.bookList.getBooks()
      .subscribe(data => {
        console.log(data);
        this.books = data;
        this.cdRef.markForCheck();
      });
  }
}
