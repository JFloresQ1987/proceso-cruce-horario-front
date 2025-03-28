import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router, ActivatedRoute } from '@angular/router';
import { UtilsService } from '../../../../core/services/utils.service';
import { TipoAbsentismoService } from '../../../../core/services/tipo-absentismo.service';
import { TipoAbsentismoFilterDto } from '../../../../core/interfaces/tipo-absentismo-filter-dto';
import { TipoAbsentismoStatusDto } from '../../../../core/interfaces/tipo-absentismo-status-dto';
import { AbsentismoFormComponent } from './absentismo-form/absentismo-form.component';
import { TipoAbsentismoUpdateDto } from '../../../../core/interfaces/tipo-absentismo-update-dto';
import { TipoAbsentismoDto } from '../../../../core/interfaces/tipo-absentismo-dto';

@Component({
  selector: 'app-absentismo',
  templateUrl: './absentismo.component.html',
  styleUrl: './absentismo.component.css',
})
export class AbsentismoComponent implements OnInit {
  displayedColumns: string[] = [
    'numero',
    'codigo',
    'descripcion',
    'perteneceGrupo1',
    'perteneceGrupo2',
    'perteneceGrupo3',
    'estado',
    'accion',
  ];

  isSmallScreen: boolean = false;
  dataSource: MatTableDataSource<TipoAbsentismoDto>;
  grupoTipoAbsentismo: string = '';
  descripcion: string = '';
  rowsCount: number = 0;
  pageIndex: number = 0;
  pageSize: number = 20;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  @HostListener('window:resize', [])
  checkScreenSize(): void {
    this.isSmallScreen = window.innerWidth < 768;
  }

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private tipoAbsentismoService: TipoAbsentismoService,
    private utilsService: UtilsService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.loadGrid();
  }

  loadGrid(): void {
    if (this.paginator != null) {
      this.pageIndex = this.paginator.pageIndex;
      this.pageSize = this.paginator.pageSize;
    }

    const params: TipoAbsentismoFilterDto = {
      descripcion: this.descripcion,
      grupo: this.grupoTipoAbsentismo,
      page: this.pageIndex + 1,
      size: this.pageSize,
    };

    this.dataSource = new MatTableDataSource([]);
    this.tipoAbsentismoService
      .listarPaginado(params)
      .subscribe((result: any) => {
        const data = result.data;
        this.dataSource = new MatTableDataSource(data.items);
        this.rowsCount = data.totalRegistros;
      });
  }

  clear(): void {
    this.paginator.pageIndex = 0;
    this.paginator.pageSize = 20;
    this.descripcion = '';
    this.grupoTipoAbsentismo = '';
    this.loadGrid();
  }

  search(): void {
    this.loadGrid();
  }

  navegarNuevo(): void {
    const params: TipoAbsentismoUpdateDto = {
      idMaestroTipoAbsentismo: 0,
      codigo: 0,
    };
    this.loadDialog(params);
  }

  loadDialog(dto: TipoAbsentismoUpdateDto): void {
    const dialogRef = this.dialog.open(AbsentismoFormComponent, {
      width: '400px',
      maxHeight: '90vh',
      disableClose: false,
    });
    dialogRef.afterOpened().subscribe(() => {
      const componentInstance = dialogRef.componentInstance;
      componentInstance.setData(dto);
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        const data = result;
        if (data.idMaestroTipoAbsentismo == 0) {
          this.tipoAbsentismoService.guardar(data).subscribe((result: any) => {
            this.loadGrid();
            this.utilsService.success({
              message: 'El registro fue completado con éxito.',
            });
          });
        } else {
          this.tipoAbsentismoService
            .actualizar(data)
            .subscribe((result: any) => {
              this.loadGrid();
              this.utilsService.success({
                message: 'La actualización fue completada con éxito.',
              });
            });
        }
      }
    });
  }

  async navegarAltaBaja(
    id: number,
    grupo: number,
    estado: boolean
  ): Promise<void> {
    const entidad: TipoAbsentismoStatusDto = {
      idMaestroTipoAbsentismo: id,
      grupo: grupo,
      estado: estado,
    };

    const confirm = await this.utilsService.confirm({
      message: estado
        ? '¿Está seguro de agregarlo al grupo?'
        : '¿Está seguro de quitarlo al grupo?',
    });
    if (confirm) {
      this.tipoAbsentismoService
        .actualizarVigenciaGrupo(entidad)
        .subscribe((result: any) => {
          this.loadGrid();
          this.utilsService.success({
            message: estado
              ? 'Se agregó al grupo con éxito.'
              : 'Se quitó del grupo con éxito.',
          });
        });
    }
  }

  navegarEditar(element: TipoAbsentismoUpdateDto): void {
    const params: TipoAbsentismoUpdateDto = {
      idMaestroTipoAbsentismo: element.idMaestroTipoAbsentismo,
      codigo: Number(element.codigo),
      descripcion: element.descripcion,
    };
    this.loadDialog(params);
  }
}
