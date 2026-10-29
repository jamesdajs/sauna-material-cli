import { Component } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ViewChild } from '@angular/core';
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
  dataSource = new MatTableDataSource<Entry>([]);
  loading = false;
  errorMessage = '';
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private router:Router,
    private entryService:EntryService
    ) {
      this.dataSource.filterPredicate = (row: Entry, filter: string) => {
        const reportRow = row as Entry & { yt?: string; total?: number };
        return `${reportRow.yt || ''} ${reportRow.total || ''}`.toLowerCase().includes(filter);
      };
  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.loadData()
  }
  loadData(){
    this.loading = true;
    this.errorMessage = '';
    this.entryService.report().subscribe({
      next: (res) => {
        this.dataSource.data = res;
        this.dataSource.paginator?.firstPage();
      },
      error: (e) => {
        this.errorMessage = 'No se pudieron cargar los reportes diarios.';
        this.loading = false;
        console.error(e);
      },
      complete: () => this.loading = false
    })
  }
  getTotalCost() {
    return this.dataSource.filteredData.reduce((total, row) => {
      const reportRow = row as Entry & { total?: number };
      return total + Number(reportRow.total || 0);
    }, 0);
  }
  applyFilter(event: Event) {
    this.dataSource.filter = (event.target as HTMLInputElement).value.trim().toLowerCase();
    this.dataSource.paginator?.firstPage();
  }
  search(){
    this.loading = true;
    this.errorMessage = '';
    this.entryService.report(`?dateIni=${this.dateIni}&dateEnd=${this.dateEnd}`).subscribe({
      next: (res) => {
        this.dataSource.data = res;
        this.dataSource.paginator?.firstPage();
      },
      error: (e) => {
        this.errorMessage = 'No se pudieron filtrar los reportes diarios.';
        this.loading = false;
        console.error(e);
      },
      complete: () => this.loading = false
    })
  }
  next(date: Date){
    this.router.navigate(["/reports/day",{date}])
  }
  nextDetail(date: Date){

    this.router.navigate(['/reports/detail',{dateIn:date}])
  }
  nextDetailUser(date: Date){

    this.router.navigate(['/reports/detailuser',{dateIn:date}])
  }

}
