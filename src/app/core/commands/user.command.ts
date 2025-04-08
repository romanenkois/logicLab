import { inject, Injectable } from '@angular/core';
import { UserAPI } from '@api';
import { UserStorage } from '@storage';
import { User } from '@types';
import { Observable, tap } from 'rxjs';

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
  }): Observable<any> {
    return this.userAPI.registerUser(email, password, name, profilePhoto).pipe(
      tap((response: any) => {
        this.userStorage.setUser(response.user);
      })
    );
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
