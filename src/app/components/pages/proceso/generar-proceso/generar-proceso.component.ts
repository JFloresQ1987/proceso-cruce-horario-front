import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, AbstractControl } from '@angular/forms';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ProcesoService } from '../../../../core/services/proceso.service';
import { UploadService } from '../../../../core/services/upload.service';
import { UtilsService } from '../../../../core/services/utils.service';

export interface TableElement {
  item: number;
  step_code: string;
  step: string;
  fileName: string;
  totalProcesados: number;
  totalObservados: number;
}

export interface TableDetailElement {
  fileName: string;
  totalProcesados: string;
  totalObservados: string;
}

export interface SharePointElement {
  name: string;
  extension: string;
  creationDate: string;
  lastModified: string;
  sizeMB: string;
}

@Component({
  selector: 'app-generar-proceso',
  templateUrl: './generar-proceso.component.html',
  styleUrl: './generar-proceso.component.css',
})
export class GenerarProcesoComponent implements OnInit {
  displayedColumns: string[] = [
    'item',
    'step',
    'fileName',
    'totalProcesados',
    'totalObservados',
    'accion',
  ];
  resumen: TableElement[] = [];
  dataSource = new MatTableDataSource([]);

  displayedColumnsDetail: string[] = [
    'fileName',
    'totalProcesados',
    'totalObservados',
    'accion',
  ];
  dataSourceSecondCtrl = new MatTableDataSource([]);
  dataSourceThirdCtrl = new MatTableDataSource([]);
  dataSourceFourthCtrl = new MatTableDataSource([]);
  dataSourceFifthCtrl = new MatTableDataSource([]);

  displayedColumnsSharePoint: string[] = ['item', 'value'];
  dataSourceSharePoint: { item: string; value: string | number | boolean }[] =
    [];

  sharePointData: SharePointElement;

  existsProcessPending = false;
  isLinear = true;
  isEditable = false;
  isOptional = true;
  fileSecondCtrl!: File | null;
  fileThirdCtrl!: File | null;
  fileFourthCtrl!: File | null;
  fileFifthCtrl!: File | null;
  fileNameSecondCtrl: string = '';
  fileNameThirdCtrl: string = '';
  fileNameFourthCtrl: string = '';
  fileNameFifthCtrl: string = '';
  isCompletedSecondCtrl = false;
  isCompletedThirdCtrl = false;
  isCompletedFourthCtrl = false;
  isCompletedFifthCtrl = false;
  isOptionalFourthCtrl = false;
  isOptionalFifthCtrl = false;

  private _formBuilder = inject(FormBuilder);

  secondFormGroup = this._formBuilder.group({
    secondCtrl: [this.isCompletedSecondCtrl, [this.booleanRequiredTrue]],
  });
  thirdformgroup = this._formBuilder.group({
    thirdCtrl: [this.isCompletedThirdCtrl, [this.booleanRequiredTrue]],
  });
  fourthformgroup = this._formBuilder.group({
    fourthCtrl: [this.isCompletedFourthCtrl, [this.booleanRequiredTrue]],
    fourthCtrlAux: [!this.isCompletedFourthCtrl],
  });
  fifthformgroup = this._formBuilder.group({
    fifthCtrl: [this.isCompletedFifthCtrl, [this.booleanRequiredTrue]],
    fifthCtrlAux: [!this.isCompletedFifthCtrl],
  });

  constructor(
    private router: Router,
    private utilsService: UtilsService,
    private uploadService: UploadService,
    private procesoService: ProcesoService
  ) {}

  ngOnInit(): void {
    this.validProcess();
  }

  validProcess(): void {
    this.procesoService.findPending().subscribe((result) => {
      this.existsProcessPending = result.data;
    });
  }

  booleanRequiredTrue(control: AbstractControl) {
    return control.value === true ? null : { requiredTrue: true };
  }

  onFileSelected(step: string, event: Event): void {
    const input = event.target as HTMLInputElement;
    if (!input.files || input.files.length === 0) {
      return;
    }
    const file = input.files[0];
    // Validar que sea un PDF y que no supere los 10MB
    if (
      file.type !==
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    ) {
      this.utilsService.warning({
        message: 'Sólo se permiten archivos de Excel (.xlsx).',
      });
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      this.utilsService.warning({
        message: 'El tamaño máximo permitido es 10MB.',
      });
      return;
    }

    switch (step) {
      case 'StepSecondCtrl':
        this.fileSecondCtrl = file;
        this.fileNameSecondCtrl = file.name;
        break;
      case 'StepThirdCtrl':
        this.fileThirdCtrl = file;
        this.fileNameThirdCtrl = file.name;
        break;
      case 'StepFourthCtrl':
        this.fileFourthCtrl = file;
        this.fileNameFourthCtrl = file.name;
        break;
      case 'StepFifthCtrl':
        this.fileFifthCtrl = file;
        this.fileNameFifthCtrl = file.name;
        break;
    }
  }

