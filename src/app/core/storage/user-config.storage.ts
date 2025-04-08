import { Injectable, signal, WritableSignal } from '@angular/core';
import { UserConfig } from '@types';

@Injectable({
  providedIn: 'root',
})
export class UserConfigStorage {
  private readonly userConfig: WritableSignal<UserConfig> = signal({
    saveLogin: false,
  });

  public getUserConfig(): UserConfig {
    return this.userConfig();
  }
  public setUserConfig(userConfig: UserConfig): void {
    this.userConfig.set(userConfig);
  }
}
