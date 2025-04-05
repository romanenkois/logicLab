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
    path: 'profile',
    renderMode: RenderMode.Prerender
  },
  {
    path: 'user/:userid',
    renderMode: RenderMode.Client
  },
  {
    path: 'courses',
    renderMode: RenderMode.Client
  },
  {
    path: 'course/:courseHref',
    renderMode: RenderMode.Client,

  },
  {
    path: 'course/:courseHref/:lessonHref',
    renderMode: RenderMode.Client
  },
  {
    path: 'tests',
    renderMode: RenderMode.Client
  },
  {
    path: 'test/:testCollectionHref/:testHref',
    renderMode: RenderMode.Client
  },
  {
    path: 'code-space',
    renderMode: RenderMode.Client
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
