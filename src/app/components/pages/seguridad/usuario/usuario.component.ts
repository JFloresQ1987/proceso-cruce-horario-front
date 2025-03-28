import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { NavigationState } from '../../../../core/interfaces/navigation-state';
import { UtilsService } from '../../../../core/services/utils.service';
import { EstadoEnum } from '../../../../core/util/enum';
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
      nombreCompleto: this.nombreCompleto,
      esVigente: this.estado,
      page: this.pageIndex + 1,
      size: this.pageSize,
    };

    this.dataSource = new MatTableDataSource([]);
    this.usuarioService.listarPaginado(params).subscribe((result: any) => {
      const data = result.data;
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
    this.loadDialog(id);
  }

  loadDialog(id: number): void {
    const dialogRef = this.dialog.open(UsuarioResetFormComponent, {
      width: '400px',
      maxHeight: '90vh',
      disableClose: false,
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        const entidad: UsuarioResetDto = {
          idUsuario: id,
          clave: result,
        };

        this.usuarioService.resetearClave(entidad).subscribe((result: any) => {
          this.loadGrid();
          this.utilsService.success({
            message:
              'La acción de reseteo de clave de usuario fue completada con éxito.',
          });
        });
      }
    });
  }

  async navegarAltaBaja(id: number, esVigente: boolean): Promise<void> {
    const entidad: UsuarioStatusDto = {
      idUsuario: id,
      esVigente: esVigente,
    };

    const confirm = await this.utilsService.confirm({
      message: esVigente
        ? '¿Está seguro en dar de alta al usuario?'
        : '¿Está seguro en dar de baja al usuario?',
    });
    if (confirm) {
      this.usuarioService
        .actualizarVigenciaUsuario(entidad)
        .subscribe((result: any) => {
          this.loadGrid();
          this.utilsService.success({
            message: esVigente
              ? 'La acción de alta fue completada con éxito.'
              : 'La acción de baja fue completada con éxito.',
          });
        });
    }
  }

  checkChildren(): boolean {
    return this.route.children.length != 0;
  }
}
