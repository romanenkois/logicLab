import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { TokenStorage } from '@storage';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const authorizationGuard: CanActivateFn = (route, state) => {
  const tokenStorage: TokenStorage = inject(TokenStorage);
  const router: Router = inject(Router);
  const requiresAuth = !['login', 'registration'].includes(route.routeConfig?.path || '');

  const isLoggedIn = tokenStorage.getAccessToken() !== null;

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
