import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MessageDialogComponent } from '../../components/common/message-dialog/message-dialog.component';
import { ConfirmDialogComponent } from '../../components/common/confirm-dialog/confirm-dialog.component';

@Injectable({
  providedIn: 'root',
})
export class UtilsService {
  constructor(private dialog: MatDialog) {}

  /**
   * Abre un diálogo de error.
   * @param options - Configuración personalizada del mensaje de error.
   */
  error(options?: {
    message?: string;
    button?: { text?: string; icon?: string };
    action?: () => void;
  }): void {
    const dialogRef = this.dialog.open(MessageDialogComponent, {
      width: '500px',
      data: {
        title: 'Error',
        message:
          options?.message || 'Ocurrió un error inesperado en la aplicación.',
        // buttonText: options.button?.text || 'Cerrar',
        button: {
          text: options?.button?.text || 'Cerrar',
          icon: options?.button?.icon || 'close',
        },
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (options.action) {
        options.action();
      }
    });
  }

  /**
   * Abre un diálogo de éxito.
   * @param options - Configuración personalizada del mensaje de éxito.
   */
  success(options?: {
    message?: string;
    button?: { text?: string; icon?: string };
    action?: () => void;
  }): void {
    const dialogRef = this.dialog.open(MessageDialogComponent, {
      width: '500px',
      data: {
        title: 'Éxito',
        message: options?.message || 'Acción completada con éxito.',
        button: {
          text: options?.button?.text || 'Cerrar',
          icon: options?.button?.icon || 'close',
        },
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (options.action) {
        options.action();
      }
    });
  }

  /**
   * Abre un diálogo de aviso.
   * @param options - Configuración personalizada del mensaje de aviso.
   */
  warning(options?: {
    message?: string;
    button?: { text?: string; icon?: string };
    action?: () => void;
  }): void {
    const dialogRef = this.dialog.open(MessageDialogComponent, {
      width: '500px',
      data: {
        title: 'Aviso',
        message: options?.message || 'Validar la información proporcionada.',
        button: {
          text: options?.button?.text || 'Cerrar',
          icon: options?.button?.icon || 'close',
        },
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (options.action) {
        options.action();
      }
    });
  }

  /**
   * Abre un diálogo de confirmación.
   * @param options - Configuración personalizada del mensaje de aviso.
   */
  confirm(options?: {
    message?: string;
    button?: { text?: string; icon?: string };
  }): Promise<boolean> {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '500px',
      data: {
        title: 'Confirmación',
        message: options?.message || '¿Desea continuar con la acción?',
        button: {
          text: options?.button?.text || 'Continuar',
          icon: options?.button?.icon || 'check',
        },
      },
    });

    return dialogRef.afterClosed().toPromise();
  }
}
