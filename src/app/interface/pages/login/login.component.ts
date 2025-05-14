import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthorizationCommand } from '@commands';
import { ScreenNotificationService } from '@services';
import { LoginState } from '@types';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export default class LoginComponent {
  private authorizationCommand: AuthorizationCommand =
    inject(AuthorizationCommand);
  private screenNotification: ScreenNotificationService = inject(
    ScreenNotificationService,
  );

  private formBuilder: FormBuilder = inject(FormBuilder);
  private router: Router = inject(Router);

  loginForm: FormGroup = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(8)]],
  });

  logInUser() {
    if (this.loginForm.valid) {
      const formValue = this.loginForm.value;
      this.authorizationCommand
        .loginUser({
          email: formValue.email,
          password: formValue.password,
        })
        .subscribe((status: LoginState) => {
          switch (status) {
            case 'resolved':
              this.router.navigate(['/profile']);
              break;
            case 'invalidData':
              this.screenNotification.sendMessage({
                title: 'Помилка входу',
                text: 'Невірні дані для входу',
                buttonText: 'Закрити',
              });
              this.loginForm.get('password')?.reset();
              break;
            case 'error':
              this.screenNotification.sendMessage({
                title: 'Помилка входу',
                text: 'Помилка під час входу, перевірте введені дані',
                buttonText: 'Закрити',
              });
              this.loginForm.get('password')?.reset();
              break;

            default:
              console.error('Unknown status:', status);
          }
        });
    } else if (this.loginForm.get('password')?.errors?.['minlength']) {
      this.screenNotification.sendMessage({
        title: 'Помилка входу',
        text: 'Пароль повинен містити не менше 8 символів',
        buttonText: 'Закрити',
      });
    } else if (this.loginForm.get('email')?.errors?.['email']) {
      this.screenNotification.sendMessage({
        title: 'Помилка входу',
        text: 'Введіть коректну електронну пошту',
        buttonText: 'Закрити',
      });
    } else {
      this.screenNotification.sendMessage({
        title: 'Помилка входу',
        text: 'Заповніть всі поля',
        buttonText: 'Закрити',
      });
    }
  }
}
