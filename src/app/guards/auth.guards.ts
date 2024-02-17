import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { getIsLogged } from '../store/auth/auth.selectors';

export const authGuard: CanActivateFn = () => {
  const store = inject(Store);
  const router = inject(Router);
  let isLogged = false;
  store.select(getIsLogged).subscribe((res) => {
    isLogged = res;
  });
  if (isLogged) {
    return true;
  } else {
    return router.parseUrl('/sign-in');
  }
};
