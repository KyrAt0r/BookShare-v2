import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AuthenticationLoginComponent} from './components/authentication-login/authentication-login.component';
import {ReactiveFormsModule} from '@angular/forms';
import {AuthenticationRoutingModule} from './authentication-routing.module';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';


@NgModule({
  declarations: [
    AuthenticationLoginComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AuthenticationRoutingModule,
    MatInputModule,
    MatButtonModule
  ],
})
export class AuthenticationModule {
}
