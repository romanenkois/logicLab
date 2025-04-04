import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('@pages/home/home.component'),
  },
  {
    path: 'login',
    loadComponent: () => import('@pages/login/login.component'),
  },
  {
    path: 'profile',
    loadComponent: () => import('@pages/profile/profile.component'),
  },
  {
    path: 'user',
    redirectTo: '/profile',
  },
  {
    path: 'user/:userid',
    loadComponent: () => import('@pages/user/user.component'),
  },
  {
    path: 'courses',
    loadComponent: () => import('@pages/courses/courses.component'),
  },
  {
    path: 'course/:courseHref',
    loadComponent: () => import('@pages/course/course.component'),
  },
  {
    path: 'course/:courseHref/:lessonHref',
    loadComponent: () => import('@pages/lesson/lesson.component'),
  },
  {
    path: 'tests',
    loadComponent: () => import('@pages/tests/tests.component'),
  },
  {
    path: 'test/:testCollectionHref/:testHref',
    loadComponent: () => import('@pages/test/test.component'),
  },
  {
    path: 'code-space',
    loadComponent: () => import('@pages/code-space/code-space.component'),
  },
  {
    path: 'error404',
    loadComponent: () => import('@pages/error404/error404.component'),
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
