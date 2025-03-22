import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { UtilsService } from '../services/utils.service';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(private utilsService: UtilsService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const excludedUrls = ['/auth/login'];
    const isExcluded = excludedUrls.some((url) => req.url.includes(url));
    return next.handle(req).pipe(
      // tap((event: any) => {
      //   if (!(event.body && event.body.success)) this.utilsService.error();
      // }),
      catchError((error: HttpErrorResponse) => {
        if (isExcluded) {
          return throwError(() => error);
        }
        // if (error.status === 400 || error.status === 404)
        //   this.utilsService.warning({
        //     message: error.error.message,
        //   });
        if (error.status === 409)
          this.utilsService.warning({
            message: error.error.message,
          });
        if (error.status === 422) {
          const errorMessages: string[] = error.error.errors.map(
            (error) => error.Observation
          );
          // const errorMessages: string[] = [];
          // errorMessages.push(`<code>Código Dx</code>: es obligatorio.`);
          if (errorMessages.length > 0) {
            this.utilsService.warning({
              message: errorMessages.join('<br/>'),
            });
          }
        }
        // this.utilsService.warning({
        //   message: error.error.message,
        // });
        // if (error.status === 400)
        //   this.utilsService.warning({
        //     message: error.error.message,
        //   });
        else if (error.status === 500) this.utilsService.error();

        return throwError(() => error);
      })
    );
  }
}
