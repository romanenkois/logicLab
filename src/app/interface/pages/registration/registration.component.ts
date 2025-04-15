import { Component, inject } from '@angular/core';
import { UserCommand } from '@commands';
import {
  ReactiveFormsModule,
  FormGroup,
  FormBuilder,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { RegistrationState } from '@types';

@Component({
  selector: 'app-registration',
  imports: [ReactiveFormsModule],
  templateUrl: './registration.component.html',
  styleUrl: './registration.component.scss',
})
export default class RegistrationComponent {
  userCommand: UserCommand = inject(UserCommand);
  private formBuilder: FormBuilder = inject(FormBuilder);
  private router: Router = inject(Router);

  registrationForm: FormGroup = this.formBuilder.group({
    name: ['', [Validators.required, Validators.minLength(2)]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(8)]],
    confirmPassword: ['', [Validators.required]],
  });

  passwordsMatchValidator() {
    return (
      this.registrationForm.get('password')?.value ===
      this.registrationForm.get('confirmPassword')?.value
    );
  }

  registerUser() {
    if (this.registrationForm.valid && this.passwordsMatchValidator()) {
      const formValue = this.registrationForm.value;

      this.userCommand
        .registerUser({
          name: formValue.name,
          email: formValue.email,
          password: formValue.password,
        })
        .subscribe((status: RegistrationState) => {
          switch (status) {
            case 'loading':
              console.log('Loading...');
              break;
            case 'resolved':
              console.log('Registration successful');
              this.router.navigate(['/profile']);
              break;
            case 'error':
              window.alert('Помилка під час реєстрації');
              break;
            case 'userAlreadyExists':
              window.alert('Користувач з такою поштою вже існує');
              break;
            case 'invalidData':
              window.alert('Некоректні дані');
              break;
            default:
              console.error('Unknown status:', status);
              break;
          }
        });
    } else if (!this.passwordsMatchValidator()) {
      window.alert('Паролі не співпадають');
    } else {
      window.alert('Будь ласка, заповніть усі поля коректно');
    }
  }
}
