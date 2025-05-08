import { Component, inject } from '@angular/core';
import { UserCommand } from '@commands';

@Component({
  selector: 'app-profile',
  imports: [],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss',
})
export default class ProfileComponent {
  private userCommand: UserCommand = inject(UserCommand);

  logout() {
    this.userCommand.logoutUser();
  }
}
