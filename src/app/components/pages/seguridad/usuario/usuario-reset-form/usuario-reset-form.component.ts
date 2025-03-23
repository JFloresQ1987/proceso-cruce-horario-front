import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { UtilsService } from '../../../../../core/services/utils.service';

@Component({
  selector: 'app-usuario-reset-form',
  templateUrl: './usuario-reset-form.component.html',
  styleUrl: './usuario-reset-form.component.css',
})
export class UsuarioResetFormComponent {
  clave: string = '123456';

  constructor(
    private dialogRef: MatDialogRef<UsuarioResetFormComponent>,
    private utilsService: UtilsService
  ) {}

  // continue() {
  //   this.dialogRef.close(this.clave.trim());
  // }

  async continue(): Promise<void> {
    if (!this.clave || this.clave.trim() === '') {
      return;
    }
    
    const confirm = await this.utilsService.confirm({
      message: '¿Está seguro en realizar la acción de reseteo?',
    });
    if (confirm) {
      this.dialogRef.close(this.clave.trim());
    }
  }
}
