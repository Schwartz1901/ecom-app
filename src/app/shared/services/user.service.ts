import { Injectable, WritableSignal, inject } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export interface User{
  userId: string;
  email: string;
  password: string;
  username: string;
  isLoggedIn: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  

}
