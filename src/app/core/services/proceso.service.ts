import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { saveFile } from '../util/download.utils';

@Injectable({
  providedIn: 'root',
})
export class ProcesoService {
  constructor(private http: HttpClient) {}

  saveProcess(): Observable<any> {
    return this.http.post(`${environment.HOST}/proceso`, {});
  }

  closeProcess(id: number): Observable<any> {
    return this.http.patch(`${environment.HOST}/proceso/terminar/` + id, {});
  }

  public findDetailsByLoad(id: number): Observable<boolean> {
    return this.http.get<boolean>(
      `${environment.HOST}/proceso/carga-detalle/` + id
    );
  }

  public findPending(): Observable<any> {
    return this.http.get<any>(`${environment.HOST}/proceso/pendientes`);
  }

  public findProcessPaginado(page: number, size: number): Observable<boolean> {
    let queryParms = new HttpParams().set('page', page + 1).set('size', size);
    return this.http.get<boolean>(
      `${environment.HOST}/proceso/paginado?` + queryParms
    );
  }

  public findDetailsByProcess(id: number): Observable<boolean> {
    return this.http.get<boolean>(`${environment.HOST}/proceso/detalles/` + id);
  }

  public donwloadLoadObservations(id: number): void {
    this.http
      .get(
        `${environment.HOST}/proceso/descargar-observaciones/archivo/` + id,
        {
          responseType: 'blob',
          observe: 'response',
        }
      )
      .subscribe({
        next: (response: HttpResponse<Blob>) => {
          const blob = response.body!;
          const contentDisposition = response.headers?.get(
            'content-disposition'
          ); // Asegurar que headers existe
          let fileName = 'reporteResumido.xlsx'; // Nombre por defecto
          if (contentDisposition) {
            const matches = contentDisposition.match(
              /filename\*?=["']?(?:UTF-8'')?([^"';]+)/
            );
            if (matches?.length > 1) {
              fileName = decodeURIComponent(matches[1]);
            }
          }
          saveFile(blob, fileName);
        },
        error: (err) => console.error('Error al descargar el archivo', err),
      });
  }

  // public donwloadProcessObservations(id: number): void {
  //   // const url = `${this.url}/reporte/resumen-valorizado-detalle/${params.anio}/${params.mes}/${params.idIpress}`; // URL del backend
  //   this.http
  //     .get(`${environment.HOST}/proceso/descargar-observaciones/` + id, {
  //       responseType: 'blob',
  //       observe: 'response',
  //     })
  //     .subscribe({
  //       // next: (blob) => this.saveFile(blob, 'reporte.xlsx'),
  //       next: (response: HttpResponse<Blob>) => {
  //         const blob = response.body!;
  //         const contentDisposition = response.headers?.get(
  //           'content-disposition'
  //         ); // Asegurar que headers existe
  //         // console.log('blob', blob);
  //         // console.log('contentDisposition', contentDisposition);
  //         let fileName = 'reporteResumido.xlsx'; // Nombre por defecto
  //         if (contentDisposition) {
  //           const matches = contentDisposition.match(
  //             /filename\*?=["']?(?:UTF-8'')?([^"';]+)/
  //           );
  //           if (matches?.length > 1) {
  //             fileName = decodeURIComponent(matches[1]);
  //           }
  //         }
  //         // console.log('fileName', fileName);
  //         this.saveFile(blob, fileName);
  //       },
  //       error: (err) => console.error('Error al descargar el archivo', err),
  //     });
  // }

  // public donwloadProcessFullReport(id: number): void {
  //   // const url = `${this.url}/reporte/resumen-valorizado-detalle/${params.anio}/${params.mes}/${params.idIpress}`; // URL del backend
  //   this.http
  //     .get(`${environment.HOST}/proceso/descargar-reporte-detallado/` + id, {
  //       responseType: 'blob',
  //       observe: 'response',
  //     })
  //     .subscribe({
  //       // next: (blob) => this.saveFile(blob, 'reporteDetallado.xlsx'),
  //       // next: (response: any)=>{
  //       //   console.log(response)
  //       // },
  //       next: (response: HttpResponse<Blob>) => {
  //         const blob = response.body!;
  //         const contentDisposition = response.headers?.get(
  //           'content-disposition'
  //         ); // Asegurar que headers existe
  //         // console.log('blob', blob);
  //         // console.log('contentDisposition', contentDisposition);
  //         let fileName = 'reporteDetallado.xlsx'; // Nombre por defecto
  //         if (contentDisposition) {
  //           const matches = contentDisposition.match(
  //             /filename\*?=["']?(?:UTF-8'')?([^"';]+)/
  //           );
  //           if (matches?.length > 1) {
  //             fileName = decodeURIComponent(matches[1]);
  //           }
  //         }
  //         // console.log('fileName', fileName);
  //         this.saveFile(blob, fileName);
  //       },
  //       //         next: (response: any) => {
  //       //           const blob = response.body!;
  //       //           const contentDisposition = response.headers.get(
  //       //             'Content-Disposition'
  //       //           );
  //       // console.log('blob',blob)
  //       // console.log('contentDisposition',contentDisposition)
  //       //           // Extraer el nombre del archivo de Content-Disposition
  //       //           let fileName = 'reporteDetallado.xlsx'; // Valor por defecto
  //       //           if (contentDisposition) {
  //       //             const matches = contentDisposition.match(
  //       //               /filename\*?=["']?(?:UTF-8'')?([^"';]+)/
  //       //             );
  //       //             if (matches?.length > 1) {
  //       //               fileName = decodeURIComponent(matches[1]);
  //       //             }
  //       //           }
  //       //           console.log('fileName',fileName)
  //       //           this.saveFile(blob, fileName);
  //       //         },
  //       error: (err) => console.error('Error al descargar el archivo', err),
  //     });
  // }

  // public donwloadProcessResumeReport(id: number): void {
  //   // const url = `${this.url}/reporte/resumen-valorizado-detalle/${params.anio}/${params.mes}/${params.idIpress}`; // URL del backend
  //   this.http
  //     .get(`${environment.HOST}/proceso/descargar-reporte-resumido/` + id, {
  //       responseType: 'blob',
  //       observe: 'response',
  //     })
  //     .subscribe({
  //       // next: (blob) => this.saveFile(blob, 'reporteResumido.xlsx'),
  //       next: (response: HttpResponse<Blob>) => {
  //         const blob = response.body!;
  //         const contentDisposition = response.headers?.get(
  //           'content-disposition'
  //         ); // Asegurar que headers existe
  //         // console.log('blob', blob);
  //         // console.log('contentDisposition', contentDisposition);
  //         let fileName = 'reporteResumido.xlsx'; // Nombre por defecto
  //         if (contentDisposition) {
  //           const matches = contentDisposition.match(
  //             /filename\*?=["']?(?:UTF-8'')?([^"';]+)/
  //           );
  //           if (matches?.length > 1) {
  //             fileName = decodeURIComponent(matches[1]);
  //           }
  //         }
  //         // console.log('fileName', fileName);
  //         this.saveFile(blob, fileName);
  //       },
  //       // next: (response: any) => {
  //       //   const blob = response.body!;
  //       //   const contentDisposition = response.headers.get(
  //       //     'Content-Disposition'
  //       //   );

  //       //   // Extraer el nombre del archivo de Content-Disposition
  //       //   let fileName = 'reporteDetallado.xlsx'; // Valor por defecto
  //       //   if (contentDisposition) {
  //       //     const matches = contentDisposition.match(
  //       //       /filename\*?=["']?(?:UTF-8'')?([^"';]+)/
  //       //     );
  //       //     if (matches?.length > 1) {
  //       //       fileName = decodeURIComponent(matches[1]);
  //       //     }
  //       //   }

  //       //   this.saveFile(blob, fileName);
  //       // },
  //       error: (err) => console.error('Error al descargar el archivo', err),
  //     });
  // }

  // private saveFile(blob: Blob, fileName: string): void {
  //   const link = document.createElement('a');
  //   const url = window.URL.createObjectURL(blob);
  //   link.href = url;
  //   link.download = fileName;
  //   link.click();
  //   window.URL.revokeObjectURL(url);
  // }
}
