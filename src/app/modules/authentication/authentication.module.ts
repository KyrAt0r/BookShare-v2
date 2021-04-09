import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AuthenticationLoginComponent} from './components/authentication-login/authentication-login.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {AuthenticationRoutingModule} from "./authentication-routing.module";


@NgModule({
  declarations: [
    AuthenticationLoginComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AuthenticationRoutingModule,
    FormsModule
  ],
})
export class AuthenticationModule {
}
