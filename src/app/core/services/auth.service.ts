import { isPlatformBrowser } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private _token: string;

  constructor(
    private http: HttpClient,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    // if (isPlatformBrowser(this.platformId)) {
    //   console.log('Running in the browser');
    // } else {
    //   console.log('Running on the server');
    // }
  }

  login(
    Email: string,
    Password: string
    // recaptchaResponse: string
  ): Observable<any> {
    return this.http.post<any>(`${environment.HOST_AUTH}/login/`, {
      Email,
      Password,
      // recaptchaResponse,
    });
  }

  // Guardar el token en localStorage
  setToken(token: string): void {
    sessionStorage.setItem('token', token);
  }

  // Obtener el token del almacenamiento local
  getToken(): string {
    this._token = sessionStorage.getItem('token');
    return this._token;
  }

  getUserId(): number | null {
    if (this._token != null) {
      const payload = JSON.parse(atob(this._token.split('.')[1]));
      const id = Number(payload.sub) ?? null;
      return id;
    }
    return null;
  }

  getEmail(): string | null {
    if (this._token != null) {
      const payload = JSON.parse(atob(this._token.split('.')[1]));
      const id = payload.email ?? null;
      return id;
    }
    return null;
  }

  // Verificar si el usuario está autenticado
  isAuthenticated(): boolean {
    return !!this.getToken(); // Retorna true si hay token
  }

  isTokenExpired(): boolean {
    const token = this.getToken();
    const payload = this.getPayload(token);
    const exp = payload.exp;
    const now = new Date().getTime() / 1000;
    return now > exp ? true : false;
  }

  // Cerrar sesión
  logout(): void {
    sessionStorage.clear();
    sessionStorage.removeItem('token');
  }

  getPayload(token: string) {
    if (token != null) {
      return JSON.parse(atob(token.split('.')[1]));
    }
    return null;
  }

  getFullName(): string {
    if (this._token != null) {
      const payload = JSON.parse(atob(this._token.split('.')[1]));
      const name = payload.given_name ?? '';
      return name;
    }
    return '';
  }

  getRoles(): string[] {
    if (this._token != null) {
      const payload = JSON.parse(atob(this._token.split('.')[1]));
      let roles =
        payload['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];

      if (!roles) {
        return []; // Retorna un array vacío si no hay roles
      }

      return Array.isArray(roles) ? roles : [roles]; // Si es string, lo convierte en array
    }
    return [];
  }

  hasRole(role: any): boolean {
    const roles = this.getRoles();
    return roles.includes(role);
  }

  hasRoles(requiredRoles: string[]): boolean {
    const userRoles = this.getRoles(); // Obtiene los roles del JWT
    return requiredRoles.some((role) => userRoles.includes(role)); // Verifica si al menos uno de los roles coincide
  }

  refreshToken(): Promise<void> {
    return new Promise((resolve, reject) => {
      this.http
        .get(`${environment.HOST_AUTH}/refresh-token`, { observe: 'response' })
        .subscribe(
          (response) => {
            const newToken = response.headers.get('New-Access-Token');
            if (newToken) {
              this.setToken(newToken);
              resolve();
            } else {
              reject('No se recibió un nuevo token');
            }
          },
          (error) => reject(error)
        );
    });
  }
}
