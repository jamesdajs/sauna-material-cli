import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import {  ConfirmDialog } from 'src/app/components/dialogs/dialogs.component';
import { Category } from 'src/app/interfaces/category';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-catagories',
  templateUrl: './catagories.component.html',
  styleUrls: ['./catagories.component.sass']
})
export class CatagoriesComponent {
 displayedColumns: string[] = ['id', 'name', 'state', 'options'];
  dataSource: MatTableDataSource<Category>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private router:Router,
    private categoryService:CategoryService,
    private dialog: MatDialog
    ) {

  }

  ngAfterViewInit() {
    this.loadData()
  
  }
  loadData(){
    this.categoryService.list()
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
       // this.router.navigate(["/categories"])
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
    this.router.navigate(["/categories/create"])
  }
  update(category:Category){
    this.router.navigate(["/categories/update/",category])
  }
  openDialog(category:Category): void {
    const dialogRef = this.dialog.open(ConfirmDialog, {
      data: {title: "Sauna Florida", message: `Seguro que desea ${category.state?'deshabilitar':'habilitar'} la categoria ${category.name}`},
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {

        this.categoryService.update(category.id,{state:!category.state})
        .subscribe(result => { category.state=!category.state })
      }
    });
  }

}
