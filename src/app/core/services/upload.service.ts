import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UploadService {
  constructor(private http: HttpClient) {}

  uploadFile(fileType: number, file: File): Observable<any> {
    const formData = new FormData();
    // formData.append('fileType', fileType);
    formData.append('file', file);
    return this.http.post(`${environment.HOST}/upload/${fileType}`, formData);
  }
}
