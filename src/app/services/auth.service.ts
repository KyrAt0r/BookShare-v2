import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http'
import {delay} from "rxjs/operators";


interface user {
  login: string;
  password: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  users: user[]=[];

  constructor(private http: HttpClient) {
  }


  logIn(login: string, password: string) {
    if (login == "admin" && password == "admin"){
      return true;
    }else {
      this.http.get<user>('./assets/data/users.json').subscribe(data => this.users=data["userList"]);
      console.log(this.users)
      return this.users.some(x => x.login == login && x.password == password);
    }

  }

}
