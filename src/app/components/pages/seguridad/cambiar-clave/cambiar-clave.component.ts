import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  AbstractControl,
  ValidationErrors,
} from '@angular/forms';
import { Router } from '@angular/router';
import { UsuarioClave } from '../../../../core/interfaces/usuario-clave';
import { AuthService } from '../../../../core/services/auth.service';
import { UsuarioService } from '../../../../core/services/usuario.service';
import { UtilsService } from '../../../../core/services/utils.service';

@Component({
  selector: 'app-cambiar-clave',
  templateUrl: './cambiar-clave.component.html',
  styleUrl: './cambiar-clave.component.css',
})
export class CambiarClaveComponent implements OnInit {
  hidePasswordActual = true;
  hidePasswordNuevo = true;
  hidePasswordConfirmar = true;
  form!: FormGroup;

  @ViewChild('inputDescripcion') inputDescripcion!: ElementRef;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private utilsService: UtilsService,
    private authService: AuthService // private usuarioService: UsuarioService // private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group(
      {
        passwordActual: [
          '',
          [
            Validators.required,
            Validators.minLength(6),
            Validators.maxLength(50),
          ],
        ],
        passwordNuevo: [
          '',
          [
            Validators.required,
            Validators.minLength(8),
            Validators.maxLength(50),
            this.strongPasswordValidator,
          ],
        ],
        passwordConfirmar: ['', [Validators.required]],
      },
      { validators: this.passwordsMatchValidator }
    );
  }

  // async save(): Promise<void> {
  //   if (!this.form.valid) {
  //     this.utilsService.warning({ message: 'Validar la información proporcionada.' });
  //     return;
  //   }

  //   const entidad: UsuarioClave = {
  //     passwordActual: this.form.value['passwordActual'],
  //     passwordNuevo: this.form.value['passwordNuevo'],
  //     passwordConfirmar: this.form.value['passwordConfirmar'],
  //   };

  //   const confirm = await this.utilsService.confirm({ message: '¿Está seguro en cambiar su clave?' });
  //   if (confirm) {
  //     this.usuarioService.changePassword(entidad).subscribe(() => {
  //       this.authService.logout();
  //       this.router.navigateByUrl('/login');
  //     });
  //   }
  // }

  async save(): Promise<void> {
    if (!this.form.valid) {
      this.utilsService.warning({
        message: 'Validar la información proporcionada.',
      });
      return;
    }

    if (
      this.form.value['passwordNuevo'] !== this.form.value['passwordConfirmar']
    ) {
      this.utilsService.warning({
        message: 'Las contraseñas no coinciden.',
      });
      return;
    }

    const confirm = await this.utilsService.confirm({
      message: '¿Está seguro en cambiar su clave?',
    });

    if (confirm) {
      const request = {
        currentPassword: this.form.value['passwordActual'],
        newPassword: this.form.value['passwordNuevo'],
      };

      this.authService.changePassword(request).subscribe(() => {
        this.authService.logout();
        this.router.navigateByUrl('/login');
      });

      // this.usuarioService.changePassword(request).subscribe(
      //   () => {
      //     this.utilsService.success({
      //       message: 'Contraseña cambiada exitosamente. Inicie sesión nuevamente.',
      //     });
      //     this.authService.logout();
      //     this.router.navigateByUrl('/login');
      //   },
      //   (error) => {
      //     this.utilsService.error({
      //       message: error.error?.message || 'Error al cambiar la contraseña.',
      //     });
      //   }
      // );
    }
  }

  async cancel(): Promise<void> {
    const confirm = await this.utilsService.confirm({
      message: '¿Está seguro en cancelar la acción?',
    });
    if (confirm) {
      this.router.navigate(['/']);
    }
  }

  togglePasswordActualVisibility(event: Event) {
    event.preventDefault();
    this.hidePasswordActual = !this.hidePasswordActual;
  }

  togglePasswordNuevoVisibility(event: Event) {
    event.preventDefault();
    this.hidePasswordNuevo = !this.hidePasswordNuevo;
  }

  togglePasswordConfirmarVisibility(event: Event) {
    event.preventDefault();
    this.hidePasswordConfirmar = !this.hidePasswordConfirmar;
  }

  private strongPasswordValidator(
    control: AbstractControl
  ): ValidationErrors | null {
    const value = control.value;
    if (!value) return null;

    // const strongPasswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,50}$/;
    const strongPasswordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[¡!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/¿?])[A-Za-z\d¡!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/¿?]{8,50}$/;
    return strongPasswordRegex.test(value) ? null : { weakPassword: true };
  }

  private passwordsMatchValidator(
    group: AbstractControl
  ): ValidationErrors | null {
    const passwordNuevo = group.get('passwordNuevo')?.value;
    const passwordConfirmar = group.get('passwordConfirmar')?.value;

    return passwordNuevo === passwordConfirmar
      ? null
      : { passwordsMismatch: true };
  }
}

