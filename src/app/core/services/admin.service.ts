import {Injectable} from '@angular/core';
import {AuthService} from './auth.service';
import {UsersService} from './users.service';
import {map} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {RoleEnum} from "../models/role.models";

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private authService: AuthService,
              private usersList: UsersService) {
  }

  adminStatus(): Observable<boolean> {
      return this.usersList.getUsers().pipe(map(data => {
          return data.some(user => user.id === localStorage.getItem('id') && user.role === RoleEnum.admin);
        }
      ));
  }
}
