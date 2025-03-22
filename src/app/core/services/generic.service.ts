import { Inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

export interface PaginationParams {
  page?: number;
  size?: number;
  // sortBy: string;
  // sortDir: string;
}

@Injectable({
  providedIn: 'root',
})
export class GenericService<T> {
  constructor(
    protected http: HttpClient,
    @Inject('url') protected url: string
  ) {}

  // protected getHeaders(): HttpHeaders {
  //   return new HttpHeaders({
  //     'Content-Type': 'application/json',
  //     Accept: 'application/json',
  //   });
  // }

  // listar() {
  //   return this.http.get<T[]>(this.url, { headers: this.getHeaders() });
  // }

  listarPaginado(params: T & PaginationParams) {
    // Construye los parámetros de la consulta
    let httpParams = new HttpParams();
    Object.entries(params).forEach(([key, value]) => {
      httpParams = httpParams.set(key, value as string);
    });

    return this.http.get<T[]>(this.url + '/paginado', {
      params: httpParams,
      // headers: this.getHeaders(),
    });
  }

  // listarPorId(id: string | number) {
  //   return this.http.get<T>(`${this.url}/${id}`, {
  //     headers: this.getHeaders(),
  //   });
  // }

  // guardar(t: T) {
  //   return this.http.post(this.url, t, { headers: this.getHeaders() });
  // }

  // actualizar(t: T) {
  //   return this.http.put(this.url, t, { headers: this.getHeaders() });
  // }

  listarPorId(id: string | number) {
    return this.http.get<T>(`${this.url}/${id}`);
  }

  guardar(t: T) {
    return this.http.post(this.url, t);
  }

  actualizar(t: T) {
    return this.http.put(this.url, t);
  }

  // // En GenericService<T>
  // guardarVarios(ts: T[]) {
  //   return this.http.post<T[]>(`${this.url}/batch`, ts, {
  //     headers: this.getHeaders(),
  //   });
  // }

  /*
  eliminar(id: string | number){
    return this.http.delete(`${this.url}/${id}`);
  }
  */
}
