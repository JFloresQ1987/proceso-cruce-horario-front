import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PagesModule } from './components/pages/pages.module';
import { AuthModule } from './components/auth/auth.module';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { SharedModule } from './components/shared/shared.module';
import { AuthInterceptor } from './core/interceptors/auth.interceptor';
import { CommonsModule } from './components/common/commons.module';
import { LoadingService } from './core/services/loading.service';
import { TokenInterceptor } from './core/interceptors/token.interceptor';
import { ErrorInterceptor } from './core/interceptors/error.interceptor';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    CommonsModule,
    PagesModule,
    AuthModule,
  ],
  providers: [
    LoadingService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
