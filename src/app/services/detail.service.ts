import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, finalize, of, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Detail, DetailCreateRequest } from '../interfaces/detail';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class DetailService {
  constructor(private http :HttpClient,private authService:AuthService) { }
  list(state:boolean){
    return this.http.get<[Detail]>(environment.url+"/details/"+state)
    .pipe(catchError(this.authService.httpError))
  }
  getDetail(id:string){
    return this.http.get<Detail>(environment.url+"/details/getDetail/"+id)
    .pipe(catchError(this.authService.httpError))
  }
  create(body:DetailCreateRequest){
    return this.http.post<Detail>(environment.url+"/details",body)
    .pipe(catchError(this.authService.httpError))
  }
  update(id:string,body:DetailCreateRequest){
    return this.http.put<Detail>(environment.url+"/details/"+
    id,body)
    .pipe(catchError(this.authService.httpError))
  }
  delete(id:string){
    return this.http.delete<Detail>(environment.url+"/details/"+
    id)
    .pipe(catchError(this.authService.httpError))
  }
}
