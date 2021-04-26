import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookListPageComponent } from './components/book-list-page/book-list-page.component';
import { BookListPageRoutingModule } from './book-list-page-routing.module';



@NgModule({
  declarations: [
    BookListPageComponent
  ],
  imports: [
    CommonModule,
    BookListPageRoutingModule
  ]
})
export class BookListPageModule { }
