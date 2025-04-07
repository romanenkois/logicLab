import { inject, Injectable } from '@angular/core';
import { UserAPI } from '@api';
import { UserStorage } from '@storage';
import { User } from '@types';

@Injectable({
  providedIn: 'root',
})
export class UserCommand {
  private userAPI: UserAPI = inject(UserAPI);
  private userStorage: UserStorage = inject(UserStorage);

  public registerUser(
    email: User['email'],
    password: User['password'], // should be changed probably ???
    name: User['userInfo']['name'],
    profilePhoto?: User['userInfo']['profilePicture'],
  ) {
    this.userAPI.registerUser(email, password, name, profilePhoto).subscribe({
      next: (response: any) => {
        this.userStorage.setUser(response.user);
      },
      error: (error) => {
        console.error(error);
      },
    });
  }

  public async loadUserData(email: User['email'], password: User['password']) {
    this.userAPI.logInUser(email, password!).subscribe({
      next: (response: any) => {
        this.userStorage.setUser(response.user);
      },
      error: (error) => {
        console.error(error);
      },
    });
  }
}
