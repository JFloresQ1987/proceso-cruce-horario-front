import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PagesRoutingModule } from './components/pages/pages.routing';
import { AuthRoutingModule } from './components/auth/auth.routing';
import { Error404Component } from './components/shared/error404/error404.component';

const routes: Routes = [{ path: '**', component: Error404Component }];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { useHash: true }),
    AuthRoutingModule,
    PagesRoutingModule,
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
