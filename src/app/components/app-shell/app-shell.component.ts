import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from '../../core/services/auth.service';
import {MatIconRegistry} from '@angular/material/icon';
import {DomSanitizer} from '@angular/platform-browser';
import {LOGO_BOOKS, USER_IMG} from 'src/app/core/const/icons';

@Component({
  selector: 'app-app-shell',
  templateUrl: './app-shell.component.html',
  styleUrls: ['./app-shell.component.scss']
})
export class AppShellComponent implements OnInit {
  userName: string;

  constructor(
    private authService: AuthService,
    private router: Router,
    iconRegistry: MatIconRegistry, sanitizer: DomSanitizer
  ) {
    iconRegistry.addSvgIconLiteral('logo_books', sanitizer.bypassSecurityTrustHtml(LOGO_BOOKS));
    iconRegistry.addSvgIconLiteral('user', sanitizer.bypassSecurityTrustHtml(USER_IMG));
  }

  ngOnInit(): void {
    this.userName = localStorage.getItem('userName');
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
