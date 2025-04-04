import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/angular-core/app.component';
import { config } from './app/angular-core/app.config.server';

const bootstrap = () => bootstrapApplication(AppComponent, config);

export default bootstrap;
