import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, finalize, of, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Service, ServiceCreateRequest } from '../interfaces/service';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {
  constructor(private http :HttpClient,private authService:AuthService) { }
  list(state=''){
    return this.http.get<[Service]>(environment.url+"/services"+state)
    .pipe(catchError(this.authService.httpError))
  }
  create(body:ServiceCreateRequest){
    return this.http.post<Service>(environment.url+"/services",body)
    .pipe(catchError(this.authService.httpError))
  }
  update(id:string,body:ServiceCreateRequest){
    return this.http.put<Service>(environment.url+"/services/"+
    id,body)
    .pipe(catchError(this.authService.httpError))
  }
  delete(id:string){
    return this.http.delete<Service>(environment.url+"/services/"+
    id)
    .pipe(catchError(this.authService.httpError))
  }
}