import {
  APP_INITIALIZER,
  ApplicationConfig,
  provideZoneChangeDetection,
} from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';

import { provideHighlightOptions } from 'ngx-highlightjs';

import { PreloadService } from '@services';

export function appPreloadInitializer(preloadService: PreloadService) {
  return () => preloadService;
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(),

    PreloadService,
    {
      provide: APP_INITIALIZER,
      useFactory: appPreloadInitializer,
      deps: [PreloadService],
      multi: true,
    },

    provideHighlightOptions({
      coreLibraryLoader: () => import('highlight.js/lib/core'),
      lineNumbersLoader: () => import('ngx-highlightjs/line-numbers'),
      languages: {
        javascript: () => import('highlight.js/lib/languages/javascript'),
        typescript: () => import('highlight.js/lib/languages/typescript'),
        python: () => import('highlight.js/lib/languages/python'),
        xml: () => import('highlight.js/lib/languages/xml'),
        css: () => import('highlight.js/lib/languages/css'),
      },
    }),
  ],
};
