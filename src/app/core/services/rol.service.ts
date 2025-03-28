import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { RolDto } from '../interfaces/rol-dto';

@Injectable({
  providedIn: 'root',
})
export class RolService {
  constructor(private http: HttpClient) {}  

  listar() {
    return this.http.get<RolDto[]>(`${environment.HOST}/rol/listar`);
  }
}
