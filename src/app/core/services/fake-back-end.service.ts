import { Injectable } from '@angular/core';
import { BooksServerResponse, BooksService } from './books.service';
import { User } from '../models/user.models';
import { UsersService } from './users.service';

@Injectable({
  providedIn: 'root'
})
export class FakeBackEndService {
  books: BooksServerResponse[] = [];
  users: User[] = [];

  constructor(
    private bookList: BooksService,
    private usersList: UsersService,
  ) {
    this.bookList.getBooks()
      .subscribe(data => {
        this.books = data;
      });
    this.usersList.getUsers()
      .subscribe(data => {
        this.users = data;
      });
  }

  getBooks(): BooksServerResponse[] {
    return this.books;
  }

  addBook(newBook: BooksServerResponse): void {
    this.books.push(newBook);
  }

  addUser(newUser: User): void {
    this.users.push(newUser);
  }
}
