import { Component, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Service } from 'src/app/interfaces/service';
import { EntryService } from 'src/app/services/entry.service';

@Component({
  selector: 'app-service',
  templateUrl: './service.component.html',
  styleUrls: ['./service.component.scss']
})
export class ServiceComponent {
  @ViewChild(MatSort) sort: MatSort;
  dateIni:String = ''
  dateEnd:String = ''
  displayedColumns: string[] = [ 'id','name','cant', 'total'];
  dataSource: MatTableDataSource<Service>;
  constructor(public entryService: EntryService) {}
  ngAfterViewInit() {
    this.loadData()
  
  }
  loadData(){
    this.entryService.reportService().subscribe({
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
    this.entryService.reportService(`?dateIni=${this.dateIni}&dateEnd=${this.dateEnd}`).subscribe({
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
