import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {delay, map} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {User} from '../models/user.models';


@Injectable({
  providedIn: 'root'
})

export class AuthService {
  isAuth: boolean;
  currentUserRole: string;

  constructor(private http: HttpClient) {
  }

  logIn(email: string, password: string): Observable<boolean> {
    return this.http.get<User[]>('./assets/data/users.json')
      .pipe(
        map(data => {
            this.isAuth = data.some(user => user.email === email && user.password === password);
            if (this.isAuth) {
              localStorage.setItem('authStatus', String(true));
              localStorage.setItem('userName', String(this.getUserInfo(data, email).userName));
              localStorage.setItem('id', String(this.getUserInfo(data, email).id));
            }
            return this.isAuth;
          }
        ));
  }

  getAuthStatus(): boolean {
    return Boolean(localStorage.getItem('authStatus'));
  }

  logOut(): boolean {
    this.isAuth = false;
    localStorage.removeItem('authStatus');
    localStorage.removeItem('userName');
    localStorage.removeItem('id');
    return true;
  }

  // tslint:disable-next-line:typedef
  getUserInfo(data: User[], email: string) {
    return data.find(user => user.email === email);
  }

  getUserRole(role: string): Promise<boolean> {
    return this.http.get<User[]>('./assets/data/users.json').pipe(
      map(
        data => {
          return data.some(user => user.role === role && user.id === localStorage.getItem('id'));
        }
      )
    ).toPromise().then(data => {
      return data;
    });
  }
}
