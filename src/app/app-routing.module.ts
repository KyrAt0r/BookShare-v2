import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {NotFoundComponent} from './components/not-found/not-found.component';
import {AppShellComponent} from './components/app-shell/app-shell.component';
import {AuthGuard} from './core/guards/auth.guard';
import {LoginPageGuard} from './core/guards/login-page.guard';

const routes: Routes = [
  {
    path: '',
    component: AppShellComponent,
    children: [
      {path: '', redirectTo: 'home', pathMatch: 'full'},
      {
        path: 'home',
        loadChildren: () => import('./modules/home-page/home-page.module').then(m => m.HomePageModule),
        data: {
          preload: true,
          title: 'Главная',
        },
      },
      {
        path: 'book-list',
        loadChildren: () => import('./modules/book-list-page/book-list-page.module').then(m => m.BookListPageModule),
        data: {
          preload: true,
          title: 'Список книг',
        },
      },
      {
        path: 'user-list',
        loadChildren: () => import('./modules/user-list-page/user-list-page.module').then(m => m.UserListPageModule),
        data: {
          preload: true,
          title: 'Список пользователей',
        },
      },
    ],
    canActivate: [AuthGuard],
  },
  {
    path: 'login',
    loadChildren: () => import('./modules/authentication/authentication.module').then(m => m.AuthenticationModule),
    data: {preload: false, title: 'Авторизация'},
    canActivate: [LoginPageGuard],
  },
  {
    path: '**',
    component: NotFoundComponent,
    data: {
      preload: true,
      title: '404',
    },
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
