import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Customer, CustomerCreateRequest, CustomerListResponse } from '../interfaces/customer';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(private http :HttpClient,private authService:AuthService) { }
  list(){
    return this.http.get<[Customer]>(environment.url+"/customers")
    .pipe(catchError(this.authService.httpError))
  }
  create(body:CustomerCreateRequest){
    return this.http.post<Customer>(environment.url+"/customers",body)
    .pipe(catchError(this.authService.httpError))
  }
  update(id:string,body:CustomerCreateRequest){
    return this.http.put<Customer>(environment.url+"/customers/"+
    id,body)
    .pipe(catchError(this.authService.httpError))
  }
  delete(id:string){
    return this.http.delete<Customer>(environment.url+"/customers/"+
    id)
    .pipe(catchError(this.authService.httpError))
  }
}
