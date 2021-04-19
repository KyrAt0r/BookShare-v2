import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

export interface UserServerResponse {
  login: string;
  email: string;
}

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http: HttpClient) {
  }

  getUsers(): Observable<UserServerResponse[]> {
    return this.http.get<UserServerResponse[]>('./assets/data/users.json');
  }

   // getUsers(): Observable<UserServerResponse[]> {
   //   return this.http.get('./assets/data/users.json').pipe(map(data => {
   //     const usersList = data['userList'];
   //     return usersList.map(user => {
   //       return {
   //         login: user.login,
   //         email: user.email
   //       };
   //     });
   //   }));
   // }
}
