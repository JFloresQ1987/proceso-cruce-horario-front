import { Injectable } from '@angular/core';
import { GenericService } from './generic.service';
import { Observable, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Usuario } from '../interfaces/usuario';
import { UsuarioClave } from '../interfaces/usuario-clave';

@Injectable({
  providedIn: 'root',
})
export class UsuarioService extends GenericService<Usuario> {
  constructor(protected override http: HttpClient) {
    super(http, `${environment.HOST}/usuario`);
  }

  resetPassword(idUsuario: number): Observable<UsuarioClave> {
    return this.http.patch<UsuarioClave>(
      `${this.url}/resetear/password/${idUsuario}`,
      {
        headers: this.getHeaders(),
      }
    );
  }

  // changePassword(entidad: UsuarioClave): Observable<UsuarioClave> {
  //   return this.http.patch<UsuarioClave>(
  //     `${this.url}/change-password/${entidad.passwordActual}/${entidad.passwordNuevo}/${entidad.passwordConfirmar}`,
  //     {
  //       headers: this.getHeaders(),
  //     }
  //   );
  // }

  changePassword(data: { currentPassword: string; newPassword: string }) {
    return this.http.post('/change-password', data);
  }
  
}
