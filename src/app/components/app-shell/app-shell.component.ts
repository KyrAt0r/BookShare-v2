import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from '../../core/services/auth.service';

@Component({
  selector: 'app-app-shell',
  templateUrl: './app-shell.component.html',
  styleUrls: ['./app-shell.component.scss']
})
export class AppShellComponent implements OnInit {

  constructor(
    private authService: AuthService,
    private router: Router
  ) {

  }

  ngOnInit(): void {
  }

  logout(): void {
    if (this.authService.logOut()) {
      this.router.navigate(['login']);
    }
  }

  loginStatus(): boolean {
    if (this.authService.getAuthStatus()) {
      return true;
    }
  }

}
