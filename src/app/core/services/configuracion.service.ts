import { Injectable } from '@angular/core';
// import { GenericService } from './generic.service';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { ConfiguracionDto } from '../interfaces/configuracion-dto';
import { ConfiguracionUpdateDto } from '../interfaces/configuracion-update-dto';

@Injectable({
  providedIn: 'root',
})
export class ConfiguracionService {
  constructor(private http: HttpClient) {}

  listar() {
    return this.http.get<ConfiguracionDto[]>(
      `${environment.HOST}/configuracion/listar`
    );
  }

  actualizar(dto: ConfiguracionUpdateDto) {
    return this.http.patch(`${environment.HOST}/configuracion/actualizar`, dto);
  }
}
