import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { roleGuard } from '../../core/guard/role.guard';
import { authGuard } from '../../core/guard/auth.guard';
import { GenerarProcesoComponent } from './proceso/generar-proceso/generar-proceso.component';
import { VerProcesoComponent } from './proceso/ver-proceso/ver-proceso.component';
import { CambiarClaveComponent } from './seguridad/cambiar-clave/cambiar-clave.component';
import { UsuarioComponent } from './seguridad/usuario/usuario.component';
import { UsuarioFormComponent } from './seguridad/usuario/usuario-form/usuario-form.component';
import { ToleranciaComponent } from './configuracion/tolerancia/tolerancia.component';

const childRoutes: Routes = [
  {
    path: 'generar-proceso',
    component: GenerarProcesoComponent,
    canActivate: [authGuard, roleGuard],
    data: {
      roles: ['ROLE_ADMIN', 'ROLE_USER'],
      breadcrumb: 'Proceso > Generar Proceso',
    },
  },
  {
    path: 'ver-proceso',
    component: VerProcesoComponent,
    canActivate: [authGuard, roleGuard],
    data: {
      roles: ['ROLE_ADMIN', 'ROLE_USER'],
      breadcrumb: 'Proceso > Ver Proceso',
    },
  },
  {
    path: 'cambiar-clave',
    component: CambiarClaveComponent,
    canActivate: [authGuard /*,roleGuard*/],
    data: {
      //roles: ['ROLE_ADMIN', 'ROLE_USER', 'ROLE_APROBACION_PROFESIONAL','ROLE_APM_ESSALUD'],
      breadcrumb: 'Seguridad > Cambiar Clave',
    },
  },
  {
    path: 'usuario',
    component: UsuarioComponent,
    canActivate: [authGuard, roleGuard],
    data: {
      roles: ['ROLE_ADMIN'],
      breadcrumb: 'Seguridad > Gestión de Usuario',
    },
    children: [
      {
        path: 'nuevo',
        component: UsuarioFormComponent,
        data: {
          breadcrumb: 'Nuevo',
        },
      },
      {
        path: 'editar',
        component: UsuarioFormComponent,
        data: {
          breadcrumb: 'Editar',
        },
      },
      // {
      //   path: 'baja',
      //   component: UsuarioBajaFormComponent,
      //   data: {
      //     breadcrumb: 'Baja',
      //   },
      // },
    ],
  },
  {
    path: 'tolerancia',
    component: ToleranciaComponent,
    canActivate: [authGuard ,roleGuard],
    data: {
      roles: ['ROLE_ADMIN'],
      breadcrumb: 'Configuración > Tolerancia',
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(childRoutes)],
  exports: [RouterModule],
  declarations: [],
})
export class ChildRoutesModule {}
