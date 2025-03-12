import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-inactivity-warning',
  templateUrl: './inactivity-warning.component.html',
  styleUrl: './inactivity-warning.component.css',
})
export class InactivityWarningComponent implements OnInit {
  countdown: number = 30; // Tiempo del contador en segundos
  private timer: any;

  constructor(private dialogRef: MatDialogRef<InactivityWarningComponent>) {}

  ngOnInit(): void {
    this.startCountdown();
  }

  private startCountdown(): void {
    this.timer = setInterval(() => {
      this.countdown--;
      if (this.countdown === 0) {
        this.logout(); // Cierra sesión automáticamente
      }
    }, 1000);
  }

  extendSession(): void {
    clearInterval(this.timer); // Detén el temporizador
    this.dialogRef.close(true); // Retorna `true` para continuar la sesión
  }

  logout(): void {
    clearInterval(this.timer); // Detén el temporizador
    this.dialogRef.close(false); // Retorna `false` para cerrar la sesión
  }

  ngOnDestroy(): void {
    clearInterval(this.timer); // Asegúrate de limpiar el temporizador al destruir el componente
  }
}
