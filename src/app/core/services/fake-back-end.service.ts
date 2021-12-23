import { Injectable } from '@angular/core';
import { BooksServerResponse, BooksService } from './books.service';

@Injectable({
  providedIn: 'root'
})
export class FakeBackEndService {
  books: BooksServerResponse[] = [];

  constructor(
    private bookList: BooksService,
  ) {
    this.bookList.getBooks()
      .subscribe(data => {
        this.books = data;
      });
  }

  getBooks(): BooksServerResponse[] {
    return this.books;
  }

  addBook(newBook: BooksServerResponse) {
    this.books.push(newBook);
  }
}
