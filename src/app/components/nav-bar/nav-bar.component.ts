import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
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
  @ViewChild('sidenav') sidenav!: MatSidenav;
  constructor(private authService: AuthService,
    private router: Router,
    private navService: NavService,
    private elementRef: ElementRef<HTMLElement>
  ) { }

  @HostListener('document:click', ['$event'])
  closeMenuWhenClickingOutside(event: MouseEvent) {
    if (!this.sidenav?.opened) {
      return;
    }

    const target = event.target as Node;
    if (!this.elementRef.nativeElement.contains(target)) {
      this.sidenav.close();
    }
  }

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
    this.navService.clearUser();
    this.isMenuCollapsed = true;
    this.sidenav?.close();
    this.authService.logout();
  }
  redirec(link: string) {
    this.router.navigate([link])
  }
}
