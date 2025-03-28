import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  AbstractControl,
  ValidationErrors,
} from '@angular/forms';
import { Router } from '@angular/router';
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
    private usuarioService: UsuarioService,
    private authService: AuthService
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

      this.usuarioService.changePassword(request).subscribe(() => {
        this.authService.logout();
        this.router.navigateByUrl('/login');
      });
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
