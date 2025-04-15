import { inject, Injectable } from '@angular/core';
import { $appConfig } from '@environments';
import { TokenStorage, UserSettingsStorage } from '@storage';

@Injectable({
  providedIn: 'root',
})
export class PreloadService {
  private readonly userSettingsStorage: UserSettingsStorage =
    inject(UserSettingsStorage);
  private readonly tokenStorage: TokenStorage = inject(TokenStorage);
  constructor() {
    console.log('PreloadService initialized');
    this.loadUserConfig();
    if (this.userSettingsStorage.getUserSettings().keepToken) {
      this.loadLogInInfo();
    }
  }

  loadUserConfig() {
    const userConfig = localStorage.getItem('userSettings');
    if (userConfig) {
      this.userSettingsStorage.setUserSettings(JSON.parse(userConfig));
    } else {
      this.userSettingsStorage.setUserSettings($appConfig.defaultUserSettings);
    }
  }

  loadLogInInfo() {
    let token = localStorage.getItem('userToken');
    if (token) {
      token = JSON.parse(token);
      // TODO: rewrite, couse its just stupid
      if (token) {
        this.tokenStorage.setToken(token);
        console.log('user loged in');
      }
    }
  }
}
