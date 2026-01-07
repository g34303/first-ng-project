import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';

export const dashboardRedirectGuard: CanActivateFn = () => {
  const router = inject(Router);

  const loggedIn = localStorage.getItem('loggedIn') === 'true';

  if (!loggedIn) {
    router.navigate(['/menu']);
    return false;
  }

  return true;
};
