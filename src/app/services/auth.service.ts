import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

interface UserAuth {
  email: string;
  password: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  users: UserAuth[] = [];

  constructor(private http: HttpClient) {
  }


  logIn(email: string, password: string) {
    return this.http.get<UserAuth[]>('./assets/data/users.json')
      .subscribe(data => {
        return data.some(x => x.email === email && x.password === password);
      }
    );
  }
}
