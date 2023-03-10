import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, finalize, of, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Product, ProductCreateRequest } from '../interfaces/product';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  constructor(private http :HttpClient,private authService:AuthService) { }
  list(){
    return this.http.get<[Product]>(environment.url+"/products")
    .pipe(catchError(this.authService.httpError))
  }
  create(body:ProductCreateRequest){
    return this.http.post<Product>(environment.url+"/products",body)
    .pipe(catchError(this.authService.httpError))
  }
  update(id:string,body:ProductCreateRequest){
    return this.http.put<Product>(environment.url+"/products/"+
    id,body)
    .pipe(catchError(this.authService.httpError))
  }
  delete(id:string){
    return this.http.delete<Product>(environment.url+"/products/"+
    id)
    .pipe(catchError(this.authService.httpError))
  }
}
