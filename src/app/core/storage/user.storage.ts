import { Injectable, signal, WritableSignal } from '@angular/core';
import { User } from '@types';


@Injectable({
  providedIn: 'root',
})
export class UserStorage {
  private readonly user: WritableSignal<User | null> = signal(null);

  public getUser(): User | null {
    return this.user();
  }
  public setUser(user: User): void {
    this.user.set(user);
  }
}
