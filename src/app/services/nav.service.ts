import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, finalize, of, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthService } from './auth.service';
import { User, UserCreateRequest } from '../interfaces/user';
import { Role } from '../interfaces/Role';

@Injectable({
  providedIn: 'root'
})
export class NavService {
private user:User
private _user : BehaviorSubject<User | undefined>
  constructor(private http :HttpClient,private authService:AuthService) { 
    this._user = new BehaviorSubject<User | undefined>(this.user)
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
}