// import { Injectable, NgZone } from '@angular/core';
// import { Router } from '@angular/router';
// import { MatDialog } from '@angular/material/dialog';
// import { InactivityWarningComponent } from '../../components/common/inactivity-warning/inactivity-warning.component';
// import { AuthService } from './auth.service';

// @Injectable({
//   providedIn: 'root',
// })
// export class InactivityService {
//   private timeoutId: any;
//   private lastActivityTime: number = Date.now();
//   private readonly inactivityTime = 5 * 60 * 1000; // 5 minutos
//   private checkInterval = 1000; // Comprobar cada segundo

//   constructor(
//     private router: Router,
//     private ngZone: NgZone,
//     private dialog: MatDialog,
//     private authService: AuthService
//   ) {
//     this.setupInactivityListeners();
//   }

//   private setupInactivityListeners(): void {
//     const events = ['mousemove', 'keydown', 'click', 'scroll', 'touchstart'];
//     events.forEach((event) =>
//       window.addEventListener(event, () => this.resetTimeout())
//     );

//     // Detectar si la pestaña se oculta o muestra
//     document.addEventListener('visibilitychange', () => {
//       if (!document.hidden) {
//         this.resetTimeout();
//       }
//     });

//     this.startInactivityTimer();
//   }

//   private startInactivityTimer(): void {
//     this.ngZone.runOutsideAngular(() => {
//       this.timeoutId = setInterval(() => {
//         const elapsedTime = Date.now() - this.lastActivityTime;

//         if (elapsedTime >= this.inactivityTime - 30 * 1000) {
//           this.ngZone.run(() => this.showWarning());
//         }
//       }, this.checkInterval);
//     });
//   }

//   private resetTimeout(): void {
//     this.lastActivityTime = Date.now();
//   }

//   private showWarning(): void {
//     if (this.router.url === '/login') {
//       return;
//     }

//     if (this.authService.isTokenExpired()) {
//       this.handleInactivity();
//       return;
//     }

//     const dialogRef = this.dialog.open(InactivityWarningComponent, {
//       width: '400px',
//       disableClose: true, // Evita que se cierre sin interacción
//     });

//     dialogRef.afterClosed().subscribe((result) => {
//       if (result) {
//         // Si el usuario elige continuar
//         this.resetTimeout();
//       } else {
//         // Si el usuario no responde o elige cerrar sesión
//         this.handleInactivity();
//       }
//     });
//   }

//   private handleInactivity(): void {
//     this.dialog.closeAll();
//     this.authService.logout();
//     localStorage.clear(); // Limpia almacenamiento local (opcional)
//     this.router.navigate(['/login']); // Redirige al login
//   }
// }

import { Injectable, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { InactivityWarningComponent } from '../../components/common/inactivity-warning/inactivity-warning.component';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class InactivityService {
  private timeoutId: any;
  private lastActivityTime: number = Date.now();
  private readonly inactivityTime = 5 * 60 * 1000; // 5 minutos
  private checkInterval = 1000; // Comprobar cada segundo
  private isWarningDisplayed = false; // Flag para evitar múltiples modales

  constructor(
    private router: Router,
    private ngZone: NgZone,
    private dialog: MatDialog,
    private authService: AuthService
  ) {
    this.setupInactivityListeners();
  }

  private setupInactivityListeners(): void {
    const events = ['mousemove', 'keydown', 'click', 'scroll', 'touchstart'];
    events.forEach((event) =>
      window.addEventListener(event, () => this.resetTimeout())
    );

    document.addEventListener('visibilitychange', () => {
      if (!document.hidden) {
        this.resetTimeout();
      }
    });

    this.startInactivityTimer();
  }

  private startInactivityTimer(): void {
    this.ngZone.runOutsideAngular(() => {
      this.timeoutId = setInterval(() => {
        const elapsedTime = Date.now() - this.lastActivityTime;

        if (
          elapsedTime >= this.inactivityTime - 30 * 1000 &&
          !this.isWarningDisplayed
        ) {
          this.ngZone.run(() => this.showWarning());
        }
      }, this.checkInterval);
    });
  }

  private resetTimeout(): void {
    this.lastActivityTime = Date.now();
    this.isWarningDisplayed = false; // Resetear flag cuando hay actividad
  }

  private showWarning(): void {
    if (this.router.url === '/login' || this.isWarningDisplayed) {
      return;
    }

    if (this.authService.isTokenExpired()) {
      this.handleInactivity();
      return;
    }

    this.isWarningDisplayed = true; // Marcar que el modal ya está abierto

    const dialogRef = this.dialog.open(InactivityWarningComponent, {
      width: '400px',
      disableClose: true, // Evita que se cierre sin interacción
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.isWarningDisplayed = false; // Resetear flag cuando se cierra el modal

      if (result) {
        // Si el usuario elige continuar
        this.resetTimeout();
      } else {
        // Si el usuario no responde o elige cerrar sesión
        this.handleInactivity();
      }
    });
  }

  private handleInactivity(): void {
    this.dialog.closeAll();
    this.authService.logout();
    localStorage.clear(); // Limpia almacenamiento local (opcional)
    this.router.navigate(['/login']); // Redirige al login
  }
}

// import { Injectable, NgZone } from '@angular/core';
// import { Router } from '@angular/router';
// import { MatDialog } from '@angular/material/dialog';
// import { InactivityWarningComponent } from '../../components/common/inactivity-warning/inactivity-warning.component';
// import { AuthService } from './auth.service';

// @Injectable({
//   providedIn: 'root',
// })
// export class InactivityService {
//   private timeoutId: any;
//   private readonly inactivityTime = 5 * 60 * 1000; // 5 minutos

//   constructor(
//     private router: Router,
//     private ngZone: NgZone,
//     private dialog: MatDialog,
//     private authService: AuthService
//   ) {
//     this.setupInactivityListeners();
//   }

//   private setupInactivityListeners(): void {
//     const events = ['mousemove', 'keydown', 'click', 'scroll', 'touchstart'];
//     events.forEach((event) =>
//       window.addEventListener(event, () => this.resetTimeout())
//     );

//     this.startInactivityTimer();
//   }

//   private startInactivityTimer(): void {
//     this.ngZone.runOutsideAngular(() => {
//       this.timeoutId = setTimeout(() => {
//         this.ngZone.run(() => this.showWarning());
//       }, this.inactivityTime - 30 * 1000); // Muestra el modal 30 segundos antes de cerrar sesión
//     });
//   }

//   private resetTimeout(): void {
//     if (this.timeoutId) {
//       clearTimeout(this.timeoutId);
//     }
//     this.startInactivityTimer();
//   }

//   private showWarning(): void {
//     if (this.router.url === '/login') {
//       return;
//     }

//     if (this.authService.isTokenExpired()) {
//       this.handleInactivity();
//       return;
//     }

//     const dialogRef = this.dialog.open(InactivityWarningComponent, {
//       width: '400px',
//       disableClose: true, // Evita que se cierre sin interacción
//     });

//     dialogRef.afterClosed().subscribe((result) => {
//       if (result) {
//         // Si el usuario elige continuar
//         this.resetTimeout();
//       } else {
//         // Si el usuario no responde o elige cerrar sesión
//         this.handleInactivity();
//       }
//     });
//   }

//   private handleInactivity(): void {
//     this.dialog.closeAll();
//     this.authService.logout();
//     localStorage.clear(); // Limpia almacenamiento local (opcional)
//     this.router.navigate(['/login']); // Redirige al login
//   }
// }
