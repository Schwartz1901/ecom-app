import { Injectable, inject, signal, computed } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, Observable, throwError, tap } from 'rxjs';

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
  private baseUrl = 'https://localhost:7040/api/Auth';

  private tokenSignal = signal<string | null>(localStorage.getItem('token'));
  readonly isAuthenticated = computed(() => !!this.tokenSignal());

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
        this.logout();
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
  this.http.post(`${this.baseUrl}/logout`, {}).subscribe({
    next: () => {
      this.tokenSignal.set(null);
      localStorage.removeItem('token');
      localStorage.removeItem('refreshToken');
    },
    error: () => {
      // Still clean up even if logout request fails
      this.tokenSignal.set(null);
      localStorage.removeItem('token');
      localStorage.removeItem('refreshToken');
    }
  });
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
