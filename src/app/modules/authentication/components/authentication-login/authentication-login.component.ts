import {ChangeDetectionStrategy, Component, OnDestroy} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {AuthService} from '../../../../core/services/auth.service';
import {Router} from '@angular/router';
import {Subscription} from "rxjs";

@Component({
  selector: 'app-authentication-login',
  templateUrl: './authentication-login.component.html',
  styleUrls: ['./authentication-login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AuthenticationLoginComponent implements OnDestroy{
  form = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(3)]],
  });
  errMessage: string;
  loginStatus: boolean;
  private subs: Subscription;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
  }

  onSubmit() {
    this.subs = this.authService.logIn(this.form.get('email')?.value, this.form.get('password').value)
      .subscribe(data => {
        if (data) {
          this.router.navigate(['home']);
        } else {
          this.errMessage = 'Пользователь не найден или неверный пароль';
        }
      });
  }

  ngOnDestroy(){
    if(this.subs) this.subs.unsubscribe()
  }
}
