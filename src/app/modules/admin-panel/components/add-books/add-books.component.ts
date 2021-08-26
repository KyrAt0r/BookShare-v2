import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-add-books',
  templateUrl: './add-books.component.html',
  styleUrls: ['./add-books.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddBooksComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
