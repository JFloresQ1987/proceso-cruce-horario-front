import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RolDto } from '../../../../core/interfaces/rol-dto';
import { UsuarioUpdateDto } from '../../../../core/interfaces/usuario-update-dto';
import { RolService } from '../../../../core/services/rol.service';
import { UsuarioService } from '../../../../core/services/usuario.service';
import { UtilsService } from '../../../../core/services/utils.service';
import { inputOnlyNumber } from '../../../../core/util/utils';
import { ConfiguracionUpdateDto } from '../../../../core/interfaces/configuracion-update-dto';
import { ConfiguracionService } from '../../../../core/services/configuracion.service';

@Component({
  selector: 'app-tolerancia',
  templateUrl: './tolerancia.component.html',
  styleUrl: './tolerancia.component.css',
})
export class ToleranciaComponent implements OnInit {
  // id: number = 0;
  // title: string = '';
  // form: FormGroup;
  // minDate: Date = new Date(2023, 0, 1);
  // maxDate: Date;
  // roles: RolDto[];
  existeParametroHoraExtraToleranciaInicioDesde: boolean = false;
  existeParametroHoraExtraToleranciaInicioHasta: boolean = false;
  existeParametroHoraExtraToleranciaFinDesde: boolean = false;
  existeParametroHoraExtraToleranciaFinHasta: boolean = false;

  idParametroHoraExtraToleranciaInicioDesde: number = 0;
  idParametroHoraExtraToleranciaInicioHasta: number = 0;
  idParametroHoraExtraToleranciaFinDesde: number = 0;
  idParametroHoraExtraToleranciaFinHasta: number = 0;

  descripcionParametroHoraExtraToleranciaInicioDesde: string = '';
  descripcionParametroHoraExtraToleranciaInicioHasta: string = '';
  descripcionParametroHoraExtraToleranciaFinDesde: string = '';
  descripcionParametroHoraExtraToleranciaFinHasta: string = '';

  valorParametroHoraExtraToleranciaInicioDesde: number = 0;
  valorParametroHoraExtraToleranciaInicioHasta: number = 0;
  valorParametroHoraExtraToleranciaFinDesde: number = 0;
  valorParametroHoraExtraToleranciaFinHasta: number = 0;

  existeParametroAbsentismoToleranciaInicioDesde: boolean = false;
  existeParametroAbsentismoToleranciaInicioHasta: boolean = false;
  existeParametroAbsentismoToleranciaFinDesde: boolean = false;
  existeParametroAbsentismoToleranciaFinHasta: boolean = false;

  idParametroAbsentismoToleranciaInicioDesde: number = 0;
  idParametroAbsentismoToleranciaInicioHasta: number = 0;
  idParametroAbsentismoToleranciaFinDesde: number = 0;
  idParametroAbsentismoToleranciaFinHasta: number = 0;

  descripcionParametroAbsentismoToleranciaInicioDesde: string = '';
  descripcionParametroAbsentismoToleranciaInicioHasta: string = '';
  descripcionParametroAbsentismoToleranciaFinDesde: string = '';
  descripcionParametroAbsentismoToleranciaFinHasta: string = '';

  valorParametroAbsentismoToleranciaInicioDesde: number = 0;
  valorParametroAbsentismoToleranciaInicioHasta: number = 0;
  valorParametroAbsentismoToleranciaFinDesde: number = 0;
  valorParametroAbsentismoToleranciaFinHasta: number = 0;

  // @ViewChild('inputNombreCompleto') inputNombreCompleto!: ElementRef;

  constructor(
    private router: Router,
    // private fb: FormBuilder,
    private utilsService: UtilsService,
    private configuracionService: ConfiguracionService,
    private rolService: RolService
  ) {
    // this.maxDate = new Date();
    // const navigation = this.router.getCurrentNavigation();
    // if (navigation?.extras.state) {
    //   const { id } = navigation.extras.state;
    //   this.id = id ?? '';
    // } else {
    //   this.router.navigate(['/usuario/nuevo']);
    // }
  }

