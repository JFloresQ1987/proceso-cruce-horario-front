import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const roleGuard: CanActivateFn = (route, state) => {
  const service = inject(AuthService);
  const router = inject(Router);
  const requiredRoles: string[] = route.data['roles'];
  if (service.hasRoles(requiredRoles)) {
    return true; // El usuario tiene al menos uno de los roles requeridos, permite el acceso
  }
  router.navigate(['/']);
  return false;
};
