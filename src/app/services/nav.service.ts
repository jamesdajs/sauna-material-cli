import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, finalize, of, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthService } from './auth.service';
import { User, UserCreateRequest } from '../interfaces/user';
import { Role } from '../interfaces/Role';
import { EntryService } from './entry.service';

@Injectable({
  providedIn: 'root'
})
export class NavService {
private user:User
private _user : BehaviorSubject<User | undefined>

private cantClient:any[]
private _cantClient : BehaviorSubject<any[] | undefined>
  constructor(private http :HttpClient,private entryService:EntryService) { 
    this._user = new BehaviorSubject<User | undefined>(this.user)
    this._cantClient = new BehaviorSubject<any | undefined>(this.cantClient)
  }
  getUser(){
    return this._user.asObservable()
  }
  setUser(user:User){
    this._user.next(user)
  }
  clearUser(){
    this._user.next(undefined)
  }

  getCantCli(){
    return this._cantClient.asObservable()
  }
  setCantCli(){
    this.entryService.countPerson()
    .subscribe({
      next: (res) => {
        console.log(res);
        this._cantClient.next( res ?? [])
      },
      error: (e) => {
        console.log(e);
      },
      complete: () => {
        console.log('done')
      },
    })
  }
}