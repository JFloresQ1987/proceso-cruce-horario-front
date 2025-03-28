import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { saveFile } from '../util/download.utils';

@Injectable({
  providedIn: 'root',
})
export class ReporteService {
  constructor(private http: HttpClient) {}

  public donwloadProcessObservations(id: number): void {
    this.http
      .get(`${environment.HOST}/proceso/descargar-observaciones/` + id, {
        responseType: 'blob',
        observe: 'response',
      })
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

  public donwloadProcessFullReport(id: number): void {
    this.http
      .get(`${environment.HOST}/proceso/descargar-reporte-detallado/` + id, {
        responseType: 'blob',
        observe: 'response',
      })
      .subscribe({
        next: (response: HttpResponse<Blob>) => {
          const blob = response.body!;
          const contentDisposition = response.headers?.get(
            'content-disposition'
          ); // Asegurar que headers existe
          let fileName = 'reporteDetallado.xlsx'; // Nombre por defecto
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

  public donwloadProcessResumeReport(id: number): void {
    this.http
      .get(`${environment.HOST}/proceso/descargar-reporte-resumido/` + id, {
        responseType: 'blob',
        observe: 'response',
      })
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
}
