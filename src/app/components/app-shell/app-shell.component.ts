import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../services/auth.service';

@Component({
  selector: 'app-app-shell',
  templateUrl: './app-shell.component.html',
  styleUrls: ['./app-shell.component.scss']
})
export class AppShellComponent implements OnInit {
  loginStatus: boolean;

  constructor(
    private authService: AuthService,
  ) {

  }

  ngOnInit(): void {
    this.loginStatus = this.authService.getAuthStatus();
    console.log(this.loginStatus);
  }
}
