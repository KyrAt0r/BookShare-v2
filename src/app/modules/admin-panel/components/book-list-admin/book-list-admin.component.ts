import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, ViewChild} from '@angular/core';
import {BooksServerResponse, BooksService, GenresResponse} from "../../../../core/services/books.service";
import {MatTableDataSource} from "@angular/material/table";
import {Subscription} from "rxjs";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {FormControl, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-book-list-admin',
  templateUrl: './book-list-admin.component.html',
  styleUrls: ['./book-list-admin.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BookListAdminComponent implements OnInit {
  adminStatus: boolean;
  books: BooksServerResponse[] = [];
  displayedColumns: string[] = ['chek','title', 'publisher', 'genre', 'author', 'give'];
  dataSource = new MatTableDataSource<BooksServerResponse>(this.books);

  filter = new FormGroup({
    column: new FormControl(),
    valueFilter: new FormControl('')
  })
  genres: GenresResponse[] = [];
  genre: string;

  private subsBooks: Subscription;
  private subsGenre: Subscription;

  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private bookList: BooksService,
    private cdRef: ChangeDetectorRef,
  ) {
    this.subsBooks =
      this.bookList.getBooks()
        .subscribe(data => {
          this.dataSource = new MatTableDataSource(data);
          this.dataSource.sort = this.sort;
          this.cdRef.detectChanges();
        });
  }

  ngOnInit(): void {
    this.filter.valueChanges.subscribe(value => {
      console.log(value)
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    console.log(this.dataSource)
  }

  giveBook(id: string){
    console.log(id)
  }
}
