import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { NavigationState } from '../../../../core/interfaces/navigation-state';
import { UsuarioDto } from '../../../../core/interfaces/usuario-dto';
import { UsuarioFilterDto } from '../../../../core/interfaces/usuario-filter-dto';
import { UsuarioResetDto } from '../../../../core/interfaces/usuario-reset-dto';
import { UsuarioStatusDto } from '../../../../core/interfaces/usuario-status-dto';
import { UsuarioService } from '../../../../core/services/usuario.service';
import { UtilsService } from '../../../../core/services/utils.service';
import { EstadoEnum } from '../../../../core/util/enum';
import { UsuarioResetFormComponent } from '../../seguridad/usuario/usuario-reset-form/usuario-reset-form.component';
import { TipoAbsentismoService } from '../../../../core/services/tipo-absentismo.service';
import { TipoAbsentismoFilterDto } from '../../../../core/interfaces/tipo-absentismo-filter-dto';
import { TipoAbsentismoStatusDto } from '../../../../core/interfaces/tipo-absentismo-status-dto';
import { AbsentismoFormComponent } from './absentismo-form/absentismo-form.component';

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
  ];

  isSmallScreen: boolean = false;
  dataSource: MatTableDataSource<UsuarioDto>;
  estado: string = EstadoEnum.ACTIVO;
  descripcion: string = '';
  // nombreCompleto: string = '';
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
  ) {
    // this.router.events.subscribe((event) => {
    //   if (event instanceof NavigationEnd && event.url === '/usuario') {
    //     const state = this.router.getCurrentNavigation()?.extras
    //       .state as NavigationState;
    //     if (state?.message) {
    //       this.loadGrid();
    //       this.utilsService.success({
    //         message: state.message,
    //       });
    //     }
    //   }
    // });
  }

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
      esVigente: this.estado,
      // nombreCompleto: this.nombreCompleto,
      // esVigente: this.estado,
      page: this.pageIndex + 1,
      size: this.pageSize,
    };

    this.dataSource = new MatTableDataSource([]);
    this.tipoAbsentismoService
      .listarPaginado(params)
      .subscribe((result: any) => {
        // console.log(result);
        const data = result;
        // const data = result.data;
        // this.dataSource = new MatTableDataSource(data.content);
        this.dataSource = new MatTableDataSource(data.items);
        this.rowsCount = data.totalRegistros;
      });
  }

  clear(): void {
    this.paginator.pageIndex = 0;
    this.paginator.pageSize = 20;
    this.descripcion = '';
    this.estado = EstadoEnum.ACTIVO;
    this.loadGrid();
  }

  search(): void {
    this.loadGrid();
  }

  navegarNuevo(): void {
    // this.router.navigate(['/usuario/nuevo']);
    this.loadDialog();
  }

  // navegarEditar(id: number): void {
  //   this.router.navigate(['/usuario/editar'], {
  //     state: { id },
  //   });
  // }

  // navegarResetear(id: number): void {
  //   // this.router.navigate(['/usuario/editar'], {
  //   //   state: { id },
  //   // });
  //   this.loadDialog(id);
  // }

  loadDialog(): void {
    const dialogRef = this.dialog.open(AbsentismoFormComponent, {
      width: '400px',
      maxHeight: '90vh',
      disableClose: false,
    });
    dialogRef.afterOpened().subscribe(() => {
      const componentInstance = dialogRef.componentInstance;
      // const numeroDocumento = this.form.value['numeroDocumento'];
      // componentInstance.setData(numeroDocumento);
      // const componentInstance = dialogRefProfesional.componentInstance;
      // componentInstance.setData(id);
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        // console.log(result)
        // this.expedientes.push(result);
        // this.dataSourceExpedientes.data = this.expedientes;
        // const entidad: UsuarioResetDto = {
        //   idUsuario: id,
        //   clave: result,
        // };
        this.tipoAbsentismoService.guardar(result).subscribe((result: any) => {
          this.loadGrid();
          this.utilsService.success({
            message: 'La acción de creación fue completada con éxito.',
          });
        });
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
      message: '¿Está seguro en realizar la acción de alta/baja?',
    });
    if (confirm) {
      this.tipoAbsentismoService
        .actualizar(entidad)
        .subscribe((result: any) => {
          this.loadGrid();
          this.utilsService.success({
            message: 'La acción de alta/baja fue completada con éxito.',
          });
        });
    }
  }

  // checkChildren(): boolean {
  //   return this.route.children.length != 0;
  // }
}
