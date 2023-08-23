import { Component, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Product } from 'src/app/interfaces/product';
import { EntryService } from 'src/app/services/entry.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent {
  @ViewChild(MatSort) sort: MatSort;
  dateIni:String = ''
  dateEnd:String = ''
  displayedColumns: string[] = [ 'id','name','category','cant', 'total'];
  dataSource: MatTableDataSource<Product>;
  constructor(public entryService: EntryService) {}
  ngAfterViewInit() {
    this.loadData()
  
  }
  loadData(){
    this.entryService.reportProduct().subscribe({
      next: (res) => {
        console.log(res);
        this.dataSource= new MatTableDataSource(res)

        this.dataSource.sort = this.sort;
      },
      error: (e) => {
        console.log(e);
      },
      complete: () => {
        console.log('done')
      },
    })
  }
  search(){
    this.entryService.reportProduct(`?dateIni=${this.dateIni}&dateEnd=${this.dateEnd}`).subscribe({
      next: (res) => {
        console.log(res);
        this.dataSource= new MatTableDataSource(res)
        this.dataSource.sort = this.sort;
      },
      error: (e) => {
        console.log(e);
      },
      complete: () => {
        console.log('done')
      },
    })
  }
  getTotalCost() {
    if (!this.dataSource) {
      return 0;
    }
    return this.dataSource.data.map((t:any) => parseInt(t.total+"")).reduce((acc, value) => acc + value, 0);
  }
}
