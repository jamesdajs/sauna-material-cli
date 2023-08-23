import { Component, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Entry } from 'src/app/interfaces/entry';
import { EntryService } from 'src/app/services/entry.service';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.scss']
})
export class CustomerComponent {
  @ViewChild(MatSort) sort: MatSort;
  dateIni:String = ''
  dateEnd:String = ''
  displayedColumns: string[] = [ 'id','ci','name', 'total'];
  dataSource: MatTableDataSource<Entry>;
  constructor(public entryService: EntryService) {}
  ngAfterViewInit() {
    this.loadData()
  
  }
  loadData(){
    this.entryService.reportCustomer().subscribe({
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
  search(){
    this.entryService.reportCustomer(`?dateIni=${this.dateIni}&dateEnd=${this.dateEnd}`).subscribe({
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
}

