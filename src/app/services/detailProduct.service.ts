import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, finalize, of, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { DetailProduct, DetailProductCreateRequest } from '../interfaces/detailProduct';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class DetailProductService {
  constructor(private http :HttpClient,private authService:AuthService) { }
  list(state:boolean){
    return this.http.get<[DetailProduct]>(environment.url+"/detailproduct/"+state)
    .pipe(catchError(this.authService.httpError))
  }
  getDetail(id:string){
    return this.http.get<DetailProduct>(environment.url+"/detailproduct/getDetail/"+id)
    .pipe(catchError(this.authService.httpError))
  }
  create(body:DetailProductCreateRequest){
    return this.http.post<DetailProduct>(environment.url+"/detailproduct",body)
    .pipe(catchError(this.authService.httpError))
  }
  update(id:string,body:DetailProductCreateRequest){
    return this.http.put<DetailProduct>(environment.url+"/detailproduct/"+
    id,body)
    .pipe(catchError(this.authService.httpError))
  }
  delete(id:string){
    return this.http.delete<DetailProduct>(environment.url+"/detailproduct/"+
    id)
    .pipe(catchError(this.authService.httpError))
  }
}