import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { AlertDialog, ConfirmDialog, CustomerDialog } from 'src/app/components/dialogs/dialogs.component';
import { Entry } from 'src/app/interfaces/entry';
import { EntryService } from 'src/app/services/entry.service';

@Component({
  selector: 'app-entries',
  templateUrl: './entries.component.html',
  styleUrls: ['./entries.component.sass']
})
export class EntriesComponent {
  displayedColumns: string[] = ['ci', 'name', 'state', 'options'];
  dataSource: MatTableDataSource<Entry>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private router:Router,
    private entryService:EntryService,
    private dialog: MatDialog
    ) {

  }

  ngAfterViewInit() {
    this.loadData()
  
  }
  loadData(){
    this.entryService.list(true)
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
       // this.router.navigate(["/entries"])
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
    this.router.navigate(["/entries/create"])
  }
  update(customer:Entry){
    this.router.navigate(["/entries/update/",customer])
  }
  openDialog(customer:Entry): void {
    const dialogRef = this.dialog.open(ConfirmDialog, {
      data: {title: "Sauna Florida", message: `Seguro que desea ${customer.state?'deshabilitar':'habilitar'} al cliente ${customer.id}`},
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {

        this.entryService.update(customer.id,{state:!customer.state})
        .subscribe(result => { customer.state=!customer.state })
      }
    });
  }
  details(entry:Entry){

    this.router.navigate(["/entries/details/",{id:entry.id}])
  }
  changeStateEntry(entry:Entry){

    this.entryService.closeEntry(entry.id)
    .subscribe({
      next: (res) => {
        console.log(res);
      },
      error: (e) => {
        console.log(e);
      },
      complete: () => {
        this.loadData()
      }
  })
}
openAlertExitDialog(entry:Entry) : void {
  const dialogRef = this.dialog.open(ConfirmDialog, {
    data: {title: "Sauna Florida",message: `Seguro que el cliente ${entry.customer.name} esta saliendo del sauna?`},
  });

  dialogRef.afterClosed().subscribe(result => {
    console.log('The dialog was closed',entry.customer.name);
    if(!!result)
      this.changeStateEntry(entry)
  });
}
}
