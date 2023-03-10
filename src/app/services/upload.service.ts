import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpEvent } from '@angular/common/http';
import { catchError, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class UploadService {
  private baseUrl = environment.url;

  constructor(private http: HttpClient
    ) {}

  upload(formData: FormData): Observable<HttpEvent<any>> {
    const req = new HttpRequest('POST', `${this.baseUrl}/upload`, formData, {
      reportProgress: true,
      responseType: 'json',
    });

    return this.http.request(req);
  }
  delete(name:string){
    return this.http.delete(this.baseUrl+"/upload/"+name)
  }
}