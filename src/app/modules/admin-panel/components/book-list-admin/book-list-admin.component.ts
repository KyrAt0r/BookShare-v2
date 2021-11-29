import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { BooksServerResponse, BooksService, GenresResponse } from '../../../../core/services/books.service';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription, SubscriptionLike } from 'rxjs';
import { MatSort } from '@angular/material/sort';
import { FormControl, FormGroup } from '@angular/forms';
import { SelectionModel } from '@angular/cdk/collections';
import { FilteredColumns } from '../../../../core/models/filtered-columns';
import { MatDialog } from '@angular/material/dialog';
import { KeepBookDialogComponent } from '../../../../shared/modules/keep-book-dialog/keep-book-dialog/keep-book-dialog.component';
import { AddBookDialogComponent } from '../../../../shared/modules/add-book-dialog/add-book-dialog.component';
import { MatPaginator } from '@angular/material/paginator';
import { User } from '../../../../core/models/user.models';
import { UsersService } from '../../../../core/services/users.service';

@Component({
  selector: 'app-book-list-admin',
  templateUrl: './book-list-admin.component.html',
  styleUrls: ['./book-list-admin.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BookListAdminComponent implements OnInit, OnDestroy {
  adminStatus: boolean;
  books: BooksServerResponse[] = [];
  users: User[] = [];
  displayedColumns: string[] = ['chek', 'title', 'publisher', 'genre', 'author', 'give'];
  filteredColumns: FilteredColumns[] = [
    {value: 'title', viewValue: 'Названию'},
    {value: 'publisher', viewValue: 'Издательству'},
    {value: 'genre', viewValue: 'Жанру'},
    {value: 'author', viewValue: 'Автору'}];
  dataSource = new MatTableDataSource<BooksServerResponse>(this.books);
  selection = new SelectionModel<BooksServerResponse>(true, []);
  genres: GenresResponse[] = [];
  genre: string;
  subscriptions: SubscriptionLike[] = [];
  allComplete: boolean;

  filter = new FormGroup({
    valueColumn: new FormControl(),
    valueFilter: new FormControl('')
  });

  filterValues = {
    title: '',
    publisher: '',
    genre: '',
    author: ''
  };

  private subsBooks: Subscription;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private bookList: BooksService,
    private cdRef: ChangeDetectorRef,
    public dialog: MatDialog,
    private usersList: UsersService
  ) {
  }

  ngOnInit(): void {
    this.subscriptions.push(
      this.bookList.getBooks()
        .subscribe(data => {
          this.buildData(data);
          this.cdRef.detectChanges();
        }));

    this.filter.valueChanges.subscribe(value => {
      this.filterValues.title = '';
      this.filterValues.publisher = '';
      this.filterValues.genre = '';
      this.filterValues.author = '';

      switch (value.valueColumn) {
        case 'title':
          this.filterValues.title = value.valueFilter;
          this.dataSource.filter = JSON.stringify(this.filterValues);
          break;

        case 'publisher':
          this.filterValues.publisher = value.valueFilter;
          this.dataSource.filter = JSON.stringify(this.filterValues);
          break;

        case 'genre':
          this.filterValues.genre = value.valueFilter;
          this.dataSource.filter = JSON.stringify(this.filterValues);
          break;

        case 'author':
          this.filterValues.author = value.valueFilter;
          this.dataSource.filter = JSON.stringify(this.filterValues);
          break;
      }
    });
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(
      (subscription) => subscription.unsubscribe());
    this.subscriptions = [];
  }

  tableFilter(): (data: BooksServerResponse, filter: string) => boolean {
    return (data: BooksServerResponse, filter: string): boolean => {
      const search = JSON.parse(filter);
      return data.title.toString().toLowerCase().indexOf(search.title.toLowerCase()) !== -1
        && data.id.toString().toLowerCase().indexOf(search.publisher.toLowerCase()) !== -1
        && data.genre.toString().toLowerCase().indexOf(search.genre.toLowerCase()) !== -1
        && data.author.toString().toLowerCase().indexOf(search.author.toLowerCase()) !== -1;
    };
  }

  buildData(books): void {
    this.subscriptions.push(this.usersList.getUsers()
      .subscribe(usersResponse => {
        this.users = usersResponse;
        books.forEach(book => {
          const newBook = this.generateBook(book);
          this.books.push(newBook);
          this.dataSource = new MatTableDataSource(this.books);
          this.dataSource.sort = this.sort;
          this.dataSource.paginator = this.paginator;
          this.dataSource.filterPredicate = this.tableFilter();
        });
      }));
  }

  generateBook(book): any {
    return {
      id: book.id,
      title: book.title,
      author: book.author,
      genre: book.genre,
      annotation: book.annotation,
      publisher: book.publisher,
      stars: book.stars,
      inUse: this.bookStatus(book.id)
    };
  }

  bookStatus(id): boolean {
    let inUse = false;
    this.users.forEach(user => {
      if (user.bookInUse.some(bookId => bookId === id)) { inUse = true; }
    });
    return inUse;
  }

  giveBook(book: BooksServerResponse): void {
    this.dialog.open(KeepBookDialogComponent, {
      data: [book],
    });
  }

  keepBooks(): void {
    this.dialog.open(KeepBookDialogComponent, {
      data: this.selection.selected,
    });
  }

  addBook(): void {
    this.dialog.open(AddBookDialogComponent);
  }

  isAllSelected(): boolean {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.filteredData.length;
    return numSelected === numRows;
  }

  masterToggle(): void {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }

    this.selection.select(...this.dataSource.filteredData);
  }


}
