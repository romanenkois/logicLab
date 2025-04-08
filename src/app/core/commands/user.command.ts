import { inject, Injectable } from '@angular/core';
import { UserAPI } from '@api';
import { UserStorage } from '@storage';
import { User, UserToken } from '@types';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserCommand {
  private userAPI: UserAPI = inject(UserAPI);
  private userStorage: UserStorage = inject(UserStorage);

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
      tap((response: {user: User, token: UserToken}) => {
        // user data and token are taken sepparately from api
        response.user.token = response.token;
        this.userStorage.setUser(response.user);
      }),
    );
  }
}
