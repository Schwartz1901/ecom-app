import { Injectable } from '@angular/core';
import { Observable, of, throwError, delay } from 'rxjs';

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  username: string;
  email: string;
  password: string;
}

export interface AuthResponse {
  token: string;
  userId: string;
  username: string;
  email: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private mockUsers: RegisterRequest[] = [];

  login(email: string, password: string): Observable<AuthResponse> {
    const user = this.mockUsers.find(u => u.email === email && u.password === password);

    if (user) {
      const response: AuthResponse = {
        token: 'mock-token-' + Date.now(),
        userId: 'user-' + Math.floor(Math.random() * 1000),
        username: user.username,
        email: user.email,
      };

      localStorage.setItem('token', response.token);
      return of(response).pipe(delay(500));
    } else {
      return throwError(() => new Error('Invalid email or password')).pipe(delay(500));
    }
  }

  register(username: string, email: string, password: string): Observable<AuthResponse> {
    const exists = this.mockUsers.some(u => u.email === email);

    if (exists) {
      return throwError(() => new Error('Email already registered')).pipe(delay(500));
    }

    const newUser: RegisterRequest = { username, email, password };
    this.mockUsers.push(newUser);

    const response: AuthResponse = {
      token: 'mock-token-' + Date.now(),
      userId: 'user-' + Math.floor(Math.random() * 1000),
      username,
      email,
    };

    localStorage.setItem('token', response.token);
    return of(response).pipe(delay(500));
  }

  logout(): void {
    localStorage.removeItem('token');
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('token');
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }
}
