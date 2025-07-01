import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';

export interface User{
  email: string;
  password: string;
  username: string;
  isLoggedIn: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private mockUsers: User[] = [
    {
      email: 'user1@mail.com',
      password: '123456',
      username: 'testuser1',
      isLoggedIn: false,
    }
  ];
  login(email: string, password: string) {
    const user = this.mockUsers.find(u => u.email === email && u.password === password);
    if (user) {
      user.isLoggedIn = true;
      return of('Login Successful');
    } else {
      return throwError(() => new Error('Invalid Email or Password!'));
    }
  }

  register(email: string, password: string) {
    const exist = this.mockUsers.find(u => u.email === email && u.password === password);
    if (exist) {
      return throwError(()=> new Error('User is already existed!'));
    } else {
      this.mockUsers.push({
        email: email,
        password: password,
        username: email,
        isLoggedIn: true});

      return of('Register successful');
    }
  }
}
