import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {BooksServerResponse, BooksService} from '../../../../core/services/books.service';
import {Subscription} from "rxjs";

@Component({
  selector: 'app-book-list-page',
  templateUrl: './book-list-page.component.html',
  styleUrls: ['./book-list-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [BooksService]
})
export class BookListPageComponent implements OnInit {
  books: BooksServerResponse[] = [];
  private subs: Subscription;

  constructor(
    private bookList: BooksService,
    private cdRef: ChangeDetectorRef) {
  }

  // tslint:disable-next-line:typedef
  ngOnInit() {
    this.subs =
      this.bookList.getBooks()
        .subscribe(data => {
          console.log(data);
          this.books = data;
          this.cdRef.markForCheck();
        });
  }

  ngOnDestroy(){
    if(this.subs) this.subs.unsubscribe()
  }
}
