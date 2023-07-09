import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { DetailDialog } from 'src/app/components/dialogs/detail/detail.dialog';
import { DetailProductDialog } from 'src/app/components/dialogs/detailProduct/detailProduct.dialog';
import { AlertDialog } from 'src/app/components/dialogs/dialogs.component';
import { Detail } from 'src/app/interfaces/detail';
import { DetailProduct } from 'src/app/interfaces/detailProduct';
import { Entry } from 'src/app/interfaces/entry';
import { EntryService } from 'src/app/services/entry.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.sass']
})
export class DetailsComponent {
  id:string
  entry:Entry
  loading:boolean = true
  displayedColumns: string[] = [ 'name', 'lockers','price','cant','total', 'options'];
  displayedProductColumns: string[] = [ 'name', 'price','cant','total', 'options'];
  dataSource: MatTableDataSource<Detail>;
  dataProductSource: MatTableDataSource<DetailProduct>;
  constructor(
    private router:Router,
    private entryService:EntryService,
    private dialog: MatDialog,
    private route:ActivatedRoute
    ) {
      this.route.paramMap.subscribe(
        params =>{
          this.id = params.get('id')!;
        })

  }
  ngAfterViewInit() {
    this.loadData()
  }
  loadData(){
    this.entryService.getEntry(this.id)
    .subscribe({
      next: (res) => {
        console.log(res);
        this.entry = res
        this.dataSource= new MatTableDataSource(res.details)
        this.dataProductSource = new MatTableDataSource(res.detailsProduct)
      },
      error: (e) => {
        console.log(e);
      },
      complete: () => {
       // this.router.navigate(["/entries"])
        console.log('done')
        this.loading = false
      },
    })
  }
  openCreateDetailDialog():void {
    const dialogRef = this.dialog.open(DetailDialog, {
      data:this.entry,
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      if (result) {
        this.loadData()
        this.openAlertDialog('Se adiciono el servicio correctamente')
      }
    });
  }
  openAlertDialog(message:string) : void {
    const dialogRef = this.dialog.open(AlertDialog, {
      data: {title: "Sauna Florida", message},
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
  openCreateDetailProductDialog():void {
    const dialogRef = this.dialog.open(DetailProductDialog, {
      data:this.entry,
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      if (result) {
        this.loadData()
        this.openAlertDialog('Se adiciono el producto correctamente')
      }
    });
  }
  getTotalCost() {
    return this.dataSource.data.map(t => t.price*t.cant).reduce((acc, value) => acc + value, 0);
  }
  getTotalCostProducts(){
    return this.dataProductSource.data.map(t => t.price*t.cant).reduce((acc, value) => acc + value, 0);
  }
}
