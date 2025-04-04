import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { PagesComponent } from './pages.component';
import { MaterialModule } from '../../material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonsModule } from '../common/commons.module';
import { InactivityService } from '../../core/services/inactivity.service';
import { VerProcesoComponent } from './proceso/ver-proceso/ver-proceso.component';
import { VerProcesoDetalleComponent } from './proceso/ver-proceso-detalle/ver-proceso-detalle.component';
import { GenerarProcesoComponent } from './proceso/generar-proceso/generar-proceso.component';
import { UsuarioComponent } from './seguridad/usuario/usuario.component';
import { ToleranciaComponent } from './configuracion/tolerancia/tolerancia.component';
import { CambiarClaveComponent } from './seguridad/cambiar-clave/cambiar-clave.component';
import { UsuarioFormComponent } from './seguridad/usuario/usuario-form/usuario-form.component';
import { AbsentismoComponent } from './configuracion/absentismo/absentismo.component';
import { UsuarioResetFormComponent } from './seguridad/usuario/usuario-reset-form/usuario-reset-form.component';
import { AbsentismoFormComponent } from './configuracion/absentismo/absentismo-form/absentismo-form.component';

@NgModule({
  declarations: [
    PagesComponent,
    VerProcesoComponent,
    VerProcesoDetalleComponent,
    GenerarProcesoComponent,
    UsuarioComponent,
    ToleranciaComponent,
    CambiarClaveComponent,
    UsuarioFormComponent,
    AbsentismoComponent,
    UsuarioResetFormComponent,
    AbsentismoFormComponent,
  ],
  exports: [PagesComponent],
  imports: [
    MaterialModule,
    SharedModule,
    CommonsModule,
    RouterModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  providers: [InactivityService],
})
export class PagesModule {}
