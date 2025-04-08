import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { UserCommand } from '@commands';
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
        .subscribe({
          next: () => {
            this.router.navigate(['/profile']);
          },
          error: (error) => {
            this.loginForm.reset();
            if (error.status === 404) {
              window.alert('Невірний логін або пароль');
            } else {
              window.alert('Помилка під час входу');
            }
          },
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
