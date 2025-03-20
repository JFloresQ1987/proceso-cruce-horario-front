import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PagesComponent } from './pages.component';
import { authGuard } from '../../core/guard/auth.guard';
import { roleGuard } from '../../core/guard/role.guard';

const routes: Routes = [
  {
    path: '',
    component: PagesComponent,
    canActivate: [authGuard],
    // canActivate: [authGuard, roleGuard],
    // canLoad: [authGuard, roleGuard],
    // canActivate: [authGuard],
    // canLoad: [authGuard],
    // data: {
    //   roles: ['ROLE_ADMIN', 'ROLE_USER'],
    // },
    loadChildren: () =>
      import('./child-routes.module').then((m) => m.ChildRoutesModule),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {}
