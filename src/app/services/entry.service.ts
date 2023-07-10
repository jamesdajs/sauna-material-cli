import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, finalize, of, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Entry, EntryCreateRequest } from '../interfaces/entry';
import { AuthService } from './auth.service';
import { ReportDayDetailResponse } from '../interfaces/report';

@Injectable({
  providedIn: 'root'
})
export class EntryService {
  constructor(private http :HttpClient,private authService:AuthService) { }
  list(state:boolean){
    return this.http.get<[Entry]>(environment.url+"/entries/"+state)
    .pipe(catchError(this.authService.httpError))
  }
  getEntry(id:string){
    return this.http.get<Entry>(environment.url+"/entries/getEntry/"+id)
    .pipe(catchError(this.authService.httpError))
  }
  create(body:EntryCreateRequest){
    return this.http.post<Entry>(environment.url+"/entries",body)
    .pipe(catchError(this.authService.httpError))
  }
  update(id:string,body:EntryCreateRequest){
    return this.http.put<Entry>(environment.url+"/entries/"+
    id,body)
    .pipe(catchError(this.authService.httpError))
  }
  closeEntry(id:string){
    return this.http.get<Entry>(environment.url+"/entries/outentry/"+
    id)
    .pipe(catchError(this.authService.httpError))
  }
  delete(id:string){
    return this.http.delete<Entry>(environment.url+"/entries/"+
    id)
    .pipe(catchError(this.authService.httpError))
  }
  report(query=""){
    return this.http.get<[Entry]>(environment.url+"/reports"+query)
    .pipe(catchError(this.authService.httpError))
  }
  reportDay(date="31"){
    return this.http.get<[Entry]>(environment.url+"/reports/"+date)
    .pipe(catchError(this.authService.httpError))
  }
  reportDayDetail(query=""){
    return this.http.get<ReportDayDetailResponse>(environment.url+"/reports/detail"+query)
    .pipe(catchError(this.authService.httpError))
  }
}
