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
import { ScreenNotificationService } from '@services';

@Component({
  selector: 'app-registration',
  imports: [ReactiveFormsModule],
  templateUrl: './registration.component.html',
  styleUrl: './registration.component.scss',
})
export default class RegistrationComponent {
  private userCommand: UserCommand = inject(UserCommand);
  private screenNotifications: ScreenNotificationService = inject(
    ScreenNotificationService,
  );

  private formBuilder: FormBuilder = inject(FormBuilder);
  private router: Router = inject(Router);

  status: RegistrationState = 'idle';

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
          this.status = status;

          switch (status) {
            case 'resolved':
              console.log('Registration successful');
              this.router.navigate(['/profile']);
              break;
            case 'error':
              this.screenNotifications.sendMessage({
                title: 'Помилка',
                text: 'Помилка під час реєстрації',
                buttonText: 'Ок',
              });
              break;
            case 'userAlreadyExists':
              this.screenNotifications.sendMessage({
                title: 'Помилка',
                text: 'Користувач з такою поштою вже існує',
                buttonText: 'Ок',
              });
              break;
            case 'invalidData':
              this.screenNotifications.sendMessage({
                title: 'Помилка',
                text: 'Ви ввели некоректні дані',
                buttonText: 'Ок',
              });
              break;
          }
        });
    } else if (!this.passwordsMatchValidator()) {
      this.screenNotifications.sendMessage({
        title: 'Помилка',
        text: 'Паролі не співпадають',
        buttonText: 'Ок',
      });
    } else {

      if (
        this.registrationForm.get('name')?.value &&
        this.registrationForm.get('email')?.value &&
        (this.registrationForm.get('password')?.value?.length || 0) < 8) {
        this.screenNotifications.sendMessage({
          title: 'Помилка',
          text: 'Пароль повинен містити не менше 8 символів',
          buttonText: 'Ок',
        });
        return;
      }
      this.screenNotifications.sendMessage({
        title: 'Помилка',
        text: 'Будь ласка, заповніть усі поля коректно',
        buttonText: 'Ок',
      });
    }
  }
}
