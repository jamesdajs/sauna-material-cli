import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
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
  @ViewChild(MatPaginator) paginator: MatPaginator;
  dateIni:String = ''
  dateEnd:String = ''
  displayedColumns: string[] = [ 'id','name','category','cant', 'total'];
  dataSource = new MatTableDataSource<Product>([]);
  loading = false;
  errorMessage = '';
  constructor(public entryService: EntryService) {
    this.dataSource.filterPredicate = (row: Product, filter: string) => {
      const reportRow = row as Product & { category?: string; cant?: number };
      return `${row.id} ${row.name} ${reportRow.category || ''} ${reportRow.cant || ''}`.toLowerCase().includes(filter);
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
    this.entryService.reportProduct().subscribe({
      next: (res) => {
        this.dataSource.data = res;
        this.dataSource.paginator?.firstPage();
      },
      error: (e) => {
        this.errorMessage = 'No se pudo cargar el reporte de productos.';
        this.loading = false;
        console.error(e);
      },
      complete: () => this.loading = false
    })
  }
  search(){
    this.loading = true;
    this.errorMessage = '';
    this.entryService.reportProduct(`?dateIni=${this.dateIni}&dateEnd=${this.dateEnd}`).subscribe({
      next: (res) => {
        this.dataSource.data = res;
        this.dataSource.paginator?.firstPage();
      },
      error: (e) => {
        this.errorMessage = 'No se pudo filtrar el reporte de productos.';
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
  getTotalCost() {
    return this.dataSource.filteredData.reduce((total, row) =>
      total + Number((row as Product & { total?: number }).total || 0), 0);
  }
}
