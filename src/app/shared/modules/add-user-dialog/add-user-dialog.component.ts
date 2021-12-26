import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from '../../../core/models/user.models';
import { guid } from '../../../core/models/guid.generator';
import { FakeBackEndService } from '../../../core/services/fake-back-end.service';
import { MatDialogRef } from '@angular/material/dialog';
import { AddBookDialogComponent } from '../add-book-dialog/add-book-dialog.component';

@Component({
  selector: 'app-add-user-dialog',
  templateUrl: './add-user-dialog.component.html',
  styleUrls: ['./add-user-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddUserDialogComponent implements OnInit {
  addUserForm: FormGroup;
  newUser: User;

  constructor(private fb: FakeBackEndService, public dialogRef: MatDialogRef<AddBookDialogComponent>) {
  }

  ngOnInit(): void {
    this.addUserForm = new FormGroup({
      userName: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      role: new FormControl('user'),
      bookInUse: new FormControl([])
    });
  }

  accept(): void {
    this.newUser = {
      id: guid(),
      userName: this.addUserForm.get('userName').value,
      email: this.addUserForm.get('email').value,
      password: this.addUserForm.get('userName').value,
      role: this.addUserForm.get('role').value,
      bookInUse: [],
    };

    this.fb.addUser(this.newUser);
    this.dialogRef.close();
  }

}
