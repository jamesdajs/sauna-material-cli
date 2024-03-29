import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, finalize, of, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthService } from './auth.service';
import { User, UserCreateRequest } from '../interfaces/user';
import { Role } from '../interfaces/Role';
import { Data } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private http :HttpClient,private authService:AuthService) { }
  list(url=""){
    return this.http.get<[User]>(environment.url+"/users"+url)
    .pipe(catchError(this.authService.httpError))
  }
  getUserEntry(id:number,query=""){
    return this.http.get<User>(environment.url+"/users/entry/"+id+query)
    .pipe(catchError(this.authService.httpError))
  }
  getRole(){
    return this.http.get<[Role]>(environment.url+"/users/role")
    .pipe(catchError(this.authService.httpError))
  }
  getMe(){
    return this.http.get<User>(environment.url+"/users/me")
  }
  create(body:UserCreateRequest){
    return this.http.post<User>(environment.url+"/users",body)
    .pipe(catchError(this.authService.httpError))
  }
  update(id:number,body:UserCreateRequest){
    return this.http.put<User>(environment.url+"/users/"+
    id,body)
    .pipe(catchError(this.authService.httpError))
  }
  updateData(id:number,body:UserCreateRequest){
    return this.http.put<Data>(environment.url+"/users/data/"+
    id,body)
    .pipe(catchError(this.authService.httpError))
  }
  delete(id:string){
    return this.http.delete<User>(environment.url+"/users/"+
    id)
    .pipe(catchError(this.authService.httpError))
  }
}