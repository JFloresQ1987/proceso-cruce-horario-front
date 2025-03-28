import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { inputOnlyNumber } from '../../../../../core/util/utils';
import { UtilsService } from '../../../../../core/services/utils.service';
import { TipoAbsentismoUpdateDto } from '../../../../../core/interfaces/tipo-absentismo-update-dto';

@Component({
  selector: 'app-absentismo-form',
  templateUrl: './absentismo-form.component.html',
  styleUrl: './absentismo-form.component.css',
})
export class AbsentismoFormComponent {
  id: number = 0;
  title: string = '';
  codigo: string = '';
  descripcion: string = '';

  constructor(
    private dialogRef: MatDialogRef<AbsentismoFormComponent>,
    private utilsService: UtilsService
  ) {}

  setData(dto: TipoAbsentismoUpdateDto) {
    this.id = dto.idMaestroTipoAbsentismo;
    this.codigo = dto.codigo == 0 ? '' : '' + dto.codigo;
    this.descripcion = dto.descripcion;
    if (this.id === 0) this.title = 'Nuevo Registro';
    else this.title = 'Editar Registro';
  }

  async continue(): Promise<void> {
    if (!this.codigo || this.codigo.trim() === '') {
      return;
    }

    const params: TipoAbsentismoUpdateDto = {
      idMaestroTipoAbsentismo: this.id,
      codigo: Number(this.codigo),
      descripcion: this.descripcion,
    };

    const message =
      this.id == 0
        ? '¿Está seguro de crearlo?'
        : '¿Está seguro de actualizarlo?';

    const confirm = await this.utilsService.confirm({
      message: message,
    });
    if (confirm) {
      this.dialogRef.close(params);
    }
  }

  inputOnlyNumber(event: Event): void {
    inputOnlyNumber(event);
  }
}
