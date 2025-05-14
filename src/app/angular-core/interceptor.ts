import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { TokenStorage } from '@storage';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthorizationInterceptor implements HttpInterceptor {
  private readonly tokenStorage: TokenStorage = inject(TokenStorage);

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler,
  ): Observable<HttpEvent<any>> {
    const accessToken = this.tokenStorage.getAccessToken();
    console.log('Access token:', accessToken);

    const authorizedRequest = req;
    if (accessToken) {
      authorizedRequest.headers.set('Authorization', `Bearer ${accessToken}`);
    }

    console.log('Request:', authorizedRequest);

    return next.handle(authorizedRequest).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
          console.error('Unauthorized request:', error);
        }
        return throwError(() => error);
      }),
    );
  }
}
