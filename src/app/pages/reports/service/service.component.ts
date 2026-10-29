import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
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
  @ViewChild(MatPaginator) paginator: MatPaginator;
  dateIni:String = ''
  dateEnd:String = ''
  displayedColumns: string[] = [ 'id','name','cant', 'total'];
  dataSource = new MatTableDataSource<Service>([]);
  loading = false;
  errorMessage = '';
  constructor(public entryService: EntryService) {
    this.dataSource.filterPredicate = (row: Service, filter: string) => {
      const reportRow = row as Service & { cant?: number };
      return `${row.id} ${row.name} ${reportRow.cant || ''}`.toLowerCase().includes(filter);
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
    this.entryService.reportService().subscribe({
      next: (res) => {
        this.dataSource.data = res;
        this.dataSource.paginator?.firstPage();
      },
      error: (e) => {
        this.errorMessage = 'No se pudo cargar el reporte de servicios.';
        this.loading = false;
        console.error(e);
      },
      complete: () => this.loading = false
    })
  }
  getTotalCost() {
    return this.dataSource.filteredData.reduce((total, row) =>
      total + Number((row as Service & { total?: number }).total || 0), 0);
  }
  search(){
    this.loading = true;
    this.errorMessage = '';
    this.entryService.reportService(`?dateIni=${this.dateIni}&dateEnd=${this.dateEnd}`).subscribe({
      next: (res) => {
        this.dataSource.data = res;
        this.dataSource.paginator?.firstPage();
      },
      error: (e) => {
        this.errorMessage = 'No se pudo filtrar el reporte de servicios.';
        this.loading = false;
        console.error(e);
      },
      complete: () => this.loading = false
    })
  }
  applyFilter(event: Event) {
    this.dataSource.filter = (event.target as HTMLInputElement).value.trim().toLowerCase();
    this.dataSource.paginator?.firstPage();
  }
}
