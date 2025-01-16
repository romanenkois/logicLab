import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./pages/home/home.component'),
  },
  {
    path: 'course/:courseHref',
    loadComponent: () => import('./pages/course/course.component'),
  },
  {
    path: 'course/:courseHref/:lessonHref',
    loadComponent: () => import('./pages/lesson/lesson.component'),
  },
  {
    path: 'console/:programmingLanguage',
    loadComponent: () => import('./pages/console/console.component'),
  },
  {
    path: 'error404',
    loadComponent: () => import('./pages/error404/error404.component'),
  },
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full',
  },
  {
    path: '**',
    redirectTo: '/error404',
    pathMatch: 'full',
  },
];
