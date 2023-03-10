import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http :HttpClient,private cookieService:CookieService,private router:Router) { }
  login(body:any){
    return this.http.post(environment.url+"/auth/singin",body)
  }
  logout(){
    this.cookieService.deleteAll()
    this.router.navigate(["/"])
  }
  httpError = (error:any)=>{
      if (error.status == 401){
        alert('Usuario no autorizado')
        this.logout()
      }
      return throwError(()=>error)
  }
}
