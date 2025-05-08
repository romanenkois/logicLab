import { Injectable, signal, WritableSignal } from '@angular/core';
import { Message } from '@types';

@Injectable({
  providedIn: 'root',
})
export class ScreenNotificationService {
  private messages: WritableSignal<Message[]> = signal([]);

  public sendMessage(message: Message) {
    this.messages.set([...this.messages(), message]);
  }
  public getMessage(): Message | null {
    return this.messages()[0] || null;
  }

  public removeMessage() {
    this.messages.set(this.messages().slice(1));
  }
}
