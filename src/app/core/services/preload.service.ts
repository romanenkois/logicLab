import { inject, Injectable } from '@angular/core';
import { AuthorizationCommand } from '@commands';
import { TokenStorage, UserSettingsStorage } from '@storage';
import { LoadingState } from '@types';

@Injectable({
  providedIn: 'root',
})
export class PreloadService {
  private userSettings: UserSettingsStorage = inject(UserSettingsStorage);
  private authorizationCommand: AuthorizationCommand =
    inject(AuthorizationCommand);
  private tokenStorage: TokenStorage = inject(TokenStorage);

  // this service always triggers on app load, so we send request to api to check if token is still valid
  constructor() {
    let accessToken = null;
    let refreshToken = null;

    try {
      // we try to get token, at first from apprun time memory, then from local storage
      const _accessToken = this.userSettings.getUserSettings().keepToken
        ? JSON.parse(localStorage.getItem('userAccessToken') || 'null')
        : null;
      const _refreshToken = this.userSettings.getUserSettings().keepToken
        ? JSON.parse(localStorage.getItem('userRefreshToken') || 'null')
        : null;

      if (_accessToken && _refreshToken) {
        accessToken = _accessToken;
        refreshToken = _refreshToken;
      }
    } catch (error) {
      console.error('Error parsing token from localStorage:', error);
    }

    this.tokenStorage.setAccessToken(accessToken);
    this.tokenStorage.setRefreshToken(refreshToken);

    if (accessToken) {
      this.authorizationCommand
        .verifyToken(accessToken)
        .subscribe((status: LoadingState) => {
          if (status === 'resolved') {
            // nothing is happening if everything is ok
            // token is loaded, guard wouldnt retrigger
          }
          if (status === 'error') {
            // if token is not valid, we set it to null
            // this would trigger the guard to redirect to login page
          }
        });
    }
  }
}
