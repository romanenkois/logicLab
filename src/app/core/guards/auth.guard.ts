import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { UserStorage } from '@storage';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const authorizationGuard: CanActivateFn = (route, state) => {
  const userStorage: UserStorage = inject(UserStorage);
  const router: Router = inject(Router);
  const requiresAuth = !['login', 'registration'].includes(route.routeConfig?.path || '');

  const isLoggedIn = userStorage.getUser() !== null;

  if (requiresAuth && !isLoggedIn) {
    router.navigate(['/login']);
    return false;
  }

  if (!requiresAuth && isLoggedIn) {
    router.navigate(['/profile']);
    return false;
  }

  return true;
};
