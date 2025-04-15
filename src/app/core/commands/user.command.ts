import { inject, Injectable } from '@angular/core';
import { UserAPI } from '@api';
import { TokenStorage, UserStorage } from '@storage';
import { LoginState, RegistrationState, User } from '@types';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserCommand {
  private userAPI: UserAPI = inject(UserAPI);
  private userStorage: UserStorage = inject(UserStorage);
  private tokenStorage: TokenStorage = inject(TokenStorage);

  public registerUser(params: {
    email: User['email'];
    password: User['password'];
    name: User['userInfo']['name'];
    profilePhoto?: User['userInfo']['profilePicture'];
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
          next: (response: { user: User; token: string }) => {
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
    email: User['email'];
    password: User['password'];
  }): Observable<LoginState> {
    return new Observable<LoginState>((observer) => {
      observer.next('loading');

      this.userAPI.logInUser(params.email, params.password!).subscribe({
        next: (response: { user: User; token: string }) => {
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
}
