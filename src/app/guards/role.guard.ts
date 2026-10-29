import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Injectable({ providedIn: 'root' })
export class RoleGuard implements CanActivate {
  constructor(private cookieService: CookieService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, _state: RouterStateSnapshot): boolean | UrlTree {
    const token = this.cookieService.get('token');
    const allowedRoles = route.data['roles'] as string[] | undefined;
    const role = this.getRole(token);

    if (role && (!allowedRoles || allowedRoles.includes(role))) {
      return true;
    }

    return this.router.parseUrl('/customers');
  }

  private getRole(token: string): string | undefined {
    try {
      const encodedPayload = token.split('.')[1]
        .replace(/-/g, '+')
        .replace(/_/g, '/');
      const paddedPayload = encodedPayload.padEnd(encodedPayload.length + (4 - encodedPayload.length % 4) % 4, '=');
      const payload = JSON.parse(atob(paddedPayload));
      return payload.role;
    } catch (_error) {
      return undefined;
    }
  }
}
