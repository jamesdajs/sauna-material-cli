import { Component } from '@angular/core';
import { UserService } from './services/user.service';
import { NavService } from './services/nav.service';
import { EntryService } from './services/entry.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {
  title = 'Sauna Florida';
  cant:any[]=[]
  total = 0
  constructor(private userService: UserService,private navService:NavService,
    ){

  }
  ngOnInit() {
    
    this.userService.getMe().subscribe({
      next: (res) => {
        console.log(res);
        this.navService.setUser(res)
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
    this.navService.setCantCli()
  }
  sumPerson(){
    return this.cant.map(t => parseInt(t.cant)).reduce((acc, value) => acc + value, 0);
  }
}
