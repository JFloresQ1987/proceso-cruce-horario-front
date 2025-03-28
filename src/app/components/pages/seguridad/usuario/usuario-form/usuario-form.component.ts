import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UtilsService } from '../../../../../core/services/utils.service';
import { UsuarioService } from '../../../../../core/services/usuario.service';
import { UsuarioUpdateDto } from '../../../../../core/interfaces/usuario-update-dto';
import { RolService } from '../../../../../core/services/rol.service';
import { RolDto } from '../../../../../core/interfaces/rol-dto';

@Component({
  selector: 'app-usuario-form',
  templateUrl: './usuario-form.component.html',
  styleUrl: './usuario-form.component.css',
})
export class UsuarioFormComponent implements OnInit {
  id: number = 0;
  title: string = '';
  form: FormGroup;
  roles: RolDto[];

  @ViewChild('inputNombreCompleto') inputNombreCompleto!: ElementRef;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private utilsService: UtilsService,
    private usuarioService: UsuarioService,
    private rolService: RolService
  ) {
    const navigation = this.router.getCurrentNavigation();
    if (navigation?.extras.state) {
      const { id } = navigation.extras.state;
      this.id = id ?? '';
    } else {
      this.router.navigate(['/usuario/nuevo']);
    }
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      idUsuario: [''],
      nombreCompleto: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(150),
        ],
      ],
      correoElectronico: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(150),
        ],
      ],
      roles: [[], [Validators.required]],
    });

    this.loadInitial();
    setTimeout(() => {
      if (this.inputNombreCompleto) {
        this.inputNombreCompleto.nativeElement.focus();
      }
    });
  }

  loadInitial(): void {
    this.rolService.listar().subscribe((result: any) => {
      const data = result.data;
      this.roles = data;
    });

    if (this.id === 0) {
      this.title = 'Nuevo Registro';
    } else {
      this.title = 'Editar Registro';
      this.usuarioService.listarPorId(this.id).subscribe((result: any) => {
        const data = result.data;
        const rolesIds: number[] = data.roles.map((rol) => rol.idRol);
        this.form.patchValue({
          idUsuario: data.idUsuario,
          nombreCompleto: data.nombreCompleto,
          correoElectronico: data.correoElectronico,
          roles: rolesIds,
        });
      });
    }
  }

  async save(): Promise<void> {
    if (!this.form.valid) {
      this.utilsService.warning({
        message: 'Validar la información proporcionada.',
      });
      return;
    }

    const rolesSeleccionados: number[] = this.form.value['roles'];
    const rolesDto: RolDto[] = rolesSeleccionados.map(
      (id) => ({ idRol: id } as RolDto)
    );
    const entidad: UsuarioUpdateDto = {
      idUsuario: this.id,
      nombreCompleto: this.form.value['nombreCompleto'],
      correoElectronico: this.form.value['correoElectronico'],
      roles: rolesDto,
    };

    if (this.id == 0) {
      const confirm = await this.utilsService.confirm({
        message: '¿Está seguro en crear el usuario?',
      });
      if (confirm) {
        this.usuarioService.guardar(entidad).subscribe((result: any) => {
          this.router.navigate(['/usuario'], {
            state: {
              message: 'La creación de usuario fue completada con éxito.',
            },
          });
        });
      }
    } else {
      const confirm = await this.utilsService.confirm({
        message: '¿Está seguro en actualizar el usuario?',
      });
      if (confirm) {
        this.usuarioService.actualizar(entidad).subscribe((result: any) => {
          this.router.navigate(['/usuario'], {
            state: {
              message: 'La actualización de usuario fue completada con éxito.',
            },
          });
        });
      }
    }
  }

  async cancel(): Promise<void> {
    const confirm = await this.utilsService.confirm({
      message: '¿Está seguro en cancelar la acción?',
    });
    if (confirm) {
      this.router.navigate(['/usuario']);
    }
  }
}
