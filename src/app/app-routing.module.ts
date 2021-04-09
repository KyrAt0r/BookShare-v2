import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {NotFoundComponent} from "./components/not-found/not-found.component";
import {AppShellComponent} from "./components/app-shell/app-shell.component";

const routes: Routes = [
  {
    path: '',
    component: AppShellComponent,
    children: [
      {path: '', redirectTo: 'home', pathMatch: 'full'},
      {
        path: 'home',
        loadChildren: () => import('./modules/home-page/home-page.module').then(m => m.HomePageModule),
      },
      {
        path: 'login',
        loadChildren: () => import('./modules/authentication/authentication.module').then(m => m.AuthenticationModule),
      },
      {
        path: 'user-list',
        loadChildren: () => import('./modules/user-list-page/user-list-page.module').then(m => m.UserListPageModule),
      },
    ],
  },
  {
    path: '**',
    component: NotFoundComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
