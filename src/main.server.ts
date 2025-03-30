import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/basic/app.component';
import { config } from './app/basic/app.config.server';

const bootstrap = () => bootstrapApplication(AppComponent, config);

export default bootstrap;
