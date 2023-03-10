import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import {  ConfirmDialog } from 'src/app/components/dialogs/dialogs.component';
import { Service } from 'src/app/interfaces/service';
import { ServiceService } from 'src/app/services/service.service';

@Component({
  selector: 'app-service',
  templateUrl: './service.component.html',
  styleUrls: ['./service.component.sass']
})
export class ServiceComponent {
  displayedColumns: string[] = ['name','type','description','price', 'state', 'options'];
  dataSource: MatTableDataSource<Service>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private router:Router,
    private serviceService:ServiceService,
    private dialog: MatDialog
    ) {

  }

  ngAfterViewInit() {
    this.loadData()
  
  }
  loadData(){
    this.serviceService.list()
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
    this.router.navigate(["/services/create"])
  }
  update(service:Service){
    this.router.navigate(["/services/update/",service])
  }
  openDialog(service:Service): void {
    const dialogRef = this.dialog.open(ConfirmDialog, {
      data: {title: "Sauna Florida", message: `Seguro que desea ${service.state?'deshabilitar':'habilitar'} la categoria ${service.name}`},
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {

        this.serviceService.update(service.id,{state:!service.state})
        .subscribe(result => { service.state=!service.state })
      }
    });
  }

}

