import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { ClaveEnum } from '../util/enum';

export const authGuard: CanActivateFn = (route, state) => {
  const service = inject(AuthService);
  const router = inject(Router);
  if (service.isAuthenticated()) {
    if (isTokenExpired()) {
      service.logout();
      router.navigate(['/login']);
      return false;
    }
    // if (mustChangePassword()) {
    //   if (!state.url.startsWith('/cambiar-clave')) {
    //     router.navigate(['/cambiar-clave']);
    //     return false;
    //   }
    //   return true;
    // }
    return true;
  }
  router.navigate(['/login']);
  return false;
};

const isTokenExpired = () => {
  const service = inject(AuthService);
  const token = service.getToken();
  const payload = service.getPayload(token);
  const exp = payload.exp;
  const now = new Date().getTime() / 1000;
  return now > exp ? true : false;
};

const mustChangePassword = () => {
  const service = inject(AuthService);
  const token = service.getToken();
  const payload = service.getPayload(token);
  return payload.reset_password === ClaveEnum.DEBE_CAMBIAR;
};
