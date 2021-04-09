import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {AuthenticationLoginComponent} from "./components/authentication-login/authentication-login.component";


const routes: Routes = [
  {
    path: '',
    component: AuthenticationLoginComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthenticationRoutingModule {
}
