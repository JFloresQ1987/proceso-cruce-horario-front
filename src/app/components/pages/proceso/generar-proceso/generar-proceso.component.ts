import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, AbstractControl } from '@angular/forms';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ProcesoService } from '../../../../core/services/proceso.service';
import { SharePointService } from '../../../../core/services/sharepoint.service';
import { UploadService } from '../../../../core/services/upload.service';
import { UtilsService } from '../../../../core/services/utils.service';

// export interface TableElement {
//   item: number;
//   step: string;
//   fileName: string;
//   condition: string;
//   status: string;
// }

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
  // displayedColumns: string[] = [
  //   'item',
  //   'step',
  //   'fileName',
  //   'condition',
  //   'status',
  // ];
  displayedColumns: string[] = [
    'item',
    'step',
    'fileName',
    'totalProcesados',
    'totalObservados',
    'accion',
  ];
  // dataSource = ELEMENT_DATA;
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
  // fileFirstCtrl!: File | null;
  fileSecondCtrl!: File | null;
  fileThirdCtrl!: File | null;
  fileFourthCtrl!: File | null;
  fileFifthCtrl!: File | null;
  // fileNameFirstCtrl: string = '';
  fileNameSecondCtrl: string = '';
  fileNameThirdCtrl: string = '';
  fileNameFourthCtrl: string = '';
  fileNameFifthCtrl: string = '';
  // isCompletedFirstCtrl = false;
  isCompletedSecondCtrl = false;
  isCompletedThirdCtrl = false;
  isCompletedFourthCtrl = false;
  isCompletedFifthCtrl = false;
  // isOptionalFirstCtrl = false;
  isOptionalFourthCtrl = false;
  isOptionalFifthCtrl = false;

  private _formBuilder = inject(FormBuilder);

  // // firstFormGroup = this._formBuilder.group({
  // //   firstCtrl: ['', Validators.required],
  // // });
  // firstFormGroup = this._formBuilder.group({
  //   firstCtrl: [this.isCompletedFirstCtrl, [this.booleanRequiredTrue]],
  //   firstCtrlAux: [!this.isCompletedFirstCtrl],
  // });
  // // secondFormGroup = this._formBuilder.group({
  // //   secondCtrl: ['', Validators.required],
  // // });
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
  // thirdformgroup = this._formBuilder.group({
  //   thirdCtrl: ['', Validators.required],
  // });
  // fourthformgroup = this._formBuilder.group({
  //   fourthCtrl: ['', Validators.required],
  // });
  // fifthformgroup = this._formBuilder.group({
  //   fifthCtrl: ['', Validators.required],
  // });

  constructor(
    // public dialogRef: MatDialogRef<ProfesionalEspecialidadFormComponent>,
    private router: Router,
    private utilsService: UtilsService,
    private sharePointService: SharePointService,
    private uploadService: UploadService,
    private procesoService: ProcesoService
  ) {}

  ngOnInit(): void {
    this.validProcess();
    // this.loadInitial();
  }

  validProcess(): void {
    this.procesoService.findPending().subscribe((result) => {
      // console.log(result);
      // const data = result.data;
      this.existsProcessPending = result.data;
    });
  }

  // loadInitial(): void {
  //   this.sharePointService
  //     .getFileInfo()
  //     // .pipe(
  //     //   map((result: any) =>
  //     //     Array.isArray(result)
  //     //       ? result.filter((item) => item.estado === EstadoEnum.ACTIVO)
  //     //       : []
  //     //   ),
  //     //   catchError((error) => {
  //     //     this.utilsService.error();
  //     //     return of([]);
  //     //   })
  //     // )
  //     .subscribe((result) => {
  //       // console.log('data de sharepoint');
  //       // console.log(data);

  //       //TODO: validar cuando archivo no existe
  //       const data = result.data;
  //       // this.sharePointData = data;

  //       // this.dataSourceSharePoint = Object.entries(data).map(([key, value]) => ({
  //       //   item: key,
  //       //   value: value
  //       // }));

  //       const mapping: Record<string, string> = {
  //         name: 'Nombre del Archivo',
  //         extension: 'Extensión',
  //         sizeMB: 'Tamaño (MB)',
  //         creationDate: 'Fecha de Creación',
  //         lastModified: 'Última Modificación',
  //         lastAccessed: 'Último Acceso',
  //         readOnly: 'Solo Lectura',
  //       };

  //       const omitProps = ['lastAccessed', 'readOnly']; // 🚀 Propiedades que queremos omitir

  //       this.dataSourceSharePoint = Object.entries(data)
  //         .filter(([key]) => !omitProps.includes(key)) // Filtrar propiedades no deseadas
  //         .map(([key, value]) => ({
  //           item: mapping[key] || key, // Renombrar si está en el mapping
  //           value: value as string | number | boolean,
  //         }));

  //       // this.dataSourceSharePoint = Object.entries(data).map(
  //       //   ([key, value]) => ({
  //       //     item: key,
  //       //     value: value as string | number | boolean,
  //       //   })
  //       // );

  //       // console.log(this.dataSourceSharePoint);
  //     });
  // }

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
      // case 'StepFirstCtrl':
      //   this.fileFirstCtrl = file;
      //   this.fileNameFirstCtrl = file.name;
      //   break;
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
      // default:
      //   //Declaraciones ejecutadas cuando ninguno de los valores coincide con el valor de la expresión
      //   break;
    }
  }

  async saveSharePoint(step: string): Promise<void> {
    // let type = 0;
    // let file = null;

    // if (!this.fileFirstCtrl) {
    //   this.utilsService.warning({
    //     message: 'Debes seleccionar un archivo antes de continuar.',
    //   });
    //   return;
    // }
    // type = 5;
    // file = this.fileFirstCtrl;

    const confirm = await this.utilsService.confirm({
      message: '¿Está seguro en validar el archivo?',
    });
    if (confirm) {
      this.sharePointService.uploadFile().subscribe((result: any) => {
        console.log(result);

        // this.isCompletedFirstCtrl = true;
        // this.firstFormGroup.patchValue({
        //   firstCtrl: this.isCompletedFirstCtrl,
        // });

        this.utilsService.success(/*{
          message: state.message,
        }*/);
      });
    }
  }

  async save(step: string): Promise<void> {
    let type = 0;
    let file = null;
    switch (step) {
      // case 'StepFirstCtrl':
      //   if (!this.fileFirstCtrl) {
      //     this.utilsService.warning({
      //       message: 'Debes seleccionar un archivo antes de continuar.',
      //     });
      //     return;
      //   }
      //   type = 5;
      //   file = this.fileFirstCtrl;
      //   break;
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
      // default:
      //   //Declaraciones ejecutadas cuando ninguno de los valores coincide con el valor de la expresión
      //   break;
    }

    // if (!this.fileSecondCtrl) {
    //   this.utilsService.warning({
    //     message: 'Debes seleccionar un archivo antes de continuar.',
    //   });
    //   return;
    // }

    const confirm = await this.utilsService.confirm({
      message: '¿Está seguro en validar el archivo?',
    });
    if (confirm) {
      this.uploadService.uploadFile(type, file).subscribe((result: any) => {
        // console.log(result);
        // this.isCompletedSecondCtrl = true;
        // this.secondFormGroup.patchValue({
        //   secondCtrl: this.isCompletedSecondCtrl,
        // });
        this.getTotales(step);
        switch (step) {
          // case 'StepFirstCtrl':
          //   this.isCompletedFirstCtrl = true;
          //   this.firstFormGroup.patchValue({
          //     firstCtrl: this.isCompletedFirstCtrl,
          //   });
          //   break;
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
          // default:
          //   //Declaraciones ejecutadas cuando ninguno de los valores coincide con el valor de la expresión
          //   break;
        }

        // const data = result.data;
        // const entidad: Expediente = {
        //   nombreExpediente: data.url,
        // };
        // this.dialogRef.close(entidad);
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
      // this.dataSource = new MatTableDataSource(data.content);
      // this.rowsCount = data.totalElements;
      // this.dataSourceTurno = new MatTableDataSource(data);
      // this.rowsCount = data.totalRegistros;s

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
        // case 'StepFirstCtrl':
        //   this.isOptionalFirstCtrl = false;
        //   this.isCompletedFirstCtrl = false;
        //   this.firstFormGroup.patchValue({
        //     firstCtrl: this.isCompletedFirstCtrl,
        //   });
        //   break;
        case 'StepFourthCtrl':
          this.isOptionalFourthCtrl = false;
          this.isCompletedFourthCtrl = false;
          this.fourthformgroup.patchValue({
            fourthCtrl: this.isCompletedFourthCtrl,
          });

          // this.resumen = this.resumen.filter(
          //   (item) =>
          //     item.step === 'Carga de Horas Extras' && item.fileName !== '-'
          // );
          // this.dataSource.data = this.resumen;
          break;
        case 'StepFifthCtrl':
          this.isOptionalFifthCtrl = false;
          this.isCompletedFifthCtrl = false;
          this.fifthformgroup.patchValue({
            fifthCtrl: this.isCompletedFifthCtrl,
          });

          // this.resumen = this.resumen.filter(
          //   (item) =>
          //     item.step === 'Carga de Absentismos' && item.fileName !== '-'
          // );
          // this.dataSource.data = this.resumen;
          break;
      }
    } else {
      switch (step) {
        // case 'StepFirstCtrl':
        //   this.isOptionalFirstCtrl = true;
        //   this.isCompletedFirstCtrl = true;
        //   this.firstFormGroup.patchValue({
        //     firstCtrl: this.isCompletedFirstCtrl,
        //   });
        //   break;
        case 'StepFourthCtrl':
          this.isOptionalFourthCtrl = true;
          this.isCompletedFourthCtrl = true;
          this.fourthformgroup.patchValue({
            fourthCtrl: this.isCompletedFourthCtrl,
          });

          // const existsFourthCtrl = this.resumen.some(
          //   (item) =>
          //     item.step === 'Carga de Horas Extras' && item.fileName === '-'
          // );
          // if (!existsFourthCtrl) {
          //   const dataFourthCtrl: TableElement = {
          //     item: 0,
          //     step: 'Carga de Horas Extras',
          //     fileName: '-',
          //     totalProcesados: 0,
          //     totalObservados: 0,
          //   };
          //   this.resumen.push(dataFourthCtrl);
          //   this.dataSource.data = this.resumen;
          // }
          break;
        case 'StepFifthCtrl':
          this.isOptionalFifthCtrl = true;
          this.isCompletedFifthCtrl = true;
          this.fifthformgroup.patchValue({
            fifthCtrl: this.isCompletedFifthCtrl,
          });

          // const existsFifthCtrl = this.resumen.some(
          //   (item) =>
          //     item.step === 'Carga de Absentismos' && item.fileName === '-'
          // );
          // if (!existsFifthCtrl) {
          //   const dataFourthCtrl: TableElement = {
          //     item: 0,
          //     step: 'Carga de Absentismos',
          //     fileName: '-',
          //     totalProcesados: 0,
          //     totalObservados: 0,
          //   };
          //   this.resumen.push(dataFourthCtrl);
          //   this.dataSource.data = this.resumen;
          // }
          break;
      }
    }
  }

  async saveProcess(): Promise<void> {
    // this.utilsService.success({
    //   message: 'Proceso de cruce de horario iniciado.',
    // });

    const confirm = await this.utilsService.confirm({
      message: '¿Está seguro de ejecutar el proceso?',
    });
    if (confirm) {
      this.procesoService.saveProcess().subscribe((result: any) => {
        console.log(result);

        // this.dialogRef.close(entidad);
        this.utilsService.success({
          message: 'Proceso de cruce de horario iniciado.',
          action: () => {
            this.router.navigate(['/ver-proceso']);
          },
        });
      });
    }
  }

  // addToSummary(step: string) {
  //   // this.resumen.push(result);
  //   // this.dataSource.data = this.resumen;

  //   switch (step) {
  //     // case 'StepFirstCtrl':
  //     //   const existingIndex1 = this.resumen.findIndex(
  //     //     (item) => item.item === 1
  //     //   );
  //     //   const newItem1 = {
  //     //     item: 1,
  //     //     step: 'Carga de Maestro COE RRLL',
  //     //     fileName: this.fileNameFirstCtrl,
  //     //     condition: this.isOptionalFirstCtrl
  //     //       ? 'No será considerado'
  //     //       : 'Validado',
  //     //     status: this.isOptionalFirstCtrl ? '' : 'OK',
  //     //   };

  //     //   if (existingIndex1 !== -1) this.resumen[existingIndex1] = newItem1;
  //     //   else this.resumen.push(newItem1);
  //     //   this.dataSource.data = this.resumen;
  //     //   break;
  //     case 'StepSecondCtrl':
  //       const existingIndex2 = this.resumen.findIndex(
  //         (item) => item.item === 2
  //       );
  //       const newItem2 = {
  //         item: 2,
  //         step: 'Carga de Turnos',
  //         fileName: this.fileNameSecondCtrl,
  //         condition: 'Validado',
  //         status: 'OK',
  //       };

  //       if (existingIndex2 !== -1) this.resumen[existingIndex2] = newItem2;
  //       else this.resumen.push(newItem2);
  //       this.dataSource.data = this.resumen;
  //       break;
  //     case 'StepThirdCtrl':
  //       const existingIndex3 = this.resumen.findIndex(
  //         (item) => item.item === 3
  //       );
  //       const newItem3 = {
  //         item: 3,
  //         step: 'Carga de Marcaciones',
  //         fileName: this.fileNameThirdCtrl,
  //         condition: 'Validado',
  //         status: 'OK',
  //       };

  //       if (existingIndex3 !== -1) this.resumen[existingIndex3] = newItem3;
  //       else this.resumen.push(newItem3);
  //       this.dataSource.data = this.resumen;
  //       break;
  //     case 'StepFourthCtrl':
  //       const existingIndex4 = this.resumen.findIndex(
  //         (item) => item.item === 4
  //       );
  //       const newItem4 = {
  //         item: 4,
  //         step: 'Carga de Horas Extras',
  //         fileName: this.fileNameFourthCtrl,
  //         condition: this.isOptionalFourthCtrl
  //           ? 'No será considerado'
  //           : 'Validado',
  //         status: this.isOptionalFourthCtrl ? '' : 'OK',
  //       };

  //       if (existingIndex4 !== -1) this.resumen[existingIndex4] = newItem4;
  //       else this.resumen.push(newItem4);
  //       this.dataSource.data = this.resumen;
  //       break;
  //     case 'StepFifthCtrl':
  //       const existingIndex5 = this.resumen.findIndex(
  //         (item) => item.item === 5
  //       );
  //       const newItem5 = {
  //         item: 5,
  //         step: 'Carga de Absentismos',
  //         fileName: this.fileNameFifthCtrl,
  //         condition: this.isOptionalFifthCtrl
  //           ? 'No será considerado'
  //           : 'Validado',
  //         status: this.isOptionalFifthCtrl ? '' : 'OK',
  //       };

  //       if (existingIndex5 !== -1) this.resumen[existingIndex5] = newItem5;
  //       else this.resumen.push(newItem5);
  //       this.dataSource.data = this.resumen;
  //       break;
  //     // default:
  //     //   //Declaraciones ejecutadas cuando ninguno de los valores coincide con el valor de la expresión
  //     //   break;
  //   }
  // }

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
