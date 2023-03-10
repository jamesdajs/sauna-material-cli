import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { AlertDialog, ConfirmDialog, ProductDialog } from 'src/app/components/dialogs/dialogs.component';
import { Product } from 'src/app/interfaces/product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.sass']
})
export class ProductsComponent {

  displayedColumns: string[] = ['id', 'name','price', 'state', 'options'];
  dataSource: MatTableDataSource<Product>;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private router:Router,
    private productService:ProductService,
    private dialog: MatDialog
    ) {

  }

  ngAfterViewInit() {
    this.loadData()
  
  }
  loadData(){
    this.productService.list()
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
       // this.router.navigate(["/products"])
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
    this.router.navigate(["/products/create"])
  }
  update(product:Product){
    product["categoryId"] = product.category?.id
    delete product.category
    this.router.navigate(["/products/update/",product])
  }
  openDialog(product:Product): void {
    const dialogRef = this.dialog.open(ConfirmDialog, {
      data: {title: "Sauna Florida", message: `Seguro que desea ${product.state?'deshabilitar':'habilitar'} al cliente ${product.name}`},
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {

        this.productService.update(product.id,{state:!product.state})
        .subscribe(result => { product.state=!product.state })
      }
    });
  }
  openAlertDialog(): void {
    const dialogRef = this.dialog.open(AlertDialog, {
      data: {title: "Sauna Florida", message: "Se creo el cliente correctamente"},
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
  openProductDialog(product:Product):void {
    console.log(product);
    
    const dialogRef = this.dialog.open(ProductDialog, {
      data:product,
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
}