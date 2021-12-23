import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-book-card',
  templateUrl: './book-card.component.html',
  styleUrls: ['./book-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BookCardComponent implements OnInit {
  @Input() book;

  booksCard = this.formBuilder.group({
    starRate: new FormControl(),
  });
  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.booksCard.get('starRate').patchValue(this.book.stars);
  }

}
