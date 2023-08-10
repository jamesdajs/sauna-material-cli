import { Component } from '@angular/core';
import { UserService } from './services/user.service';
import { NavService } from './services/nav.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {
  title = 'Sauna Florida';
  constructor(private userService: UserService,private navService:NavService
    ){

  }
  ngOnInit() {
    this.userService.getMe().subscribe({
      next: (res) => {
        console.log(res);
        this.navService.setUser(res)
      },
    })
  }
}
