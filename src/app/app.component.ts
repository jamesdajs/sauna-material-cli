import { Component, ViewChild } from '@angular/core';
import { UserService } from './services/user.service';
import { NavService } from './services/nav.service';
import { EntryService } from './services/entry.service';
import { MatSidenav } from '@angular/material/sidenav';
import { CookieService } from 'ngx-cookie-service';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {
  title = 'Sauna Florida';
  cant:any[]=[]
  total = 0
  isAuth = false
  constructor(
    private userService: UserService,
    private navService: NavService,
    private cookieService: CookieService,
    private authService: AuthService
    ){

  }
  ngOnInit() {
    if (!this.cookieService.check('token')) {
      return;
    }
    this.userService.getMe().subscribe({
      next: (res) => {
        console.log(res);
        this.isAuth = true
        this.navService.setUser(res)
        this.navService.setCantCli()
      },
      error: (error) => {
        if (error.status === 401) {
          this.authService.logout()
          return
        }
        console.error(error)
      },
    })
    this.navService.getCantCli()
    .subscribe({
      next: (res) => {
        console.log(res);
        this.cant = res ?? []
      },
      error: (e) => {
        console.log(e);
      },
      complete: () => {
        console.log('done')
      },
    })
  }
  sumPerson(){
    return this.cant.map(t => parseInt(t.cant)).reduce((acc, value) => acc + value, 0);
  }
}
