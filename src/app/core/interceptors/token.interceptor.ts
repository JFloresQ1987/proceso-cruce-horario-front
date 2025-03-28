import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { finalize, Observable, tap } from 'rxjs';
import { LoadingService } from '../services/loading.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(
    private authService: AuthService,
    private loadingService: LoadingService
  ) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const token = this.authService.getToken();
    const userId = this.authService.getUserId();
    const correo = this.authService.getEmail();
    let modifiedReq = req;
    const isFormData = req.body instanceof FormData;
    if (token) {
      modifiedReq = req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`,
          idUsuario: userId?.toString() || '',
          correoUsuario: correo?.toString() || '',
          ...(isFormData ? {} : { 'Content-Type': 'application/json' }),
        },
      });
    }
    this.loadingService.showLoading();
    return next.handle(modifiedReq).pipe(
      tap((event) => {
        if (event instanceof HttpResponse) {
          const newToken = event.headers.get('New-Access-Token');
          if (newToken) {
            this.authService.setToken(newToken);
          }
        }
      }),
      finalize(() => {
        this.loadingService.hideLoading();
      })
    );
  }
}
