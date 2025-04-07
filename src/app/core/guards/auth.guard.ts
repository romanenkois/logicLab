import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { UserStorage } from '@storage';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const authorizationGuard: CanActivateFn = (route, state) => {
  const userStorage: UserStorage = inject(UserStorage);
  const router: Router = inject(Router);

  if (userStorage.getUser() === null) {
    router.navigate(['/login']);
    return false;
  } else {
    return true;
  }
};
