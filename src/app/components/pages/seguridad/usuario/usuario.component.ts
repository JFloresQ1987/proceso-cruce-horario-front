import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { NavigationState } from '../../../../core/interfaces/navigation-state';
import { UtilsService } from '../../../../core/services/utils.service';
import { EstadoEnum } from '../../../../core/util/enum';
import { Usuario } from '../../../../core/interfaces/usuario';
import {
  PaginacionResponse,
  UsuarioDto,
  UsuarioFilterDto,
  UsuarioService,
} from '../../../../core/services/usuario.service';

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
    private utilsService: UtilsService
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

  navegarBaja(id: number): void {
    // this.router.navigate(['/usuario/baja'], {
    //   state: { id },
    // });
  }

  checkChildren(): boolean {
    return this.route.children.length != 0;
  }
}
