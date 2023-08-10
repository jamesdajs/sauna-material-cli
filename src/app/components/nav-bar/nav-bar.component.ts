import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { NavService } from 'src/app/services/nav.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {
  public isMenuCollapsed = true;
  isAuth = false
  role: string = ''
  constructor(private authService: AuthService,
    private router: Router,
    private navService: NavService
  ) { }

  ngOnInit(): void {
    this.navService.getUser().subscribe({
      next: (res) => {
        console.log(res);
        if (res === undefined)
          this.isAuth = false
        else{

          this.isAuth = true
          this.role = res.role.name
        }
      },
      error: (e) => {
        console.log(e);
        this.isAuth = false

      },
      complete: () => {
      }
    })
  }
  logout() {
    this.authService.logout()
    this.isMenuCollapsed = true;
    this.navService.clearUser()
  }
  redirec(link: string) {
    this.router.navigate([link])
  }
}
