import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { NavigationState } from '../../../../core/interfaces/navigation-state';
import { UtilsService } from '../../../../core/services/utils.service';
import { EstadoEnum } from '../../../../core/util/enum';
import { ProcesoService } from '../../../../core/services/proceso.service';
import { Proceso } from '../../../../core/interfaces/proceso';
import { MatDialog } from '@angular/material/dialog';
import { VerProcesoDetalleComponent } from '../ver-proceso-detalle/ver-proceso-detalle.component';

@Component({
  selector: 'app-ver-proceso',
  templateUrl: './ver-proceso.component.html',
  styleUrl: './ver-proceso.component.css',
})
export class VerProcesoComponent implements OnInit {
  displayedColumns: string[] = [
    'numero',
    // 'codigo',
    // 'descripcion',
    // 'documentoAutoriza',
    // 'fechaDocumentoAutoriza',
    // 'estado',
    'fechaInicio',
    'fechaFin',
    'estado',
    'accion',
  ];

  isSmallScreen: boolean = false;
  dataSource: MatTableDataSource<Proceso>;
  // estado: string = EstadoEnum.ACTIVO;
  // descripcion: string = '';
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
    private procesoService: ProcesoService,
    private dialog: MatDialog,
    private utilsService: UtilsService
  ) {
    // this.router.events.subscribe((event) => {
    //   if (event instanceof NavigationEnd && event.url === '/especialidad') {
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

    // const params: Especialidad = {
    //   descripcion: this.descripcion,
    //   estado: this.estado,
    //   page: this.pageIndex,
    //   size: this.pageSize,
    // };

    this.dataSource = new MatTableDataSource([]);
    this.procesoService
      .findProcessPaginado(this.pageIndex, this.pageSize)
      .subscribe((result: any) => {
        const data = result;
        // this.dataSource = new MatTableDataSource(data.content);
        // this.rowsCount = data.totalElements;
        this.dataSource = new MatTableDataSource(data.items);
        this.rowsCount = data.totalRegistros;
      });
  }

  refresh(): void {
    this.paginator.pageIndex = 0;
    this.paginator.pageSize = 20;
    // this.descripcion = '';
    // this.estado = EstadoEnum.ACTIVO;
    this.loadGrid();
  }

  // clear(): void {
  //   this.paginator.pageIndex = 0;
  //   this.paginator.pageSize = 20;
  //   // this.descripcion = '';
  //   // this.estado = EstadoEnum.ACTIVO;
  //   this.loadGrid();
  // }

  search(): void {
    this.loadGrid();
  }

  // navegarNuevo(): void {
  //   this.router.navigate(['/especialidad/nuevo']);
  // }

  async navegarFinish(id: number) {
    // this.router.navigate(['/especialidad/editar'], {
    //   state: { id },
    // });

    const confirm = await this.utilsService.confirm({
      message: '¿Está seguro de finalizar el proceso?',
    });
    if (confirm) {
      this.procesoService.closeProcess(id).subscribe((result: any) => {
        // console.log(result);
        this.loadGrid();
        // this.dialogRef.close(entidad);
        this.utilsService.success({
          message: 'Proceso finalizado satisfactoriamente.',
        });
      });
      // this.procesoService.closeProcess(id);
    }

    // this.procesoService.closeProcess(id).subscribe((result: any) => {
    //   // console.log(result);
    //   this.loadGrid();
    //   // this.dialogRef.close(entidad);
    //   this.utilsService.success({
    //     message: 'Proceso terminado satisfactoriamente.',
    //   });
    // });
    // // this.procesoService.closeProcess(id);
  }

  async navegarDownload(id: number) {
    // console.log(item);
    // item.idIpress = this.idIpress;
    // this.procesoService.donwloadProcessObservations(id);

    const confirm = await this.utilsService.confirm({
      message: '¿Está seguro de descargar las observaciones del proceso?',
    });
    if (confirm) {
      this.procesoService.donwloadProcessObservations(id);
      // this.procesoService.saveProcess().subscribe((result: any) => {
      //   console.log(result);

      //   // this.dialogRef.close(entidad);
      //   this.utilsService.success({
      //     message: 'Proceso de cruce de horario iniciado.',
      //     action: () => {
      //       this.router.navigate(['/ver-proceso']);
      //     },
      //   });
      // });
    }
  }

  async navegarDownloadResumeReport(id: number) {
    const confirm = await this.utilsService.confirm({
      message: '¿Está seguro de descargar el reporte resumido?',
    });
    if (confirm) {
      this.procesoService.donwloadProcessResumeReport(id);
    }
  }

  async navegarDownloadFullReport(id: number) {
    const confirm = await this.utilsService.confirm({
      message: '¿Está seguro de descargar el reporte detallado?',
    });
    if (confirm) {
      this.procesoService.donwloadProcessFullReport(id);
    }
  }

  navegarDetail(id: number) {
    this.loadDialog(id);
  }

  // addDocumento(): void {
  //   this.loadDialogDocumento();
  // }

  loadDialog(id: number): void {
    const dialogRef = this.dialog.open(VerProcesoDetalleComponent, {
      width: '900px',
      maxHeight: '90vh',
      disableClose: false,
    });
    dialogRef.afterOpened().subscribe(() => {
      const componentInstance = dialogRef.componentInstance;
      // const numeroDocumento = this.form.value['numeroDocumento'];
      // componentInstance.setData(numeroDocumento);
      // const componentInstance = dialogRefProfesional.componentInstance;
      componentInstance.setData(id);
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        // this.expedientes.push(result);
        // this.dataSourceExpedientes.data = this.expedientes;
      }
    });
  }

  // navegarBaja(id: string): void {
  //   this.router.navigate(['/especialidad/baja'], {
  //     state: { id },
  //   });
  // }

  // checkChildren(): boolean {
  //   return this.route.children.length != 0;
  // }
}
