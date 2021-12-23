import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookListPageComponent } from './components/book-list-page/book-list-page.component';
import { BookListPageRoutingModule } from './book-list-page-routing.module';
import { SharedModule } from '../../shared/shared.module';




@NgModule({
  declarations: [
    BookListPageComponent,
  ],
  imports: [
    CommonModule,
    BookListPageRoutingModule,
    SharedModule,
  ]
})
export class BookListPageModule {
}
