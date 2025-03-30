import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  {
    path: 'home',
    renderMode: RenderMode.Prerender
  },
  {
    path: 'login',
    renderMode: RenderMode.Prerender
  },
  {
    path: 'user',
    renderMode: RenderMode.Client
  },
  {
    path: 'courses',
    renderMode: RenderMode.Prerender
  },
  {
    path: 'course/:courseHref',
    renderMode: RenderMode.Client
  },
  {
    path: 'course/:courseHref/:lessonHref',
    renderMode: RenderMode.Client
  },
  {
    path: 'tests',
    renderMode: RenderMode.Prerender
  },
  {
    path: 'test/:testCollectionHref/:testHref',
    renderMode: RenderMode.Client
  },
  {
    path: 'console',
    renderMode: RenderMode.Prerender
  },
  {
    path: 'error404',
    renderMode: RenderMode.Prerender
  },
  {
    path: '**',
    renderMode: RenderMode.Client
  }
];
