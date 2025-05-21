import { Component, computed, inject, input, InputSignal } from '@angular/core';
import { SocialStorage } from '@storage';
import { UserPublic } from '@types';

@Component({
  selector: 'app-user-card',
  imports: [],
  templateUrl: './user-card.component.html',
  styleUrl: './user-card.component.scss',
})
export class UserCardComponent {
  // private userCommand: UserCommand = inject(UserCommand);
  private socialStorage: SocialStorage = inject(SocialStorage);

  // status: LoadingState = 'idle';
  // user: InputSignal<UserPublic> = input.required();

  userId: InputSignal<UserPublic['id']> = input.required();
  user = computed(() => this.socialStorage.getUser(this.userId()));

  // user

  // ngOnInit() {
    // this.userCommand
    //   .loadPublicUser(this.userId())
    //   .subscribe((state: LoadingState) => {
    //     this.status = state;
    //   });
  // }
}
