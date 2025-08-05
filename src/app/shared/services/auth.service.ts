import { Injectable, inject, signal, computed } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, Observable, throwError, tap } from 'rxjs';
import { Router } from '@angular/router';

export interface AuthResponse {
  token: string;
  refreshToken: string;
  userId: string;
  username: string;
  email: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private http = inject(HttpClient);
  private router = inject(Router);
  private baseUrl = 'https://localhost:7123/auth';

  private tokenSignal = signal<string | null>(localStorage.getItem('token'));
  readonly isAuthenticated = computed(() => {
    const token = this.tokenSignal();
    return token != null && !this.isTokenExpired(token);
  });

  login(email: string, password: string): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.baseUrl}/login`, { email, password }).pipe(
      tap(response => this.storeTokens(response)),
      catchError(this.handleError)
    );
  }

  register(username: string, email: string, password: string): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.baseUrl}/register`, { username, email, password }).pipe(
      tap(response => this.storeTokens(response)),
      catchError(this.handleError)
    );
  }

  refreshToken(): Observable<AuthResponse> {
  
    return this.http.post<AuthResponse>(`${this.baseUrl}/refresh`, {  }).pipe(
      tap(response => this.storeTokens(response)),
      catchError(err => {
        return throwError(() => new Error('Session expired. Please login again.'));
      })
    );
  }

  getToken(): string | null {
    return this.tokenSignal();
  }

  setToken(token: string) {
    this.tokenSignal.set(token);
    localStorage.setItem('token', token);
  }

  logout() {
    const refreshToken = localStorage.getItem("refreshToken");
    this.http.post(`${this.baseUrl}/logout`, {}).subscribe({
    next: () => {
      this.tokenSignal.set(null);
      localStorage.removeItem('token');
      localStorage.removeItem('refreshToken');
      this.router.navigate(['/login']);
    },
    error: () => {
      this.tokenSignal.set(null);
      localStorage.removeItem('token');
      localStorage.removeItem('refreshToken');
      this.router.navigate(['/login']);
    }
  });
}
  isTokenExpired(token: string): boolean {
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      const now = Math.floor(Date.now() / 1000);
      return payload.exp < now;
    } catch {
      return true;
    }
  }

  private storeTokens(response: AuthResponse) {
    this.setToken(response.token);
    localStorage.setItem('refreshToken', response.refreshToken);
  }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 401) {
      return throwError(() => new Error('Invalid credentials'));
    }
    return throwError(() => new Error('Something went wrong. Try again.'));
  }
}
