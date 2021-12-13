import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { FakeBackEndService } from '../../../core/services/fake-back-end.service';
import { BooksServerResponse } from '../../../core/services/books.service';
import { guid } from '../../../core/models/guid.generator';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-add-book-dialog',
  templateUrl: './add-book-dialog.component.html',
  styleUrls: ['./add-book-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddBookDialogComponent implements OnInit {
  addBookForm: FormGroup;
  newBook: BooksServerResponse;

  constructor(private fb: FakeBackEndService, public dialogRef: MatDialogRef<AddBookDialogComponent>) { }

  ngOnInit(): void {
    this.addBookForm = new FormGroup({
      bookTitle: new FormControl(''),
      bookAuthor: new FormControl(''),
      bookGenre: new FormControl([1]),
      bookAnnotation: new FormControl(''),
      bookPublisher: new FormControl(''),
    });
  }

  accept(): void {
    this.newBook = {
      id: guid(),
      title: this.addBookForm.get('bookTitle').value,
      author: this.addBookForm.get('bookAuthor').value,
      genre: this.addBookForm.get('bookGenre').value,
      annotation: this.addBookForm.get('bookAnnotation').value,
      publisher: this.addBookForm.get('bookPublisher').value,
      stars: 0,
    };

    this.fb.addBook(this.newBook);

    console.log(this.newBook);
    this.dialogRef.close();
  }
}
