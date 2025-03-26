import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router)
  const isAuthenticated = !!sessionStorage.getItem('access_token')

  if (!isAuthenticated) {
    router.navigate(['/'])
    return false
  }

  return true
}
