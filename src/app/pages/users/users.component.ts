import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ConfirmDialog, UserDialog } from 'src/app/components/dialogs/dialogs.component';
import { User } from 'src/app/interfaces/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent {
  displayedColumns: string[] = ['ci', 'name',"role", 'state', 'options'];
  dataSource: MatTableDataSource<User>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
constructor(
  private router: Router,
  private userService: UserService,

  private dialog: MatDialog
  ) {
  }
ngAfterContentInit(): void {
  //Called after ngOnInit when the component's or directive's content has been initialized.
  //Add 'implements AfterContentInit' to the class.
  this.loadData()
}
loadData(): void {
  this.userService.list().subscribe({
    next: (res) => {
      this.dataSource = new MatTableDataSource(res);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      console.log(res);
    },
    error: (e) => {
      console.log(e);
    },
    complete: () => {
      // this.router.navigate(["/services"])
      console.log('done')
    },
  })
}

applyFilter(event: Event) {
  const filterValue = (event.target as HTMLInputElement).value;
  this.dataSource.filter = filterValue.trim().toLowerCase();

  if (this.dataSource.paginator) {
    this.dataSource.paginator.firstPage();
  }
}
create(){
  this.router.navigate(["/users/create"])
}
update(user:User){
  let roleId = user.role.id
  let usersend:any = user
  usersend.roleId = roleId
  this.router.navigate(["/users/update/",usersend])
}
entries(id:number){
  this.router.navigate(["/users/entries",{id}])
}
updatePassword(user:User){
  let data = {
    id:user.data.id,
    username:user.data.username,
  }
  this.router.navigate(["/users/dataupdate/",data])
}
openDialog(user:User): void {
  const dialogRef = this.dialog.open(ConfirmDialog, {
    data: {title: "Sauna Florida", message: `Seguro que desea ${user.state?'deshabilitar':'habilitar'} al cliente ${user.name}`},
  });

  dialogRef.afterClosed().subscribe(result => {
    if (result) {

      this.userService.update(user.id,{state:!user.state})
      .subscribe(result => { user.state=!user.state })
    }
  });
}
openUserDialog(user:User):void {
  const dialogRef = this.dialog.open(UserDialog, {
    data:user,
  });

  dialogRef.afterClosed().subscribe(result => {
    console.log('The dialog was closed');
  });
}
}
