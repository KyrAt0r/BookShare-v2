import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';

export interface BooksServerResponse {
  title: string;
  author: string;
  genre: string;
  annotation: string;
  publisher: string;
  stars: string;
}

@Injectable({
  providedIn: 'root'
})
export class BooksService {

  constructor(private http: HttpClient) { }

  getBooks(): Observable<BooksServerResponse[]> {
    return this.http.get<BooksServerResponse[]>('./assets/data/bookList.json');
  }
}
