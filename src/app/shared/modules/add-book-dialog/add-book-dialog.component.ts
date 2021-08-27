import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-add-book-dialog',
  templateUrl: './add-book-dialog.component.html',
  styleUrls: ['./add-book-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddBookDialogComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
