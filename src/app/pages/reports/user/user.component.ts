import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { Detail } from 'src/app/interfaces/detail';
import { DetailProduct } from 'src/app/interfaces/detailProduct';
import { Entry } from 'src/app/interfaces/entry';
import { DetailProductService } from 'src/app/services/detailProduct.service';
import { EntryService } from 'src/app/services/entry.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent {
  id:string
  entry:Entry
  loading:boolean = true
  displayedColumns: string[] = [ 'name', 'lockers','price','cant','total'];
  displayedProductColumns: string[] = [ 'name', 'price','cant','state', 'total'];
  dataSource: MatTableDataSource<Detail>;
  dataProductSource: MatTableDataSource<DetailProduct>;
  constructor(
    private router:Router,
    private entryService:EntryService,
    private dialog: MatDialog,
    private route:ActivatedRoute,
    private detailProductService:DetailProductService
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
  getTotalCost() {
    return this.dataSource.data.map(t => t.price*t.cant).reduce((acc, value) => acc + value, 0);
  }
  getTotalCostProducts(){
    return this.dataProductSource.data.map(t => {
      if(t.state == 2)
        return t.price*t.cant
      return 0
    }).reduce((acc, value) => acc + value, 0);
  }
}
