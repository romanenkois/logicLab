import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { UserCommand } from '@commands';
import { TokenStorage, UserSettingsStorage } from '@storage';
import { LoadingState } from '@types';

@Injectable({
  providedIn: 'root',
})
export class PreloadService {
  private router: Router = inject(Router);

  private userSettings: UserSettingsStorage = inject(UserSettingsStorage);
  private userCommand: UserCommand = inject(UserCommand);
  private tokenStorage: TokenStorage = inject(TokenStorage);

  // this service always triggers on app load, so we send request to api to check if token is still valid
  constructor() {
    let token = this.tokenStorage.getToken();

    try {
      // we try to get token, at first from apprun time memory, then from local storage
      const _token = this.userSettings.getUserSettings().keepToken
        ? JSON.parse(localStorage.getItem('userToken') || 'null')
        : null;
      if (_token) {
        token = _token;
      }
    } catch (error) {
      console.error('Error parsing token from localStorage:', error);
      token = null;
    }

    // we set the token in advance, so guard doesnt trigger redirecting to login
    this.tokenStorage.setToken(token);

    if (token) {
      this.userCommand.verifyToken(token).subscribe((status: LoadingState) => {
        if (status === 'resolved') {
          // nothing is happening if everything is ok
          // token is loaded, guard wouldnt retrigger
        }
        if (status === 'error') {
          // if token is not valid, we set it to null
          // this would trigger the guard to redirect to login page
          this.tokenStorage.setToken(null);
        }
      });
    }
  }
}
