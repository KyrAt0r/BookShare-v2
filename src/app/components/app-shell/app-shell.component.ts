import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit
} from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import {
  LOGO_BOOKS,
  USER_IMG,
} from 'src/app/core/const/icons';
import { UsersService } from '../../core/services/users.service';
import { SubscriptionLike} from 'rxjs';
import { getUser } from '../../core/models/get-user.model';

@Component({
  selector: 'app-app-shell',
  templateUrl: './app-shell.component.html',
  styleUrls: ['./app-shell.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppShellComponent implements OnInit, OnDestroy {
  userName: string;
  userRole: string;
  booksInUse: number;
  subscriptions: SubscriptionLike[] = [];

  private id: string = localStorage.getItem('id');

  constructor(
    private authService: AuthService,
    private router: Router,
    private usersInfo: UsersService,
    private cdRef: ChangeDetectorRef,
    iconRegistry: MatIconRegistry, sanitizer: DomSanitizer
  ) {
    iconRegistry.addSvgIconLiteral('logo_books', sanitizer.bypassSecurityTrustHtml(LOGO_BOOKS));
    iconRegistry.addSvgIconLiteral('user', sanitizer.bypassSecurityTrustHtml(USER_IMG));
  }

  ngOnInit(): void {
    this.subscriptions.push(this.usersInfo.getUsers().subscribe(data => {
      this.userName = getUser(data, this.id).userName;
      this.userRole = getUser(data, this.id).role;
      this.booksInUse = getUser(data, this.id).bookInUse.length;
      this.cdRef.detectChanges();
    }));

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

  ngOnDestroy(): void {
    this.subscriptions.forEach(
      (subscription) => subscription.unsubscribe());
    this.subscriptions = [];
  }
}
