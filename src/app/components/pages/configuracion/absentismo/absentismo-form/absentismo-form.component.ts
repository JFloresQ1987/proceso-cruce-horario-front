import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { UsuarioResetFormComponent } from '../../../seguridad/usuario/usuario-reset-form/usuario-reset-form.component';
import { TipoAbsentismoCreateDto } from '../../../../../core/interfaces/tipo-absentismo-create-dto';
import { inputOnlyNumber } from '../../../../../core/util/utils';
import { UtilsService } from '../../../../../core/services/utils.service';

@Component({
  selector: 'app-absentismo-form',
  templateUrl: './absentismo-form.component.html',
  styleUrl: './absentismo-form.component.css',
})
export class AbsentismoFormComponent {
  codigo: string = '';
  descripcion: string = '';

  constructor(
    private dialogRef: MatDialogRef<AbsentismoFormComponent>,
    private utilsService: UtilsService
  ) {}

  // continue() {
  //   const params: TipoAbsentismoCreateDto = {
  //     codigo: this.codigo,
  //     descripcion: this.descripcion,
  //   };
  //   this.dialogRef.close(params);
  // }

  async continue(): Promise<void> {
    if (!this.codigo || this.codigo.trim() === '') {
      return;
    }

    const params: TipoAbsentismoCreateDto = {
      codigo: Number(this.codigo),
      descripcion: this.descripcion,
    };

    const confirm = await this.utilsService.confirm({
      message: '¿Está seguro en realizar la acción de creación?',
    });
    if (confirm) {
      this.dialogRef.close(params);
    }
  }

  inputOnlyNumber(event: Event): void {
    inputOnlyNumber(event);
  }
}