  async save(step: string): Promise<void> {
    let type = 0;
    let file = null;
    switch (step) {
      case 'StepSecondCtrl':
        if (!this.fileSecondCtrl) {
          this.utilsService.warning({
            message: 'Debes seleccionar un archivo antes de continuar.',
          });
          return;
        }
        type = 1;
        file = this.fileSecondCtrl;
        break;
      case 'StepThirdCtrl':
        if (!this.fileThirdCtrl) {
          this.utilsService.warning({
            message: 'Debes seleccionar un archivo antes de continuar.',
          });
          return;
        }
        type = 2;
        file = this.fileThirdCtrl;
        break;
      case 'StepFourthCtrl':
        if (!this.fileFourthCtrl) {
          this.utilsService.warning({
            message: 'Debes seleccionar un archivo antes de continuar.',
          });
          return;
        }
        type = 3;
        file = this.fileFourthCtrl;
        break;
      case 'StepFifthCtrl':
        if (!this.fileFifthCtrl) {
          this.utilsService.warning({
            message: 'Debes seleccionar un archivo antes de continuar.',
          });
          return;
        }
        type = 4;
        file = this.fileFifthCtrl;
        break;
    }

    const confirm = await this.utilsService.confirm({
      message: '¿Está seguro en validar el archivo?',
    });
    if (confirm) {
      this.uploadService.uploadFile(type, file).subscribe((result: any) => {
        this.getTotales(step);
        switch (step) {
          case 'StepSecondCtrl':
            this.isCompletedSecondCtrl = true;
            this.secondFormGroup.patchValue({
              secondCtrl: this.isCompletedSecondCtrl,
            });
            break;
          case 'StepThirdCtrl':
            this.isCompletedThirdCtrl = true;
            this.thirdformgroup.patchValue({
              thirdCtrl: this.isCompletedThirdCtrl,
            });
            break;
          case 'StepFourthCtrl':
            this.isCompletedFourthCtrl = true;
            this.fourthformgroup.patchValue({
              fourthCtrl: this.isCompletedFourthCtrl,
            });
            break;
          case 'StepFifthCtrl':
            this.isCompletedFifthCtrl = true;
            this.fifthformgroup.patchValue({
              fifthCtrl: this.isCompletedFifthCtrl,
            });
            break;
        }
        this.utilsService.success({
          message: 'Archivo validado satisfactoriamente',
        });
      });
    }
  }

  getTotales(step: string) {
    let type = 0;
    switch (step) {
      case 'StepSecondCtrl':
        type = 1;
        break;
      case 'StepThirdCtrl':
        type = 2;
        break;
      case 'StepFourthCtrl':
        type = 3;
        break;
      case 'StepFifthCtrl':
        type = 4;
        break;
    }

    this.dataSource = new MatTableDataSource([]);
    this.procesoService.findDetailsByLoad(type).subscribe((result: any) => {
      let data = result.data;
      switch (step) {
        case 'StepSecondCtrl':
          data.step_code = 'StepSecondCtrl';
          data.step = 'Carga de Turnos';
          data.fileName = this.fileNameSecondCtrl;
          this.dataSourceSecondCtrl = new MatTableDataSource([data]);
          this.resumen.push(data);
          this.dataSource.data = this.resumen;
          break;
        case 'StepThirdCtrl':
          data.step_code = 'StepThirdCtrl';
          data.step = 'Carga de Marcaciones';
          data.fileName = this.fileNameThirdCtrl;
          this.dataSourceThirdCtrl = new MatTableDataSource([data]);
          this.resumen.push(data);
          this.dataSource.data = this.resumen;
          break;
        case 'StepFourthCtrl':
          data.step_code = 'StepFourthCtrl';
          data.step = 'Carga de Horas Extras';
          data.fileName = this.fileNameFourthCtrl;
          this.dataSourceFourthCtrl = new MatTableDataSource([data]);
          this.resumen.push(data);
          this.dataSource.data = this.resumen;
          break;
        case 'StepFifthCtrl':
          data.step_code = 'StepFifthCtrl';
          data.step = 'Carga de Absentismos';
          data.fileName = this.fileNameFifthCtrl;
          this.dataSourceFifthCtrl = new MatTableDataSource([data]);
          this.resumen.push(data);
          this.dataSource.data = this.resumen;
          break;
      }
    });
  }

  onCheckboxChange(step: string, event: MatCheckboxChange) {
    if (event.checked) {
      switch (step) {
        case 'StepFourthCtrl':
          this.isOptionalFourthCtrl = false;
          this.isCompletedFourthCtrl = false;
          this.fourthformgroup.patchValue({
            fourthCtrl: this.isCompletedFourthCtrl,
          });
          break;
        case 'StepFifthCtrl':
          this.isOptionalFifthCtrl = false;
          this.isCompletedFifthCtrl = false;
          this.fifthformgroup.patchValue({
            fifthCtrl: this.isCompletedFifthCtrl,
          });
          break;
      }
    } else {
      switch (step) {
        case 'StepFourthCtrl':
          this.isOptionalFourthCtrl = true;
          this.isCompletedFourthCtrl = true;
          this.fourthformgroup.patchValue({
            fourthCtrl: this.isCompletedFourthCtrl,
          });
          break;
        case 'StepFifthCtrl':
          this.isOptionalFifthCtrl = true;
          this.isCompletedFifthCtrl = true;
          this.fifthformgroup.patchValue({
            fifthCtrl: this.isCompletedFifthCtrl,
          });
          break;
      }
    }
  }

  async saveProcess(): Promise<void> {
    const confirm = await this.utilsService.confirm({
      message: '¿Está seguro de crear el proceso?',
    });
    if (confirm) {
      this.procesoService.saveProcess().subscribe((result: any) => {
        this.utilsService.success({
          message: 'Proceso creado con éxito.',
          action: () => {
            this.router.navigate(['/ver-proceso']);
          },
        });
      });
    }
  }

  async navegarDownload(step: string) {
    let type = 0;
    switch (step) {
      case 'StepSecondCtrl':
        type = 1;
        break;
      case 'StepThirdCtrl':
        type = 2;
        break;
      case 'StepFourthCtrl':
        type = 3;
        break;
      case 'StepFifthCtrl':
        type = 4;
        break;
    }

    const confirm = await this.utilsService.confirm({
      message: '¿Está seguro de descargar las observaciones del archivo?',
    });
    if (confirm) {
      this.procesoService.donwloadLoadObservations(type);
    }
  }
}
