import {Component} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {AuthService} from "../../../../services/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-authentication-login',
  templateUrl: './authentication-login.component.html',
  styleUrls: ['./authentication-login.component.scss']
})
export class AuthenticationLoginComponent {
  form = this.fb.group({
    login: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(4)]],
  });
  errMessage: string;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
  }


  onSubmit() {
    if (this.authService.logIn(this.form.get('login').value, this.form.get('password').value)) {
      this.router.navigate(['home']);
    } else {
      this.errMessage = "Пользователь не найден или неверный пароль";
    }
    //console.log(this.authService.logIn(this.form.get('username')?.value,this.form.get('password')?.value))
  }
}
