import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserListPageComponent } from './components/user-list-page/user-list-page.component';
import {UserListPageRoutingModule} from "./user-list-routing.module";



@NgModule({
  declarations: [
    UserListPageComponent
  ],
  imports: [
    CommonModule,
    UserListPageRoutingModule
  ]
})
export class UserListPageModule { }
