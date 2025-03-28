import { Component, OnInit } from '@angular/core';
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

  constructor(
    private utilsService: UtilsService,
    private configuracionService: ConfiguracionService
  ) {}

  ngOnInit(): void {
    this.loadInitial();
  }

  loadInitial(): void {
    this.configuracionService.listar().subscribe((result: any) => {
      const data = result.data;
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
  }

  async save(id: number, valor: number): Promise<void> {
    const entidad: ConfiguracionUpdateDto = {
      idMaestroConfiguracion: id,
      valor: '' + valor,
    };

    const confirm = await this.utilsService.confirm({
      message: '¿Está seguro de actualizarlo?',
    });
    if (confirm) {
      this.configuracionService.actualizar(entidad).subscribe((result: any) => {
        this.utilsService.success({
          message: 'La actualización fue completada con éxito.',
        });
      });
    }
  }

  inputOnlyNumber(event: Event): void {
    inputOnlyNumber(event);
  }
}
