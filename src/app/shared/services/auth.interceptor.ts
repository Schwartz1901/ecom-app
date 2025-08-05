import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpErrorResponse
} from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, throwError, BehaviorSubject } from 'rxjs';
import { catchError, filter, take, switchMap } from 'rxjs/operators';
import { AuthService } from './auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  private authService = inject(AuthService);
  private isRefreshing = false;
  private refreshTokenSubject = new BehaviorSubject<string | null>(null);

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = this.authService.getToken();

    let authReq = req;
    if (token) {
      authReq = this.addTokenHeader(req, token);
    }
    const isAuthEndpoint = req.url.includes('/Auth/login') ||
                       req.url.includes('/Auth/register') ||
                       req.url.includes('/Auth/refresh');

    return next.handle(authReq).pipe(
      catchError(error => {
        if (
          error instanceof HttpErrorResponse &&
          error.status === 401 &&
          !isAuthEndpoint
        ) 
        {
          return this.handle401Error(req, next);
        }

        return throwError(() => error);
      })
    );
  }

  private addTokenHeader(request: HttpRequest<any>, token: string) {
    return request.clone({
      setHeaders: { Authorization: `Bearer ${token}` }
    });
  }

  private handle401Error(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (!this.isRefreshing) {
      this.isRefreshing = true;
      this.refreshTokenSubject.next(null);

      return this.authService.refreshToken().pipe(
        switchMap(response => {
          this.isRefreshing = false;
          this.refreshTokenSubject.next(response.token);
          return next.handle(this.addTokenHeader(request, response.token));
        }),
        catchError(err => {
          this.isRefreshing = false;
          this.authService.logout(localStorage.getItem("token")); // Clear tokens and redirect if needed
          return throwError(() => err);
        })
      );
    } else {
      // Wait for refresh to complete
      return this.refreshTokenSubject.pipe(
        filter(token => token !== null),
        take(1),
        switchMap(token => next.handle(this.addTokenHeader(request, token!)))
      );
    }
  }
}
