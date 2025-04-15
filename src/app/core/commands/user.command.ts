import { inject, Injectable } from '@angular/core';
import { UserAPI } from '@api';
import { TokenStorage, UserStorage } from '@storage';
import { User } from '@types';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserCommand {
  private userAPI: UserAPI = inject(UserAPI);
  private userStorage: UserStorage = inject(UserStorage);
  private tokenStorage: TokenStorage = inject(TokenStorage);

  public registerUser({
    email,
    password,
    name,
    profilePhoto,
  }: {
    email: User['email'];
    password: User['password'];
    name: User['userInfo']['name'];
    profilePhoto?: User['userInfo']['profilePicture'];
  }) {
    return this.userAPI.registerUser(email, password, name, profilePhoto).pipe(
      tap((response: any) => {
        this.userStorage.setUser(response.user);
      }),
    );
  }

  public loginUser({
    email,
    password,
  }: {
    email: User['email'];
    password: User['password'];
  }) {
    return this.userAPI.logInUser(email, password!).pipe(
      tap((response: {user: User, token: string}) => {
        this.userStorage.setUser(response.user);
        this.tokenStorage.setToken(response.token);
      }),
    );
  }
}
