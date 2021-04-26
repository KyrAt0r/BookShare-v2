import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserListPageComponent } from './components/user-list-page/user-list-page.component';
import {UserListPageRoutingModule} from "./user-list-routing.module";
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatTableModule} from '@angular/material/table';
import {MatInputModule} from '@angular/material/input';



@NgModule({
  declarations: [
    UserListPageComponent
  ],
  imports: [
    CommonModule,
    UserListPageRoutingModule,
    MatPaginatorModule,
    MatTableModule,
    MatInputModule
  ]
})
export class UserListPageModule { }
