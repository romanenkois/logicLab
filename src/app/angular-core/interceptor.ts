import {
  HttpClient,
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { $appConfig } from '@environments';
import { TokenStorage } from '@storage';
import { catchError, Observable, switchMap, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthorizationInterceptor implements HttpInterceptor {
  private router: Router = inject(Router);
  private readonly http: HttpClient = inject(HttpClient);

  private readonly tokenStorage: TokenStorage = inject(TokenStorage);

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler,
  ): Observable<HttpEvent<any>> {
    const accessToken = this.tokenStorage.getAccessToken();

    let authReq = req;
    if (accessToken) {
      authReq = req.clone({
        setHeaders: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
    }

    return next.handle(authReq).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
          return this.handle401Error(authReq, next);
        } else if (error.status === 403) {
          this.tokenStorage.setAccessToken(null);
          this.tokenStorage.setRefreshToken(null);
        }
        return throwError(() => error);
      }),
    );
  }

  private handle401Error(
    req: HttpRequest<any>,
    next: HttpHandler,
  ): Observable<HttpEvent<any>> {
    const refreshToken = this.tokenStorage.getRefreshToken();

    if (!refreshToken) {
      this.router.navigate(['/login']);
      return throwError(() => new Error('No refresh token'));
    }

    return this.http
      .post<any>(
        `${$appConfig.api.BASE_API_URL}/auth/refresh?token=${refreshToken}`,
        { refreshToken },
      )
      .pipe(
        switchMap((response: { accessToken: string; refreshToken: string }) => {
          this.tokenStorage.setAccessToken(response.accessToken);
          this.tokenStorage.setRefreshToken(response.refreshToken);

          const clonedReq = req.clone({
            setHeaders: {
              Authorization: `Bearer ${response.accessToken}`,
            },
          });

          return next.handle(clonedReq);
        }),
        catchError((err) => {
          localStorage.removeItem('access_token');
          localStorage.removeItem('refresh_token');
          this.router.navigate(['/login']);
          return throwError(() => err);
        }),
      );
  }
}
