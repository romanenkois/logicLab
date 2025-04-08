import { inject, Injectable } from '@angular/core';
import { UserAPI } from '@api';
import { UserStorage } from '@storage';
import { User } from '@types';
import { Observable } from 'rxjs';

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
    password: User['password']; // should be changed probably ???
    name: User['userInfo']['name'];
    profilePhoto?: User['userInfo']['profilePicture'];
  }) : any | void | Observable<any> {
    this.userAPI.registerUser(email, password, name, profilePhoto).subscribe({
      next: (response: any) => {
        this.userStorage.setUser(response.user);
        return response.user;
      },
      error: (error) => {
        console.error(error);
        return 'Error';
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
