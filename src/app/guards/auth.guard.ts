import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private cookieService:CookieService,private router:Router){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      const cookie = this.cookieService.check("token")
      if (!cookie) {
        this.router.navigate(["/"])
        return false
      }
      return true;
  }
  
}
@Injectable({
  providedIn: 'root'
})
export class loginGuard implements CanActivate {
  constructor(private cookieService:CookieService,private router:Router){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      const cookie = this.cookieService.check("token")
      if (!!cookie) {
        this.router.navigate(["/customers"])
        return false
      }
      return true;
  }
  
}
