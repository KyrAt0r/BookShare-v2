import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {UserListPageComponent} from "./components/user-list-page/user-list-page.component";


const routes: Routes = [
  {
    path: '',
    component: UserListPageComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserListPageRoutingModule {
}
