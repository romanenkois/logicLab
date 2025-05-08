import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { UserAPI } from '@api';
import { SocialStorage, TokenStorage, UserStorage } from '@storage';
import {
  LoadingState,
  LoginState,
  RegistrationState,
  UserPrivate,
  UserPublic,
} from '@types';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserCommand {
  private router: Router = inject(Router);

  private userAPI: UserAPI = inject(UserAPI);
  private userStorage: UserStorage = inject(UserStorage);
  private socialStorage: SocialStorage = inject(SocialStorage);
  private tokenStorage: TokenStorage = inject(TokenStorage);

  public registerUser(params: {
    email: UserPrivate['email'];
    password: UserPrivate['password'];
    name: UserPrivate['userInfo']['name'];
    profilePhoto?: UserPrivate['userInfo']['profilePicture'];
  }): Observable<RegistrationState> {
    return new Observable<RegistrationState>((observer) => {
      observer.next('loading');

      this.userAPI
        .registerUser(
          params.email,
          params.password,
          params.name,
          params.profilePhoto,
        )
        .subscribe({
          next: (response: { user: UserPrivate; token: string }) => {
            if (!response.user && !response.token) {
              observer.next('error');
              observer.complete();
              return;
            }
            this.userStorage.setUser(response.user);
            this.tokenStorage.setToken(response.token);
            observer.next('resolved');
            observer.complete();
          },
          error: (error) => {
            console.error(error);
            observer.next('error');
            observer.complete();
          },
        });
    });
  }

  public loginUser(params: {
    email: UserPrivate['email'];
    password: UserPrivate['password'];
  }): Observable<LoginState> {
    return new Observable<LoginState>((observer) => {
      observer.next('loading');

      this.userAPI.logInUser(params.email, params.password!).subscribe({
        next: (response: { user: UserPrivate; token: string }) => {
          this.userStorage.setUser(response.user);
          this.tokenStorage.setToken(response.token);
          observer.next('resolved');
        },
        error: (error) => {
          console.error(error);
          observer.next('error');
          observer.complete();
        },
      });
    });
  }

  public logoutUser() {
    this.userStorage.setUser(null);
    this.tokenStorage.setToken(null);

    this.router.navigate(['/login']);
  }

  public verifyToken(token: string): Observable<LoadingState> {
    return new Observable<LoadingState>((observer) => {
      observer.next('loading');
      this.userAPI.verifyToken(token).subscribe({
        next: (response: any) => {
          if (response.message === 'Token is valid') {
            observer.next('resolved');
            observer.complete();
          } else {
            // is 401 if not valid, but we would handle anything else as error of authorization
            observer.next('error');
            observer.complete();
          }
        },
        error: (error: any) => {
          console.error(error);
          observer.next('error');
          observer.complete();
        },
      });
    });
  }

  public getUserPrivateInfo(): Observable<LoadingState> {
    return new Observable<LoadingState>((observer) => {
      observer.next('loading');

      const user = this.userStorage.getUser();
      if (user) {
        observer.next('resolved');
        observer.complete();
        return;
      }
      const token = this.tokenStorage.getToken();
      if (!token) {
        observer.next('error');
        observer.complete();
        return;
      }

      this.userAPI.getUserPersonalInfo(token).subscribe({
        next: (response: { user: UserPrivate }) => {
          this.userStorage.setUser(response.user);
          observer.next('resolved');
          observer.complete();
        },
        error: (error) => {
          console.error(error);
          observer.next('error');
          observer.complete();
        },
      });
    });
  }

  public loadPublicUser(userId: UserPublic['id']): Observable<LoadingState> {
    return new Observable<LoadingState>((observer) => {
      observer.next('loading');

      const user = this.socialStorage.getUser(userId);
      if (user) {
        observer.next('resolved');
        observer.complete();
        return;
      }

      this.userAPI.getUserInfo(userId).subscribe({
        next: (response: { user: UserPublic }) => {
          this.socialStorage.addUsers([response.user]);
          observer.next('resolved');
          observer.complete();
        },
        error: (error) => {
          console.error(error);
          observer.next('error');
          observer.complete();
        },
      });
    });
  }
}
