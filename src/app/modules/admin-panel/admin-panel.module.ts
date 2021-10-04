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
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatButtonModule} from "@angular/material/button";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {MatMenuModule} from "@angular/material/menu";
import {MatSelectModule} from "@angular/material/select";
import {MatBadgeModule} from '@angular/material/badge';
import {MatDialogModule, MatDialogRef} from "@angular/material/dialog";



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
    MatSortModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatToolbarModule,
    MatCheckboxModule,
    MatMenuModule,
    MatSelectModule,
    FormsModule,
    MatBadgeModule,
    MatDialogModule
  ],
  providers: [
    { provide: MatDialogRef, useValue: {}}]
})
export class AdminPanelModule { }
