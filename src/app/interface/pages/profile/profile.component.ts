import { Component, computed, inject, OnInit } from '@angular/core';
import { AuthorizationCommand, UserCommand } from '@commands';
import { UserStorage } from '@storage';
import { LoadingState } from '@types';

@Component({
  selector: 'app-profile',
  imports: [],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss',
})
export default class ProfileComponent implements OnInit {
  private userCommand: UserCommand = inject(UserCommand);
  private authorizationCommand: AuthorizationCommand =
    inject(AuthorizationCommand);
  private userStorage: UserStorage = inject(UserStorage);

  status: LoadingState = 'idle';

  user = computed(() => {
    return this.userStorage.getUser();
  });

  logout() {
    this.authorizationCommand.logoutUser();
  }

  ngOnInit() {
    this.userCommand.getUserPrivateInfo().subscribe((status: LoadingState) => {
      this.status = status;
    });
  }
}
