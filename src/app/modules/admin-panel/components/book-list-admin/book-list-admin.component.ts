import {Component, OnInit, ChangeDetectionStrategy, ViewChild, ChangeDetectorRef} from '@angular/core';
import {BooksServerResponse, BooksService, GenresResponse} from "../../../../core/services/books.service";
import {MatTableDataSource} from "@angular/material/table";
import {Subscription} from "rxjs";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";

@Component({
  selector: 'app-book-list-admin',
  templateUrl: './book-list-admin.component.html',
  styleUrls: ['./book-list-admin.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BookListAdminComponent implements OnInit {
  books: BooksServerResponse[] = [];
  genres: GenresResponse[] = [];
  genre: string;
  adminStatus: boolean;
  displayedColumns: string[] = ['title', 'publisher', 'genre', 'author'];
  dataSource = new MatTableDataSource<BooksServerResponse>(this.books);
  private subsBooks: Subscription;
  private subsGenre: Subscription;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private bookList: BooksService,
    private cdRef: ChangeDetectorRef,
  ) { }

  ngOnInit(): void {
    this.subsBooks =
      this.bookList.getBooks()
        .subscribe(data => {
          this.dataSource = new MatTableDataSource(data);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
          this.cdRef.detectChanges();
        });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
