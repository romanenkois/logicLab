import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./pages/home/home.component'),
  },
  {
    path: 'courses',
    loadComponent: () => import('./pages/courses/courses.component'),
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
    path: 'console',
    loadComponent: () => import('./pages/console/console.component'),
  },
  {
    path: 'error404',
    loadComponent: () => import('./pages/error404/error404.component'),
    data: {title: 'Error 404'}
  },
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full',
  },
  {
    path: '**',
    redirectTo: '/error404'
  },
];