// import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
// import { FormGroup, FormBuilder, Validators } from '@angular/forms';
// import { Router } from '@angular/router';
// import { UsuarioClave } from '../../../../core/interfaces/usuario-clave';
// import { AuthService } from '../../../../core/services/auth.service';
// import { UsuarioService } from '../../../../core/services/usuario.service';
// import { UtilsService } from '../../../../core/services/utils.service';

// @Component({
//   selector: 'app-cambiar-clave',
//   templateUrl: './cambiar-clave.component.html',
//   styleUrl: './cambiar-clave.component.css'
// })
// export class CambiarClaveComponent implements OnInit {
//   hidePasswordActual = true;
//   hidePasswordNuevo = true;
//   hidePasswordConfirmar = true;
//   form: FormGroup;

//   @ViewChild('inputDescripcion') inputDescripcion!: ElementRef;

//   constructor(
//     private router: Router,
//     private fb: FormBuilder,
//     private utilsService: UtilsService,
//     private authService: AuthService,
//     private usuarioService: UsuarioService
//   ) {}

//   ngOnInit(): void {
//     this.form = this.fb.group({
//       passwordActual: [
//         '',
//         [
//           Validators.required,
//           Validators.minLength(6),
//           Validators.maxLength(50),
//         ],
//       ],
//       passwordNuevo: [
//         '',
//         [
//           Validators.required,
//           Validators.minLength(8),
//           Validators.maxLength(50),
//         ],
//       ],
//       passwordConfirmar: [
//         '',
//         [
//           Validators.required,
//           Validators.minLength(8),
//           Validators.maxLength(50),
//         ],
//       ],
//     });
//   }

//   async save(): Promise<void> {
//     //TODO: mejora de validación para clave segura
//     //TODO: validación de clave nueva y confirmada iguales
//     if (!this.form.valid) {
//       this.utilsService.warning({
//         message: 'Validar la información proporcionada.',
//       });
//       return;
//     }
//     const entidad: UsuarioClave = {
//       passwordActual: this.form.value['passwordActual'],
//       passwordNuevo: this.form.value['passwordNuevo'],
//       passwordConfirmar: this.form.value['passwordConfirmar'],
//     };

//     const confirm = await this.utilsService.confirm({
//       message: '¿Está seguro en cambiar su clave?',
//     });
//     if (confirm) {
//       this.usuarioService.changePassword(entidad).subscribe((result: any) => {
//         this.authService.logout();
//         this.router.navigateByUrl('/login');
//       });
//     }
//   }

//   async cancel(): Promise<void> {
//     const confirm = await this.utilsService.confirm({
//       message: '¿Está seguro en cancelar la acción?',
//     });
//     if (confirm) {
//       this.router.navigate(['/']);
//     }
//   }

//   togglePasswordActualVisibility(event: Event) {
//     event.preventDefault();
//     this.hidePasswordActual = !this.hidePasswordActual;
//   }

//   togglePasswordNuevoVisibility(event: Event) {
//     event.preventDefault();
//     this.hidePasswordNuevo = !this.hidePasswordNuevo;
//   }

//   togglePasswordConfirmarVisibility(event: Event) {
//     event.preventDefault();
//     this.hidePasswordConfirmar = !this.hidePasswordConfirmar;
//   }
// }
