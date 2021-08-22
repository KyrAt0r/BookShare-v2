import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddBooksComponent } from './components/add-books/add-books.component';
import { BookListAdminComponent } from './components/book-list-admin/book-list-admin.component';
import { AdminPanelRoutingModule } from "./admin-panel-routing.module";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatTableModule} from "@angular/material/table";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatCardModule} from "@angular/material/card";
import {MatInputModule} from "@angular/material/input";
import {MatSortModule} from "@angular/material/sort";
import { AdminPanelComponent } from './components/admin-panel/admin-panel.component';
import {UserListPageComponent} from "./components/user-list-page/user-list-page.component";



@NgModule({
  declarations: [
    AddBooksComponent,
    BookListAdminComponent,
    AdminPanelComponent,
    UserListPageComponent
  ],
  imports: [
    CommonModule,
    AdminPanelRoutingModule,
    MatCardModule,
    MatFormFieldModule,
    MatTableModule,
    MatPaginatorModule,
    MatInputModule,
    MatSortModule
  ]
})
export class AdminPanelModule { }
