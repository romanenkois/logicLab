import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavBarComponent, ScreenNotificationComponent } from '@widgets';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavBarComponent, ScreenNotificationComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {}
