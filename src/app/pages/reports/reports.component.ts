import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Entry } from 'src/app/interfaces/entry';
import { EntryService } from 'src/app/services/entry.service';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss']
})
export class ReportsComponent {
  dateIni:String = ''
  dateEnd:String = ''
  displayedColumns: string[] = [ 'date', 'total', 'options'];
  dataSource: MatTableDataSource<Entry>;
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
    this.entryService.report().subscribe({
      next: (res) => {
        console.log(res);
        this.dataSource= new MatTableDataSource(res)
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
    return this.dataSource.data.map(t => parseInt(t.total+"")).reduce((acc, value) => acc + value, 0);
  }
  search(){
    this.entryService.report(`?dateIni=${this.dateIni}&dateEnd=${this.dateEnd}`).subscribe({
      next: (res) => {
        console.log(res);
        this.dataSource= new MatTableDataSource(res)
      },
      error: (e) => {
        console.log(e);
      },
      complete: () => {
        console.log('done')
      },
    })
  }
  next(date: Date){
    this.router.navigate(["/reports/day",{date}])
  }
  nextDetail(date: Date){

    this.router.navigate(['/reports/detail',{dateIn:date}])
  }

}
