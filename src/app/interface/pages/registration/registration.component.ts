import { Component, inject } from '@angular/core';
import { UserCommand } from '@commands';
import {
  ReactiveFormsModule,
  FormGroup,
  FormBuilder,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registration',
  imports: [ReactiveFormsModule],
  templateUrl: './registration.component.html',
  styleUrl: './registration.component.scss',
})
export default class RegistrationComponent {
  userCommand: UserCommand = inject(UserCommand);
  private formBuilder = inject(FormBuilder);
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
    console.log(123)
    if (this.registrationForm.valid && this.passwordsMatchValidator()) {
      const formValue = this.registrationForm.value;
      this.userCommand
        .registerUser({
          name: formValue.name,
          email: formValue.email,
          password: formValue.password,
        })
        .subscribe({
          next: () => {
            this.router.navigate(['/login']);
          },
          error: () => {
            this.registrationForm.reset();
            console.error('Error during registration');
          },
        });
    } else if (!this.passwordsMatchValidator()) {
      window.alert('Паролі не співпадають');
    } else {
      window.alert('Будь ласка, заповніть усі поля коректно');
    }
  }
}
