import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/angular-core/app.config';
import { AppComponent } from './app/angular-core/app.component';

bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));
