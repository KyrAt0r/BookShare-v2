import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookListPageComponent } from './components/book-list-page/book-list-page.component';
import { BookListPageRoutingModule } from './book-list-page-routing.module';
import {MatCardModule} from '@angular/material/card';




@NgModule({
  declarations: [
    BookListPageComponent
  ],
  imports: [
    CommonModule,
    BookListPageRoutingModule,
    MatCardModule
  ]
})
export class BookListPageModule { }
