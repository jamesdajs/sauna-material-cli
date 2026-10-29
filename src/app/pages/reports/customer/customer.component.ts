import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Entry } from 'src/app/interfaces/entry';
import { EntryService } from 'src/app/services/entry.service';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.scss']
})
export class CustomerComponent {
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  dateIni:String = ''
  dateEnd:String = ''
  displayedColumns: string[] = [ 'id','ci','name', 'total','options'];
  dataSource = new MatTableDataSource<Entry>([]);
  loading = false;
  errorMessage = '';
  constructor(public entryService: EntryService,
              private router: Router
    ) {
      this.dataSource.filterPredicate = (row: Entry, filter: string) => {
        const reportRow = row as Entry & { ci?: string; name?: string; total?: number };
        return `${reportRow.id} ${reportRow.ci || ''} ${reportRow.name || ''} ${reportRow.total || ''}`.toLowerCase().includes(filter);
      };
    }
  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.loadData()
  }
  loadData(){
    this.loading = true;
    this.errorMessage = '';
    this.entryService.reportCustomer().subscribe({
      next: (res) => {
        this.dataSource.data = res;
        this.dataSource.paginator?.firstPage();
      },
      error: (e) => {
        this.errorMessage = 'No se pudo cargar el reporte de clientes.';
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
    this.entryService.reportCustomer(`?dateIni=${this.dateIni}&dateEnd=${this.dateEnd}`).subscribe({
      next: (res) => {
        this.dataSource.data = res;
        this.dataSource.paginator?.firstPage();
      },
      error: (e) => {
        this.errorMessage = 'No se pudo filtrar el reporte de clientes.';
        this.loading = false;
        console.error(e);
      },
      complete: () => this.loading = false
    })
  }
  entries(id:number){
    this.router.navigate(["/customers/entries",{id}])
  }
}
