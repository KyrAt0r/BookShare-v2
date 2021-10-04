import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {StarRatingComponent} from './modules/star-raiting/components/star-rate/star-rate.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {KeepBookDialogComponent} from './modules/keep-book-dialog/keep-book-dialog/keep-book-dialog.component';
import {MatDialogModule} from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {BookCardComponent} from './modules/book-card/components/book-card/book-card.component';
import {MatCardModule} from '@angular/material/card';
import {MatSelectModule} from '@angular/material/select';
import {AddBookDialogComponent} from './modules/add-book-dialog/add-book-dialog.component';


@NgModule({
  declarations: [
    StarRatingComponent,
    BookCardComponent,

    KeepBookDialogComponent,
    AddBookDialogComponent
  ],
  entryComponents: [
    KeepBookDialogComponent,
    AddBookDialogComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,

    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatSelectModule,
  ],
  exports: [
    StarRatingComponent,
    BookCardComponent
  ],
})
export class SharedModule {
}
