import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class SharePointService {
  constructor(private http: HttpClient) {}

  uploadFile(): Observable<any> {
    return this.http.post(`${environment.HOST}/sharepoint`, {});
  }

  getFileInfo(): Observable<any> {
    return this.http.get<any>(`${environment.HOST}/sharepoint/file-info`);
  }
}
