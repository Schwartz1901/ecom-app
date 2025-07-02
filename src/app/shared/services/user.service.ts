import { Injectable, WritableSignal } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { signal } from '@angular/core';

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
  
  private currentUser = signal<User | null>(null);

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
      this.currentUser.set(user);
      return of("Login Successful");
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

  // getUser(username: string | null): WritableSignal<User | null> {
  //   const user = this.mockUsers.find(u => u.username === username);
  //   if (user) {
  //     this.currentUser.set(user);
  //   }
  //   return this.currentUser;
  // }

  getCurrentUser() {
    return this.currentUser;
    
  }

  logout() {
    this.currentUser.set(null);
    return of("Logout!");
  }
  

}
