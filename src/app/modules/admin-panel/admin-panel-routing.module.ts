import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AddBooksComponent} from './components/add-books/add-books.component';
import {BookListAdminComponent} from './components/book-list-admin/book-list-admin.component';
import {AdminPanelComponent} from './components/admin-panel/admin-panel.component';
import {UserListPageComponent} from './components/user-list-page/user-list-page.component';


const routes: Routes = [
  {
    path: 'a',
    component: AdminPanelComponent,
  },
  {
    path: 'add-book',
    component: AddBooksComponent,
  },
  {
    path: '',
    component: BookListAdminComponent,
  },
  {
    path: 'user-list',
    component: UserListPageComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminPanelRoutingModule {
}
