import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, finalize, of, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Locker, LockerCreateRequest } from '../interfaces/locker';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class LockerService {
  constructor(private http :HttpClient,private authService:AuthService) { }
  list(){
    return this.http.get<[Locker]>(environment.url+"/lockers")
    .pipe(catchError(this.authService.httpError))
  }
  create(body:LockerCreateRequest){
    return this.http.post<Locker>(environment.url+"/lockers",body)
    .pipe(catchError(this.authService.httpError))
  }
  update(id:string,body:LockerCreateRequest){
    return this.http.put<Locker>(environment.url+"/lockers/"+
    id,body)
    .pipe(catchError(this.authService.httpError))
  }
  delete(id:string){
    return this.http.delete<Locker>(environment.url+"/lockers/"+
    id)
    .pipe(catchError(this.authService.httpError))
  }
}
