import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { UserCommand } from '@commands';
import { LoginState } from '@types';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export default class LoginComponent {
  userCommand: UserCommand = inject(UserCommand);
  private formBuilder: FormBuilder = inject(FormBuilder);
  private router: Router = inject(Router);

  loginForm: FormGroup = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(8)]],
  });

  logInUser() {
    if (this.loginForm.valid) {
      const formValue = this.loginForm.value;
      this.userCommand
        .loginUser({
          email: formValue.email,
          password: formValue.password,
        })
        .subscribe((status: LoginState) => {
          switch (status) {
            case 'loading':
              console.log('Loading...');
              break;
            case 'resolved':
              this.router.navigate(['/profile']);
              break;
            case 'invalidData':
              window.alert('Невірні дані для входу');
              break;

            case 'error':
              window.alert('Помилка під час входу');
              break;
            default:
              console.error('Unknown status:', status);
          }
        });
    } else if (this.loginForm.get('password')?.errors?.['minlength']) {
      window.alert('Пароль повинен містити не менше 8 символів');
    } else if (this.loginForm.get('email')?.errors?.['email']) {
      window.alert('Введіть коректну електронну пошту');
    } else {
      window.alert('Заповніть всі поля');
    }
  }
}
