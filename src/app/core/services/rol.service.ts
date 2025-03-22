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
import { RolDto } from '../interfaces/rol-dto';

@Injectable({
  providedIn: 'root',
})
// export class UsuarioService extends GenericService<Usuario> {
//   constructor(protected override http: HttpClient) {
//     super(http, `${environment.HOST}/usuario`);
//   }
export class RolService {
  constructor(private http: HttpClient) {}  

  listar() {
    return this.http.get<RolDto[]>(`${environment.HOST}/rol/listar`);
  }
}
