import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { UtilsService } from '../../../../core/services/utils.service';
import { ProcesoService } from '../../../../core/services/proceso.service';
import { Proceso } from '../../../../core/interfaces/proceso';
import { MatDialog } from '@angular/material/dialog';
import { VerProcesoDetalleComponent } from '../ver-proceso-detalle/ver-proceso-detalle.component';
import { ReporteService } from '../../../../core/services/reporte.service';

@Component({
  selector: 'app-ver-proceso',
  templateUrl: './ver-proceso.component.html',
  styleUrl: './ver-proceso.component.css',
})
export class VerProcesoComponent implements OnInit {
  displayedColumns: string[] = [
    'numero',
    'fechaInicio',
    'fechaFin',
    'estado',
    'accion',
  ];

  isSmallScreen: boolean = false;
  dataSource: MatTableDataSource<Proceso>;
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
    private procesoService: ProcesoService,
    private reporteService: ReporteService,
    private dialog: MatDialog,
    private utilsService: UtilsService
  ) {}

  ngOnInit(): void {
    this.loadGrid();
  }

  loadGrid(): void {
    if (this.paginator != null) {
      this.pageIndex = this.paginator.pageIndex;
      this.pageSize = this.paginator.pageSize;
    }

    this.dataSource = new MatTableDataSource([]);
    this.procesoService
      .findProcessPaginado(this.pageIndex, this.pageSize)
      .subscribe((result: any) => {
        const data = result.data;
        this.dataSource = new MatTableDataSource(data.items);
        this.rowsCount = data.totalRegistros;
      });
  }

  refresh(): void {
    this.paginator.pageIndex = 0;
    this.paginator.pageSize = 20;
    this.loadGrid();
  }

  search(): void {
    this.loadGrid();
  }

  async navegarFinish(id: number) {
    const confirm = await this.utilsService.confirm({
      message: '¿Está seguro de finalizar el proceso?',
    });
    if (confirm) {
      this.procesoService.closeProcess(id).subscribe((result: any) => {
        this.loadGrid();
        this.utilsService.success({
          message: 'Proceso finalizado satisfactoriamente.',
        });
      });
    }
  }

  async navegarDownload(id: number) {
    const confirm = await this.utilsService.confirm({
      message: '¿Está seguro de descargar las observaciones del proceso?',
    });
    if (confirm) {
      this.reporteService.donwloadProcessObservations(id);
    }
  }

  async navegarDownloadResumeReport(id: number) {
    const confirm = await this.utilsService.confirm({
      message: '¿Está seguro de descargar el reporte resumido?',
    });
    if (confirm) {
      this.reporteService.donwloadProcessResumeReport(id);
    }
  }

  async navegarDownloadFullReport(id: number) {
    const confirm = await this.utilsService.confirm({
      message: '¿Está seguro de descargar el reporte detallado?',
    });
    if (confirm) {
      this.reporteService.donwloadProcessFullReport(id);
    }
  }

  navegarDetail(id: number) {
    this.loadDialog(id);
  }

  loadDialog(id: number): void {
    const dialogRef = this.dialog.open(VerProcesoDetalleComponent, {
      width: '900px',
      maxHeight: '90vh',
      disableClose: false,
    });
    dialogRef.afterOpened().subscribe(() => {
      const componentInstance = dialogRef.componentInstance;
      componentInstance.setData(id);
    });
  }
}
