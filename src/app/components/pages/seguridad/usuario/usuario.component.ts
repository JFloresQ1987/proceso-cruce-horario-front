import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { NavigationState } from '../../../../core/interfaces/navigation-state';
import { UtilsService } from '../../../../core/services/utils.service';
import { EstadoEnum } from '../../../../core/util/enum';
import { Usuario } from '../../../../core/interfaces/usuario';
import { UsuarioService } from '../../../../core/services/usuario.service';
import { UsuarioStatusDto } from '../../../../core/interfaces/usuario-status-dto';
import { MatDialog } from '@angular/material/dialog';
import { UsuarioResetFormComponent } from './usuario-reset-form/usuario-reset-form.component';
import { UsuarioResetDto } from '../../../../core/interfaces/usuario-reset-dto';
import { UsuarioDto } from '../../../../core/interfaces/usuario-dto';
import { UsuarioFilterDto } from '../../../../core/interfaces/usuario-filter-dto';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrl: './usuario.component.css',
})
export class UsuarioComponent implements OnInit {
  displayedColumns: string[] = [
    'numero',
    'nombreCompleto',
    'correoElectronico',
    'fechaRegistro',
    'estado',
    'accion',
  ];

  isSmallScreen: boolean = false;
  dataSource: MatTableDataSource<UsuarioDto>;
  estado: string = EstadoEnum.ACTIVO;
  // descripcion: string = '';
  nombreCompleto: string = '';
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
    private usuarioService: UsuarioService,
    private utilsService: UtilsService,
    private dialog: MatDialog
  ) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd && event.url === '/usuario') {
        const state = this.router.getCurrentNavigation()?.extras
          .state as NavigationState;
        if (state?.message) {
          this.loadGrid();
          this.utilsService.success({
            message: state.message,
          });
        }
      }
    });
  }

  ngOnInit(): void {
    this.loadGrid();
  }

  loadGrid(): void {
    if (this.paginator != null) {
      this.pageIndex = this.paginator.pageIndex;
      this.pageSize = this.paginator.pageSize;
    }

    const params: UsuarioFilterDto = {
      // descripcion: this.descripcion,
      // estado: this.estado,
      nombreCompleto: this.nombreCompleto,
      esVigente: this.estado,
      page: this.pageIndex + 1,
      size: this.pageSize,
    };

    this.dataSource = new MatTableDataSource([]);
    this.usuarioService.listarPaginado(params).subscribe((result: any) => {
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
    this.nombreCompleto = '';
    this.estado = EstadoEnum.ACTIVO;
    this.loadGrid();
  }

  search(): void {
    this.loadGrid();
  }

  navegarNuevo(): void {
    this.router.navigate(['/usuario/nuevo']);
  }

  navegarEditar(id: number): void {
    this.router.navigate(['/usuario/editar'], {
      state: { id },
    });
  }

  navegarResetear(id: number): void {
    // this.router.navigate(['/usuario/editar'], {
    //   state: { id },
    // });
    this.loadDialog(id);
  }

  loadDialog(id: number): void {
    const dialogRef = this.dialog.open(UsuarioResetFormComponent, {
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
        const entidad: UsuarioResetDto = {
          idUsuario: id,
          clave: result,
        };

        this.usuarioService.resetearClave(entidad).subscribe((result: any) => {
          this.loadGrid();
          this.utilsService.success({
            message: 'La acción de reseteo fue completada con éxito.',
          });
        });
      }
    });
  }

  // loadDialogEspecialidad(): void {
  //   const dialogRef = this.dialog.open(ProfesionalEspecialidadFormComponent, {
  //     width: '900px',
  //     maxHeight: '90vh',
  //     disableClose: false,
  //   });
  //   dialogRef.afterClosed().subscribe((result) => {
  //     if (result) {
  //       const existe = this.especialidades.some(
  //         (item) => item.idEspecialidad === result.idEspecialidad
  //       );
  //       if (existe) {
  //         this.utilsService.warning({
  //           message: `La especialidad con Código ${result.idEspecialidad} ya fue agregado.`,
  //         });
  //         return;
  //       }
  //       this.especialidades.push(result);
  //       this.dataSourceEspecialidades.data = this.especialidades;
  //     }
  //   });
  // }

  async navegarAltaBaja(id: number, esVigente: boolean): Promise<void> {
    const entidad: UsuarioStatusDto = {
      idUsuario: id,
      esVigente: esVigente,
    };

    const confirm = await this.utilsService.confirm({
      message: '¿Está seguro en realizar la acción de alta/baja?',
    });
    if (confirm) {
      this.usuarioService
        .actualizarVigenciaUsuario(entidad)
        .subscribe((result: any) => {
          this.loadGrid();
          this.utilsService.success({
            message: 'La acción de alta/baja fue completada con éxito.',
          });
          // this.router.navigate(['/usuario'], {
          //   state: {
          //     message: 'La acción de creación fue completada con éxito.',
          //   },
          // });
        });
    }
  }

  checkChildren(): boolean {
    return this.route.children.length != 0;
  }
}
