import { Injectable, inject, signal, computed } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable, tap, throwError } from 'rxjs';

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

@Injectable({ providedIn: 'root' })
export class AuthService {
  private http = inject(HttpClient);
  private baseUrl = 'https://localhost:7040/api/Auth';

  // Initialize signal from localStorage
  private tokenSignal = signal<string | null>(localStorage.getItem('token'));

  // Use computed so components like Navbar auto update
  readonly isAuthenticated = computed(() => !!this.tokenSignal());

  // Provide token for interceptors or local use
  getToken(): string | null {
    return this.tokenSignal();
  }

  // Use this setter for login/register instead of setToken manually
  private saveToken(token: string) {
    this.tokenSignal.set(token);
    localStorage.setItem('token', token);
  }

  login(email: string, password: string): Observable<AuthResponse> {
    const payload: LoginRequest = { email, password };
    return this.http.post<AuthResponse>(`${this.baseUrl}/login`, payload).pipe(
      tap(response => this.saveToken(response.token)),
      catchError(err => {
        if (err.status === 401) {
          return throwError(() => new Error('Invalid email or password'));
        }
        return throwError(() => new Error('Something went wrong, try again!'));
      })
    );
  }

  register(username: string, email: string, password: string): Observable<AuthResponse> {
    const payload: RegisterRequest = { username, email, password };
    return this.http.post<AuthResponse>(`${this.baseUrl}/register`, payload).pipe(
      tap(response => this.saveToken(response.token)),
      catchError(err => {
        if (err.status === 401) {
          return throwError(() => new Error('Invalid email or password'));
        }
        return throwError(() => new Error('Something went wrong, try again!'));
      })
    );
  }

  logout() {
    this.tokenSignal.set(null);
    localStorage.removeItem('token');
  }
}
