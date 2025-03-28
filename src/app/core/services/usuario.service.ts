import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { UsuarioStatusDto } from '../interfaces/usuario-status-dto';
import { UsuarioResetDto } from '../interfaces/usuario-reset-dto';
import { UsuarioCreateDto } from '../interfaces/usuario-create-dto';
import { UsuarioUpdateDto } from '../interfaces/usuario-update-dto';
import { PaginacionResponse } from '../interfaces/PaginacionResponse';
import { UsuarioFilterDto } from '../interfaces/usuario-filter-dto';
import { UsuarioDto } from '../interfaces/usuario-dto';

@Injectable({
  providedIn: 'root',
})
export class UsuarioService {
  constructor(private http: HttpClient) {}

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
    return this.http.patch(`${environment.HOST}/usuario/actualizar`, dto);
  }

  actualizarVigenciaUsuario(dto: UsuarioStatusDto) {
    return this.http.patch(`${environment.HOST}/usuario/cambiar-vigencia`, dto);
  }

  resetearClave(dto: UsuarioResetDto) {
    return this.http.patch(`${environment.HOST}/usuario/resetear-clave`, dto);
  }

  changePassword(dto: { currentPassword: string; newPassword: string }) {
    return this.http.patch(`${environment.HOST}/usuario/change-password`, dto);
  }
}
