import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, ViewChild} from '@angular/core';
import {BooksServerResponse, BooksService, GenresResponse} from '../../../../core/services/books.service';
import {MatTableDataSource} from '@angular/material/table';
import {Subscription} from 'rxjs';
import {MatSort} from '@angular/material/sort';
import {FormControl, FormGroup} from '@angular/forms';
import {SelectionModel} from '@angular/cdk/collections';

interface Columns {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-book-list-admin',
  templateUrl: './book-list-admin.component.html',
  styleUrls: ['./book-list-admin.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BookListAdminComponent implements OnInit {
  adminStatus: boolean;
  books: BooksServerResponse[] = [];
  displayedColumns: string[] = ['chek', 'title', 'publisher', 'genre', 'author', 'give'];
  filteredColumns: Columns[] = [
    {value: 'title', viewValue: 'Названию'},
    {value: 'publisher', viewValue: 'Издательству'},
    {value: 'genre', viewValue: 'Жанру'},
    {value: 'author', viewValue: 'Автору'}];
  dataSource = new MatTableDataSource<BooksServerResponse>(this.books);
  selection = new SelectionModel<BooksServerResponse>(true, []);
  genres: GenresResponse[] = [];
  genre: string;

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
          this.dataSource.filterPredicate = this.tableFilter();
          this.cdRef.detectChanges();
        });
  }

  ngOnInit(): void {
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

  tableFilter(): (data: BooksServerResponse, filter: string) => boolean {
    return (data: BooksServerResponse, filter: string): boolean => {
      const search = JSON.parse(filter);
      return data.title.toString().toLowerCase().indexOf(search.title.toLowerCase()) !== -1
        && data.id.toString().toLowerCase().indexOf(search.publisher.toLowerCase()) !== -1
        && data.genre.toString().toLowerCase().indexOf(search.genre.toLowerCase()) !== -1
        && data.author.toString().toLowerCase().indexOf(search.author.toLowerCase()) !== -1;
    };
  }

  giveBook(id: string): void {
    console.log(id);
  }

  keepBooks(): void{
    console.log(this.selection.selected);
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
