import { inject, Injectable } from '@angular/core';
import { $appConfig } from '@environments';
import { UserConfigStorage } from '@storage';

@Injectable({
  providedIn: 'root'
})
export class PreloadService {
  private readonly userConfigStorage: UserConfigStorage = inject(UserConfigStorage);

  constructor() {
    console.log('PreloadService initialized');
    this.loadUserConfig();
    if (this.userConfigStorage.getUserConfig().saveLogin) {
      this.logInUser();
    }
  }

  loadUserConfig() {
    const userConfig = localStorage.getItem('userConfig');
    if (userConfig) {
      this.userConfigStorage.setUserConfig(JSON.parse(userConfig));
    } else {
      this.userConfigStorage.setUserConfig($appConfig.defaultUserConfig);
    }
  }

  logInUser() {
    let user = localStorage.getItem('user');
    if (user) {
      user = JSON.parse(user);

      // TODO: rewrite, couse its just stupid
      if (user) {
        this.userConfigStorage.setUserConfig(user);
      }
    }
  }
}
