import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {
  public isMenuCollapsed = true;
  constructor(private authService:AuthService,private router:Router) { }

  ngOnInit(): void {
  }
  logout(){
    this.authService.logout()
    this.isMenuCollapsed = true;
    
  }
  redirec(link:string){
    this.router.navigate([link])
  }
}
