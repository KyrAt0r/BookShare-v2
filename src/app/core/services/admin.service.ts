import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AuthService} from './auth.service';
import {UsersService} from './users.service';
import {map} from 'rxjs/operators';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http: HttpClient,
              private authService: AuthService,
              private usersList: UsersService) {
  }

  adminStatus(): Observable<boolean> {
    if (this.authService.getAuthStatus() && localStorage.getItem('id')) {
      return this.usersList.getUsers().pipe(map(data => {
        return data.some(user => user.id === Number(localStorage.getItem('id')) && user.role === 'admin');
        }
      ));
    }
  }

}
