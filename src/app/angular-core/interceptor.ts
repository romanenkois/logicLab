import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { AuthorizationCommand } from '@commands';
import { TokenStorage } from '@storage';
import { LoadingState } from '@types';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthorizationInterceptor implements HttpInterceptor {
  private authorizationCommand: AuthorizationCommand =
    inject(AuthorizationCommand);
  private readonly tokenStorage: TokenStorage = inject(TokenStorage);

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler,
  ): Observable<HttpEvent<any>> {
    const accessToken = this.tokenStorage.getAccessToken();
    // console.log('Access token:', accessToken);

    const authorizedRequest = accessToken
      ? req.clone({
          headers: req.headers.set('Authorization', `Bearer ${accessToken}`),
        })
      : req;

    // console.log('Request:', authorizedRequest);

    return next.handle(authorizedRequest).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
          const refreshToken = this.tokenStorage.getRefreshToken();
          if (refreshToken) {
            this.authorizationCommand
              .refreshTokens()
              .subscribe((status: LoadingState) => {
                if (status === 'error') {
                  this.authorizationCommand.logoutUser();
                }
              });
          }
        }
        return throwError(() => error);
      }),
    );
  }
}
