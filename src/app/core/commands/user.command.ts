import { inject, Injectable } from '@angular/core';
import { UserAPI } from '@api';
import { SocialStorage, TokenStorage, UserStorage } from '@storage';
import { LoadingState, UserPrivate, UserPublic } from '@types';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserCommand {
  private userAPI: UserAPI = inject(UserAPI);
  private userStorage: UserStorage = inject(UserStorage);
  private socialStorage: SocialStorage = inject(SocialStorage);
  private tokenStorage: TokenStorage = inject(TokenStorage);

  public getUserPrivateInfo(): Observable<LoadingState> {
    return new Observable<LoadingState>((observer) => {
      observer.next('loading');

      const user = this.userStorage.getUser();
      if (user) {
        observer.next('resolved');
        observer.complete();
        return;
      }
      const token = this.tokenStorage.getAccessToken();
      if (!token) {
        observer.next('unauthorized');
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

  public loadPublicUsers(userIds: UserPublic['id'][]): Observable<LoadingState> {
    return new Observable<LoadingState>((observer) => {
      observer.next('loading');

      this.userAPI.getUsersInfo(userIds).subscribe({
        next: (response: { users: UserPublic[] }) => {
          this.socialStorage.addUsers(response.users);
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