  ngOnInit(): void {
    // this.form = this.fb.group({
    //   idUsuario: [''],
    //   nombreCompleto: [
    //     '',
    //     [
    //       Validators.required,
    //       Validators.minLength(3),
    //       Validators.maxLength(150),
    //     ],
    //   ],
    //   correoElectronico: [
    //     '',
    //     [
    //       Validators.required,
    //       Validators.minLength(3),
    //       Validators.maxLength(150),
    //     ],
    //   ],
    //   roles: [[], [Validators.required]],
    // });
    this.loadInitial();
    // setTimeout(() => {
    //   if (this.inputNombreCompleto) {
    //     this.inputNombreCompleto.nativeElement.focus();
    //   }
    // });
  }

  loadInitial(): void {
    this.configuracionService.listar().subscribe((result: any) => {
      const data = result.data;
      // console.log(data);
      const parametroHoraExtraToleranciaInicioDesde = data.find(
        (config) => config.codigo === 'HHEE_TOLERANCIA_INICIO_DESDE'
      );

      if (parametroHoraExtraToleranciaInicioDesde) {
        this.idParametroHoraExtraToleranciaInicioDesde =
          parametroHoraExtraToleranciaInicioDesde.idMaestroConfiguracion;
        this.valorParametroHoraExtraToleranciaInicioDesde = Number(
          parametroHoraExtraToleranciaInicioDesde.valor
        );
        this.descripcionParametroHoraExtraToleranciaInicioDesde =
          parametroHoraExtraToleranciaInicioDesde.descripcion;
        this.existeParametroHoraExtraToleranciaInicioDesde = true;
      }

      const parametroHoraExtraToleranciaInicioHasta = data.find(
        (config) => config.codigo === 'HHEE_TOLERANCIA_INICIO_HASTA'
      );

      if (parametroHoraExtraToleranciaInicioHasta) {
        this.idParametroHoraExtraToleranciaInicioHasta =
          parametroHoraExtraToleranciaInicioHasta.idMaestroConfiguracion;
        this.valorParametroHoraExtraToleranciaInicioHasta = Number(
          parametroHoraExtraToleranciaInicioHasta.valor
        );
        this.descripcionParametroHoraExtraToleranciaInicioHasta =
          parametroHoraExtraToleranciaInicioHasta.descripcion;
        this.existeParametroHoraExtraToleranciaInicioHasta = true;
      }

      const parametroHoraExtraToleranciaFinDesde = data.find(
        (config) => config.codigo === 'HHEE_TOLERANCIA_FIN_DESDE'
      );

      if (parametroHoraExtraToleranciaFinDesde) {
        this.idParametroHoraExtraToleranciaFinDesde =
          parametroHoraExtraToleranciaFinDesde.idMaestroConfiguracion;
        this.valorParametroHoraExtraToleranciaFinDesde = Number(
          parametroHoraExtraToleranciaFinDesde.valor
        );
        this.descripcionParametroHoraExtraToleranciaFinDesde =
          parametroHoraExtraToleranciaFinDesde.descripcion;
        this.existeParametroHoraExtraToleranciaFinDesde = true;
      }

      const parametroHoraExtraToleranciaFinHasta = data.find(
        (config) => config.codigo === 'HHEE_TOLERANCIA_FIN_HASTA'
      );

      if (parametroHoraExtraToleranciaFinHasta) {
        this.idParametroHoraExtraToleranciaFinHasta =
          parametroHoraExtraToleranciaFinHasta.idMaestroConfiguracion;
        this.valorParametroHoraExtraToleranciaFinHasta = Number(
          parametroHoraExtraToleranciaFinHasta.valor
        );
        this.descripcionParametroHoraExtraToleranciaFinHasta =
          parametroHoraExtraToleranciaFinHasta.descripcion;
        this.existeParametroHoraExtraToleranciaFinHasta = true;
      }





      const parametroAbsentismoToleranciaInicioDesde = data.find(
        (config) => config.codigo === 'ABSN_TOLERANCIA_INICIO_DESDE'
      );

      if (parametroAbsentismoToleranciaInicioDesde) {
        this.idParametroAbsentismoToleranciaInicioDesde =
          parametroAbsentismoToleranciaInicioDesde.idMaestroConfiguracion;
        this.valorParametroAbsentismoToleranciaInicioDesde = Number(
          parametroAbsentismoToleranciaInicioDesde.valor
        );
        this.descripcionParametroAbsentismoToleranciaInicioDesde =
          parametroAbsentismoToleranciaInicioDesde.descripcion;
        this.existeParametroAbsentismoToleranciaInicioDesde = true;
      }

      const parametroAbsentismoToleranciaInicioHasta = data.find(
        (config) => config.codigo === 'ABSN_TOLERANCIA_INICIO_HASTA'
      );

      if (parametroAbsentismoToleranciaInicioHasta) {
        this.idParametroAbsentismoToleranciaInicioHasta =
          parametroAbsentismoToleranciaInicioHasta.idMaestroConfiguracion;
        this.valorParametroAbsentismoToleranciaInicioHasta = Number(
          parametroAbsentismoToleranciaInicioHasta.valor
        );
        this.descripcionParametroAbsentismoToleranciaInicioHasta =
          parametroAbsentismoToleranciaInicioHasta.descripcion;
        this.existeParametroAbsentismoToleranciaInicioHasta = true;
      }

      const parametroAbsentismoToleranciaFinDesde = data.find(
        (config) => config.codigo === 'ABSN_TOLERANCIA_FIN_DESDE'
      );

      if (parametroAbsentismoToleranciaFinDesde) {
        this.idParametroAbsentismoToleranciaFinDesde =
          parametroAbsentismoToleranciaFinDesde.idMaestroConfiguracion;
        this.valorParametroAbsentismoToleranciaFinDesde = Number(
          parametroAbsentismoToleranciaFinDesde.valor
        );
        this.descripcionParametroAbsentismoToleranciaFinDesde =
          parametroAbsentismoToleranciaFinDesde.descripcion;
        this.existeParametroAbsentismoToleranciaFinDesde = true;
      }

      const parametroAbsentismoToleranciaFinHasta = data.find(
        (config) => config.codigo === 'ABSN_TOLERANCIA_FIN_HASTA'
      );

      if (parametroAbsentismoToleranciaFinHasta) {
        this.idParametroAbsentismoToleranciaFinHasta =
          parametroAbsentismoToleranciaFinHasta.idMaestroConfiguracion;
        this.valorParametroAbsentismoToleranciaFinHasta = Number(
          parametroAbsentismoToleranciaFinHasta.valor
        );
        this.descripcionParametroAbsentismoToleranciaFinHasta =
          parametroAbsentismoToleranciaFinHasta.descripcion;
        this.existeParametroAbsentismoToleranciaFinHasta = true;
      }
    });

    // if (this.id === 0) {
    //   this.title = 'Nuevo Registro';
    // } else {
    //   this.title = 'Editar Registro';
    //   this.usuarioService.listarPorId(this.id).subscribe((result: any) => {
    //     const data = result.data;
    //     const rolesIds: number[] = data.roles.map((rol) => rol.idRol);
    //     this.form.patchValue({
    //       idUsuario: data.idUsuario,
    //       nombreCompleto: data.nombreCompleto,
    //       correoElectronico: data.correoElectronico,
    //       roles: rolesIds,
    //       // fechaDocumentoAutoriza: moment(data.fechaDocumentoAutoriza).toDate(),
    //     });
    //   });
    // }
  }

  async save(id: number, valor: number): Promise<void> {
    const entidad: ConfiguracionUpdateDto = {
      idMaestroConfiguracion: id,
      valor: '' + valor,
    };

    const confirm = await this.utilsService.confirm({
      message: '¿Está seguro en realizar la acción de actualización?',
    });
    if (confirm) {
      this.configuracionService.actualizar(entidad).subscribe((result: any) => {
        this.utilsService.success({
          message: 'La acción de actualización fue completada con éxito.',
        });
      });
    }
  }

  // formatDate(event: Event): void {
  //   applyDateFormatToInput(event);
  // }

  // async cancel(): Promise<void> {
  //   const confirm = await this.utilsService.confirm({
  //     message: '¿Está seguro en cancelar la acción?',
  //   });
  //   if (confirm) {
  //     this.router.navigate(['/usuario']);
  //   }
  // }

  inputOnlyNumber(event: Event): void {
    inputOnlyNumber(event);
  }
}
