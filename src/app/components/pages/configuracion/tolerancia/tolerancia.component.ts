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
  existeParametroToleranciaInicioDesde: boolean = false;
  existeParametroToleranciaInicioHasta: boolean = false;
  existeParametroToleranciaFinDesde: boolean = false;
  existeParametroToleranciaFinHasta: boolean = false;

  idParametroToleranciaInicioDesde: number = 0;
  idParametroToleranciaInicioHasta: number = 0;
  idParametroToleranciaFinDesde: number = 0;
  idParametroToleranciaFinHasta: number = 0;

  descripcionParametroToleranciaInicioDesde: string = '';
  descripcionParametroToleranciaInicioHasta: string = '';
  descripcionParametroToleranciaFinDesde: string = '';
  descripcionParametroToleranciaFinHasta: string = '';

  valorParametroToleranciaInicioDesde: number = 0;
  valorParametroToleranciaInicioHasta: number = 0;
  valorParametroToleranciaFinDesde: number = 0;
  valorParametroToleranciaFinHasta: number = 0;

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
      const parametroToleranciaInicioDesde = data.find(
        (config) => config.codigo === 'TOLERANCIA_INICIO_DESDE'
      );

      if (parametroToleranciaInicioDesde) {
        this.idParametroToleranciaInicioDesde =
          parametroToleranciaInicioDesde.idMaestroConfiguracion;
        this.valorParametroToleranciaInicioDesde = Number(
          parametroToleranciaInicioDesde.valor
        );
        this.descripcionParametroToleranciaInicioDesde =
          parametroToleranciaInicioDesde.descripcion;
        this.existeParametroToleranciaInicioDesde = true;
      }

      const parametroToleranciaInicioHasta = data.find(
        (config) => config.codigo === 'TOLERANCIA_INICIO_HASTA'
      );

      if (parametroToleranciaInicioHasta) {
        this.idParametroToleranciaInicioHasta =
          parametroToleranciaInicioHasta.idMaestroConfiguracion;
        this.valorParametroToleranciaInicioHasta = Number(
          parametroToleranciaInicioHasta.valor
        );
        this.descripcionParametroToleranciaInicioHasta =
          parametroToleranciaInicioHasta.descripcion;
        this.existeParametroToleranciaInicioHasta = true;
      }

      const parametroToleranciaFinDesde = data.find(
        (config) => config.codigo === 'TOLERANCIA_FIN_DESDE'
      );

      if (parametroToleranciaFinDesde) {
        this.idParametroToleranciaFinDesde =
          parametroToleranciaFinDesde.idMaestroConfiguracion;
        this.valorParametroToleranciaFinDesde = Number(
          parametroToleranciaFinDesde.valor
        );
        this.descripcionParametroToleranciaFinDesde =
          parametroToleranciaFinDesde.descripcion;
        this.existeParametroToleranciaFinDesde = true;
      }

      const parametroToleranciaFinHasta = data.find(
        (config) => config.codigo === 'TOLERANCIA_FIN_HASTA'
      );

      if (parametroToleranciaFinHasta) {
        this.idParametroToleranciaFinHasta =
          parametroToleranciaFinHasta.idMaestroConfiguracion;
        this.valorParametroToleranciaFinHasta = Number(
          parametroToleranciaFinHasta.valor
        );
        this.descripcionParametroToleranciaFinHasta =
          parametroToleranciaFinHasta.descripcion;
        this.existeParametroToleranciaFinHasta = true;
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
