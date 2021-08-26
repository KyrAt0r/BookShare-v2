import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {BooksServerResponse, BooksService, GenresResponse} from '../../../../core/services/books.service';
import {Subscription} from 'rxjs';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {AdminService} from '../../../../core/services/admin.service';
import {MatSort} from '@angular/material/sort';

@Component({
  selector: 'app-book-list-page',
  templateUrl: './book-list-page.component.html',
  styleUrls: ['./book-list-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [BooksService]
})
export class BookListPageComponent implements OnInit {
  books: BooksServerResponse[] = [];
  genres: GenresResponse[] = [];
  genre: string;
  adminStatus: boolean;
  displayedColumns: string[] = ['title', 'publisher', 'genre', 'author'];
  dataSource = new MatTableDataSource<BooksServerResponse>(this.books);
  private subsBooks: Subscription;
  private subsGenre: Subscription;

  constructor(
    private bookList: BooksService,
    private cdRef: ChangeDetectorRef,
    private adminService: AdminService) {
  }


  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('roleUserTemplate', {static: true}) roleUserTemplateRef: TemplateRef<any>;
  @ViewChild('roleAdminTemplate', {static: true}) roleAdminTemplateRef: TemplateRef<any>;

  ngOnInit(): void {
    this.loadBooks();

    //this.subsGenre =
    //  this.bookList.getGenres()
    //    .subscribe(data => {
    //      console.log(this.books);
    //      this.genres = data;
    //      this.cdRef.detectChanges();
    //    });

  }

  loadBooks() {
    this.subsBooks =
      this.bookList.getBooks()
        .subscribe(data => {
          this.books = data;
          this.cdRef.detectChanges();
        });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  // tslint:disable-next-line:typedef use-lifecycle-interface
  ngOnDestroy() {
    if (this.subsBooks) {
      this.subsBooks.unsubscribe();
      //this.subsGenre.unsubscribe();
    }
  }
}
