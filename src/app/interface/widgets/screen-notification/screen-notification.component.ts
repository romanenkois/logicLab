import { Component, computed, inject, Signal } from '@angular/core';
import { ScreenNotificationService } from '@services';
import { Message } from '@types';

@Component({
  selector: 'app-screen-notification',
  imports: [],
  templateUrl: './screen-notification.component.html',
  styleUrl: './screen-notification.component.scss',
})
export class ScreenNotificationComponent {
  screenNotifucationService: ScreenNotificationService = inject(
    ScreenNotificationService,
  );

  message: Signal<Message | null> = computed(() => {
    return this.screenNotifucationService.getMessage();
  });

  close() {
    this.screenNotifucationService.removeMessage();
  }
}
