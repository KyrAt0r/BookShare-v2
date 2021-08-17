import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookCardComponent } from './components/book-card/book-card.component';
import {MatCardModule} from '@angular/material/card';
import {StarRateModule} from '../star-raiting/star-rate.module';
import {ReactiveFormsModule} from '@angular/forms';



@NgModule({
  declarations: [
    BookCardComponent
  ],
  exports: [
    BookCardComponent
  ],
  imports: [
    CommonModule,
    MatCardModule,
    StarRateModule,
    ReactiveFormsModule
  ]
})
export class BookCardModule { }
