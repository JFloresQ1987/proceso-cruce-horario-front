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
}
