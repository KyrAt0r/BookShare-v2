import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';

export interface BooksServerResponse {
  id: string;
  title: string;
  author: string;
  genre: any;
  annotation: string;
  publisher: string;
  stars: number;
}

export interface GenresResponse {
  id: number;
  genre: string;
}

@Injectable({
  providedIn: 'root'
})
export class BooksService {

  constructor(private http: HttpClient) {
  }

  getBooks(): Observable<BooksServerResponse[]> {
    return this.http.get<BooksServerResponse[]>('./assets/data/bookList.json');
  }

  getGenres(): Observable<GenresResponse[]> {
    return this.http.get<GenresResponse[]>('./assets/data/genre.json');
  }
}
