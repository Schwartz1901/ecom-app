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
  private baseUrl = 'https://localhost:7040/api/Auth';

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
    const refreshToken = localStorage.getItem('refreshToken');
    return this.http.post<AuthResponse>(`${this.baseUrl}/refresh`, { refreshToken }).pipe(
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
    const refreshToken = localStorage.getItem('refreshToken');
    this.http.post(`${this.baseUrl}/logout`, { refreshToken }).subscribe({
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
    let msg: string = '';
    if (error.status === 0) {
      // Network or CORS error
      msg = 'Unable to connect to the server';
    }
    else if (error.status === 400) {
      // BadRequest
      msg = 'Bad Reqeust! Please check the input';
    }
    else if (error.status === 404) {
      // NotFound
      msg = 'Not Found!';
    }
    else if (error.status === 500) {
      // Internal server error
      msg = 'Something wrong with the server!';
    }
    else {
      // Customized error or some other errors
      msg = error.error?.message || 'Unexpected error';
    }

    return throwError(() => new Error(msg));
  }
}
