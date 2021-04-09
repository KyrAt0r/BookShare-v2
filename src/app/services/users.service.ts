import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {map} from "rxjs/operators";

export interface User {
  login: string;
}

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http: HttpClient) {
  }

  getUsers() : Observable<User[]> {
    return this.http.get('./assets/data/users.json').pipe(map(data=>{
      let usersList = data["userList"];
      return usersList.map(function(user:any) {
        return {login: user.login};
      });
    }));
  }
}
