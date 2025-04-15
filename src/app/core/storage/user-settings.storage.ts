import { Injectable, signal, WritableSignal } from '@angular/core';
import { $appConfig } from '@environments';
import { UserSettings } from '@types';

@Injectable({
  providedIn: 'root'
})
export class UserSettingsStorage {
  private readonly userSettings: WritableSignal<UserSettings> = signal($appConfig.defaultUserSettings);

  public setUserSettings(userSettings: UserSettings): void {
    this.userSettings.set(userSettings);
    localStorage.setItem('userSettings', JSON.stringify(userSettings));
  }
  public getUserSettings(): UserSettings {
    return this.userSettings();
  }
}
