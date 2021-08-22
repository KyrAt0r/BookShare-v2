import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {BookListPageComponent} from './components/book-list-page/book-list-page.component';
import {BookListPageRoutingModule} from './book-list-page-routing.module';
import {MatCardModule} from '@angular/material/card';
import {BookCardModule} from '../../shared/modules/book-card/book-card.module';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatInputModule} from '@angular/material/input';
import {MatSortModule} from '@angular/material/sort';




@NgModule({
  declarations: [
    BookListPageComponent,
  ],
  imports: [
    CommonModule,
    BookListPageRoutingModule,
    BookCardModule,
  ]
})
export class BookListPageModule {
}
