import { Injectable } from '@angular/core';
// import { GenericService } from './generic.service';
import { Observable, Subject } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Usuario } from '../interfaces/usuario';
import { UsuarioClave } from '../interfaces/usuario-clave';
import { UsuarioStatusDto } from '../interfaces/usuario-status-dto';
import { UsuarioResetDto } from '../interfaces/usuario-reset-dto';
import { UsuarioCreateDto } from '../interfaces/usuario-create-dto';
import { UsuarioUpdateDto } from '../interfaces/usuario-update-dto';
import { PaginationParams } from '../interfaces/PaginationParams';
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
