import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ProcesoDetalle } from '../../../../core/interfaces/proceso-detalle';
import { ProcesoService } from '../../../../core/services/proceso.service';

@Component({
  selector: 'app-ver-proceso-detalle',
  templateUrl: './ver-proceso-detalle.component.html',
  styleUrl: './ver-proceso-detalle.component.css',
})
export class VerProcesoDetalleComponent {
  displayedColumns: string[] = [
    'nro',
    'etapa',
    'fechaInicio',
    'fechaFin',
    'estado',
  ];
  dataSource: MatTableDataSource<ProcesoDetalle>;
  id: number;
  isSmallScreen: boolean = false;

  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;

  constructor(private procesoService: ProcesoService) {}

  setData(id: number) {
    this.id = id;
    this.loadGrid();
  }

  loadGrid() {
    this.dataSource = new MatTableDataSource([]);
    this.procesoService
      .findDetailsByProcess(this.id)
      .subscribe((result: any) => {
        const data = result.data;
        this.dataSource = new MatTableDataSource(data);
      });
  }
}
