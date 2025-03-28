import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { PaginacionResponse } from '../interfaces/PaginacionResponse';
import { TipoAbsentismoFilterDto } from '../interfaces/tipo-absentismo-filter-dto';
import { TipoAbsentismoCreateDto } from '../interfaces/tipo-absentismo-create-dto';
import { TipoAbsentismoUpdateDto } from '../interfaces/tipo-absentismo-update-dto';
import { TipoAbsentismoDto } from '../interfaces/tipo-absentismo-dto';
import { TipoAbsentismoStatusDto } from '../interfaces/tipo-absentismo-status-dto';

@Injectable({
  providedIn: 'root',
})
export class TipoAbsentismoService {
  constructor(private http: HttpClient) {}

  public listarPaginado(
    params: TipoAbsentismoFilterDto
  ): Observable<PaginacionResponse<TipoAbsentismoDto>> {
    let httpParams = new HttpParams();
    Object.entries(params).forEach(([key, value]) => {
      httpParams = httpParams.set(key, value as string);
    });

    return this.http.get<PaginacionResponse<TipoAbsentismoDto>>(
      `${environment.HOST}/tipo-absentismo/paginado?`,
      { params: httpParams }
    );
  }

  guardar(dto: TipoAbsentismoCreateDto) {
    return this.http.post(`${environment.HOST}/tipo-absentismo`, dto);
  }

  actualizar(dto: TipoAbsentismoUpdateDto) {
    return this.http.patch(
      `${environment.HOST}/tipo-absentismo/actualizar`,
      dto
    );
  }

  actualizarVigenciaGrupo(dto: TipoAbsentismoStatusDto) {
    return this.http.patch(
      `${environment.HOST}/tipo-absentismo/cambiar-vigencia`,
      dto
    );
  }
}
