import {
  Component,
  computed,
  inject,
  input,
  InputSignal,
  OnInit,
} from '@angular/core';
import { UserCommand } from '@commands';
import { SocialStorage } from '@storage';
import { LoadingState, UserPublic } from '@types';

@Component({
  selector: 'app-user-badge',
  imports: [],
  templateUrl: './user-badge.component.html',
  styleUrl: './user-badge.component.scss',
})
export class UserBadgeComponent implements OnInit {
  private userCommand: UserCommand = inject(UserCommand);
  private socialStorage: SocialStorage = inject(SocialStorage);

  status: LoadingState = 'idle';

  userId: InputSignal<UserPublic['id']> = input.required();
  user = computed(() => this.socialStorage.getUser(this.userId()));

  ngOnInit() {
    this.userCommand
      .loadPublicUser(this.userId())
      .subscribe((state: LoadingState) => {
        this.status = state;
      });
  }
}
