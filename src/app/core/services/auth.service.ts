import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {delay, map} from 'rxjs/operators';
import {Observable} from 'rxjs';

interface User {
  email: string;
  password: string;
}

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  isAuth: boolean;

  constructor(private http: HttpClient) {
  }


  logIn(email: string, password: string): Observable<boolean> {
    return this.http.get<User[]>('./assets/data/users.json')
      .pipe(
        delay(1000),
        map(data => {
            this.isAuth = data.some(user => user.email === email && user.password === password);
            localStorage.setItem('authStatus', String(true));
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
    return true;
  }

}
