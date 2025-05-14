import { inject, Injectable, signal, WritableSignal } from '@angular/core';
import { UserSettingsStorage } from './user-settings.storage';

@Injectable({
  providedIn: 'root',
})
export class TokenStorage {
  private userSettings: UserSettingsStorage = inject(UserSettingsStorage);

  private readonly userRefreshToken: WritableSignal<string | null> =
    signal(null);
  private readonly userAccessToken: WritableSignal<string | null> =
    signal(null);

  // SHOULD BE REMOVED
  public getToken(): string | null {
    return this.userAccessToken();
  }
  public setToken(token: string | null): void {
    this.userAccessToken.set(token);
    if (this.userSettings.getUserSettings().keepToken) {
      if (token === null) {
        localStorage.removeItem('userAccessToken');
      } else {
        localStorage.setItem('userAccessToken', JSON.stringify(token));
      }
    }
  }
  // SHOULD BE REMOVED

  public setRefreshToken(token: string | null): void {
    this.userRefreshToken.set(token);
    if (this.userSettings.getUserSettings().keepToken) {
      if (token === null) {
        localStorage.removeItem('userRefreshToken');
      } else {
        localStorage.setItem('userRefreshToken', JSON.stringify(token));
      }
    }
  }
  public getRefreshToken(): string | null {
    return this.userRefreshToken();
  }

  public setAccessToken(token: string | null): void {
    this.userAccessToken.set(token);
    // TODO: dangerously unsafe
    if (this.userSettings.getUserSettings().keepToken) {
      if (token === null) {
        localStorage.removeItem('userAccessToken');
      } else {
        localStorage.setItem('userAccessToken', JSON.stringify(token));
      }
    }
  }
  public getAccessToken(): string | null {
    return this.userAccessToken();
  }
}
