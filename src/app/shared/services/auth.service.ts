import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

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
  providedIn: 'root',
})
export class AuthService {
  private http = inject(HttpClient);
  private baseUrl = 'https://localhost:7040/api/Auth'; // change port if needed

  login(email: string, password: string): Observable<AuthResponse> {
    const payload: LoginRequest = { email, password };
    return this.http.post<AuthResponse>(`${this.baseUrl}/login`, payload).pipe(
      tap(response => localStorage.setItem('token', response.token))
    );
  }

  register(username: string, email: string, password: string): Observable<AuthResponse> {
    const payload: RegisterRequest = { username, email, password };
    return this.http.post<AuthResponse>(`${this.baseUrl}/register`, payload).pipe(
      tap(response => localStorage.setItem('token', response.token))
    );
  }

  logout(): void {
    localStorage.removeItem('token');
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }
}
