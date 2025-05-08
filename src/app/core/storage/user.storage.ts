import { Injectable, signal, WritableSignal } from '@angular/core';
import { UserPrivate } from '@types';

@Injectable({
  providedIn: 'root',
})
export class UserStorage {
  private readonly user: WritableSignal<UserPrivate | null> = signal(null);

  public getUser(): UserPrivate | null {
    return this.user();
  }
  public setUser(user: UserPrivate | null) {
    this.user.set(user);
  }
}
