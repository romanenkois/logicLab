import { inject, Injectable, signal, WritableSignal } from '@angular/core';
import { UserSettingsStorage } from './user-settings.storage';

@Injectable({
  providedIn: 'root',
})
export class TokenStorage {
  private userSettings: UserSettingsStorage = inject(UserSettingsStorage);

  private readonly userToken: WritableSignal<string | null> = signal(null);

  public setToken(token: string | null): void {
    this.userToken.set(token);
    // TODO: dangerously unsafe
    if (this.userSettings.getUserSettings().keepToken && token) {
      localStorage.setItem('userToken', JSON.stringify(token));
    }
  }
  public getToken(): string | null {
    return this.userToken();
  }
}
