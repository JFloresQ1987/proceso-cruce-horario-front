import { Injectable } from '@angular/core';
import { GenericService } from './generic.service';
import { Observable, Subject } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Usuario } from '../interfaces/usuario';
import { UsuarioClave } from '../interfaces/usuario-clave';
import { UsuarioStatusDto } from '../interfaces/usuario-status-dto';
import { UsuarioResetDto } from '../interfaces/usuario-reset-dto';
import { UsuarioCreateDto } from '../interfaces/usuario-create-dto';
import { UsuarioUpdateDto } from '../interfaces/usuario-update-dto';

export interface UsuarioDto {
  idUsuario: number;
  nombreCompleto: string;
  correoElectronico: string;
  fechaRegistro: string;
  esVigente: boolean;
}

export interface PaginacionResponse<T> {
  totalRegistros: number;
  paginaActual: number;
  tamañoPagina: number;
  totalPaginas: number;
  datos: T[];
}

export interface UsuarioFilterDto extends PaginationParams {
  nombreCompleto?: string;
  esVigente?: string;
}

export interface PaginationParams {
  page: number;
  size: number;
}

@Injectable({
  providedIn: 'root',
})
// export class UsuarioService extends GenericService<Usuario> {
//   constructor(protected override http: HttpClient) {
//     super(http, `${environment.HOST}/usuario`);
//   }
export class UsuarioService {
  constructor(private http: HttpClient) {}

  // public findUserPaginado(page: number, size: number): Observable<boolean> {
  //   let queryParms = new HttpParams().set('page', page + 1).set('size', size);
  //   return this.http.get<boolean>(
  //     `${environment.HOST}/usuario/paginado?` + queryParms
  //   );
  // }

  listarPorId(id: number) {
    return this.http.get<UsuarioDto>(`${environment.HOST}/usuario/${id}`);
  }

  public listarPaginado(
    params: UsuarioFilterDto
  ): Observable<PaginacionResponse<UsuarioDto>> {
    let httpParams = new HttpParams();
    Object.entries(params).forEach(([key, value]) => {
      httpParams = httpParams.set(key, value as string);
    });

    return this.http.get<PaginacionResponse<UsuarioDto>>(
      `${environment.HOST}/usuario/paginado?`,
      { params: httpParams }
    );
  }

  guardar(dto: UsuarioCreateDto) {
    return this.http.post(`${environment.HOST}/usuario`, dto);
  }

  actualizar(dto: UsuarioUpdateDto) {
    // return this.http.put(`${environment.HOST}/usuario`, dto);
    return this.http.patch(`${environment.HOST}/usuario/actualizar`, dto);
  }

  actualizarVigenciaUsuario(dto: UsuarioStatusDto) {
    return this.http.patch(`${environment.HOST}/usuario/cambiar-vigencia`, dto);
  }

  resetearClave(dto: UsuarioResetDto) {
    return this.http.patch(`${environment.HOST}/usuario/resetear-clave`, dto);
  }

  // guardar(t: T) {
  //   return this.http.post(this.url, t, { headers: this.getHeaders() });
  // }

  // actualizar(t: T) {
  //   return this.http.put(this.url, t, { headers: this.getHeaders() });
  // }

  // resetPassword(idUsuario: number): Observable<UsuarioClave> {
  //   return this.http.patch<UsuarioClave>(
  //     `${this.url}/resetear/password/${idUsuario}`,
  //     {
  //       headers: this.getHeaders(),
  //     }
  //   );
  // }

  // // changePassword(entidad: UsuarioClave): Observable<UsuarioClave> {
  // //   return this.http.patch<UsuarioClave>(
  // //     `${this.url}/change-password/${entidad.passwordActual}/${entidad.passwordNuevo}/${entidad.passwordConfirmar}`,
  // //     {
  // //       headers: this.getHeaders(),
  // //     }
  // //   );
  // // }

  // changePassword(data: { currentPassword: string; newPassword: string }) {
  //   return this.http.post('/change-password', data);
  // }
}
