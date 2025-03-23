import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { EstadoEnum } from '../../../../core/util/enum';
import { ProcesoDetalle } from '../../../../core/interfaces/proceso-detalle';
import { ProcesoService } from '../../../../core/services/proceso.service';

@Component({
  selector: 'app-ver-proceso-detalle',
  templateUrl: './ver-proceso-detalle.component.html',
  styleUrl: './ver-proceso-detalle.component.css',
})
export class VerProcesoDetalleComponent /*implements OnInit*/ {
  displayedColumns: string[] = [
    'nro',
    'etapa',
    'fechaInicio',
    'fechaFin',
    'estado',
  ];
  dataSource: MatTableDataSource<ProcesoDetalle>;
  id: number;
  // idEspecialidad: string = '';
  // descripcion: string = '';
  // rowsCount = 0;
  // pageIndex: number = 0;
  // pageSize: number = 10;
  isSmallScreen: boolean = false;

  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;

  constructor(
    // private dialogRef: MatDialogRef<VerProcesoDetalleComponent>,
    // private especialidadService: EspecialidadService
    private procesoService: ProcesoService
  ) {}

  // ngOnInit() {
  //   this.loadGrid();
  // }

  setData(id: number) {
    this.id = id;
    this.loadGrid();
  }

  loadGrid() {
    // if (this.paginator != null) {
    //   this.pageIndex = this.paginator.pageIndex;
    //   this.pageSize = this.paginator.pageSize;
    // }

    // const params: Especialidad = {
    //   idEspecialidad: this.idEspecialidad,
    //   descripcion: this.descripcion,
    //   estado: EstadoEnum.ACTIVO,
    //   page: this.pageIndex,
    //   size: this.pageSize,
    // };

    this.dataSource = new MatTableDataSource([]);
    this.procesoService
      .findDetailsByProcess(this.id)
      .subscribe((result: any) => {
        // console.log(result);
        const data = result.data;
        this.dataSource = new MatTableDataSource(data);
        // this.rowsCount = data.totalElements;
      });
  }

  // selectRow(row: Especialidad) {
  //   this.dialogRef.close(row);
  // }

  // getEventData() {
  //   this.loadGrid();
  // }

  // search() {
  //   this.loadGrid();
  // }

  // clear(): void {
  //   this.paginator.pageIndex = 0;
  //   this.paginator.pageSize = 10;
  //   this.idEspecialidad = '';
  //   this.descripcion = '';
  //   this.loadGrid();
  // }

  // inputOnlyNumber(event: Event): void {
  //   inputOnlyNumber(event);
  // }
}
