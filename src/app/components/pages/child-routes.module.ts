import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { roleGuard } from '../../core/guard/role.guard';
import { authGuard } from '../../core/guard/auth.guard';
import { GenerarProcesoComponent } from './proceso/generar-proceso/generar-proceso.component';
import { VerProcesoComponent } from './proceso/ver-proceso/ver-proceso.component';

const childRoutes: Routes = [
  {
    path: 'generar-proceso',
    component: GenerarProcesoComponent,
    canActivate: [authGuard, roleGuard],
    data: {
      roles: ['ROLE_ADMIN', 'ROLE_DIGITADOR'],
      breadcrumb: 'Proceso > Generar Proceso',
    },
  },
  {
    path: 'ver-proceso',
    component: VerProcesoComponent,
    canActivate: [authGuard, roleGuard],
    data: {
      roles: ['ROLE_ADMIN', 'ROLE_DIGITADOR'],
      breadcrumb: 'Proceso > Ver Proceso',
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(childRoutes)],
  exports: [RouterModule],
  declarations: [],
})
export class ChildRoutesModule {}
