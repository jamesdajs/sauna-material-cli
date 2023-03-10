import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, finalize, of, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Category, CategoryCreateRequest } from '../interfaces/category';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  constructor(private http :HttpClient,private authService:AuthService) { }
  list(){
    return this.http.get<[Category]>(environment.url+"/categories")
    .pipe(catchError(this.authService.httpError))
  }
  create(body:CategoryCreateRequest){
    return this.http.post<Category>(environment.url+"/categories",body)
    .pipe(catchError(this.authService.httpError))
  }
  update(id:string,body:CategoryCreateRequest){
    return this.http.put<Category>(environment.url+"/categories/"+
    id,body)
    .pipe(catchError(this.authService.httpError))
  }
  delete(id:string){
    return this.http.delete<Category>(environment.url+"/categories/"+
    id)
    .pipe(catchError(this.authService.httpError))
  }
}
