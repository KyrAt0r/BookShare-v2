import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {Observable} from 'rxjs';

interface User {
  email: string;
  password: string;
}

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  users: User[] = [];
  isAuth: boolean;

  constructor(private http: HttpClient) {
  }


  logIn(email: string, password: string): Observable<boolean> {
    return this.http.get<User[]>('./assets/data/users.json')
      .pipe(
        map(data => {
            this.isAuth = data.some(user => user.email === email && user.password === password);
            localStorage.setItem('authStatus', String(this.isAuth));
            return this.isAuth;
          }
        ));
  }


  getAuthStatus(): boolean {
    return this.isAuth;
  }

  logOut() {
    this.isAuth = false;

  }

}
