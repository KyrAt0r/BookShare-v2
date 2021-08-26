import {Injectable} from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from '@angular/router';
import {AuthService} from "../services/auth.service";


@Injectable({
  providedIn: 'root'
})

export class RoleGuard implements CanActivate {

  constructor(
    private authService: AuthService,
    private router: Router
  ) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (!this.authService.getUserRole(route.data.role)) {
      this.router.navigate(['']);
      return false;
    }
    return true;
  }

  // return this.usersList.getUsers().pipe(map(data => {
  //     if (data.some(user => user.id === localStorage.getItem('id') && user.role === RoleEnum.admin)){
  //       return true
  //     } else {
  //       this.router.navigate(['/home']);
  //     }
  //   }
  // ));
  // }
}
