import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {BookListPageComponent} from './components/book-list-page/book-list-page.component';



const routes: Routes = [
  {
    path: '',
    component: BookListPageComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BookListPageRoutingModule {
}
