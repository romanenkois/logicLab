import { Injectable, signal, WritableSignal } from '@angular/core';
import { UserPublic } from '@types';

@Injectable({
  providedIn: 'root',
})
export class SocialStorage {
  private readonly users: WritableSignal<UserPublic[]> = signal([]);

  getUser(id: UserPublic['id']): UserPublic | null {
    return this.users().find((user) => user.id === id) || null;
  }

  addUsers(users: UserPublic[]): void {
    const currentUsers = this.users();
    const newUsers = users.filter((user) => !currentUsers.some((u) => u.id === user.id));
    this.users.update((prev) => [...prev, ...newUsers]);
  }

}
