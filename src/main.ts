import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/basic/app.config';
import { AppComponent } from './app/basic/app.component';

bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));
