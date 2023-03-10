import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { AlertDialog, ConfirmDialog } from 'src/app/components/dialogs/dialogs.component';
import { Locker } from 'src/app/interfaces/locker';
import { LockerService } from 'src/app/services/locker.service';

@Component({
  selector: 'app-locker',
  templateUrl: './lockers.component.html',
  styleUrls: ['./lockers.component.sass']
})
export class LockersComponent {

  displayedColumns: string[] = ['code', 'type', 'state', 'options'];
  dataSource: MatTableDataSource<Locker>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private router:Router,
    private lockerService:LockerService,
    private dialog: MatDialog
    ) {

  }

  ngAfterViewInit() {
    this.loadData()
  
  }
  loadData(){
    this.lockerService.list()
    .subscribe({
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
       // this.router.navigate(["/lockers"])
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
    this.router.navigate(["/lockers/create"])
  }
  update(locker:Locker){
    this.router.navigate(["/lockers/update/",locker])
  }
  openDialog(locker:Locker): void {
    const dialogRef = this.dialog.open(ConfirmDialog, {
      data: {title: "Sauna Florida", message: `Seguro que desea ${locker.state?'deshabilitar':'habilitar'} el casillero ${locker.code}`},
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {

        this.lockerService.update(locker.id,{state:!locker.state})
        .subscribe(result => { locker.state=!locker.state })
      }
    });
  }
}
