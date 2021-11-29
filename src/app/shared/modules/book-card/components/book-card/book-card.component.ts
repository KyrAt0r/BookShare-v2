import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-book-card',
  templateUrl: './book-card.component.html',
  styleUrls: ['./book-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BookCardComponent implements OnInit {
  @Input() book;

  booksCard: FormGroup;
  constructor() {}

  ngOnInit(): void {
    // this.booksCard.get('starRate');
    this.booksCard = new FormGroup({
      starRate: new FormControl(this.book.stars),
    });
    this.booksCard.valueChanges.subscribe(val => console.log(val));
  }

}
