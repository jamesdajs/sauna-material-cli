import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { DeliveredUnpaidProductReport } from 'src/app/interfaces/report';
import { EntryService } from 'src/app/services/entry.service';

@Component({
  selector: 'app-delivered-unpaid',
  templateUrl: './delivered-unpaid.component.html',
  styleUrls: ['./delivered-unpaid.component.scss']
})
export class DeliveredUnpaidComponent implements OnInit {
  displayedColumns = ['deliveredAt', 'entryId', 'product', 'customer', 'user', 'cant', 'price', 'total'];
  dataSource = new MatTableDataSource<DeliveredUnpaidProductReport>([]);
  selectedDate = new Date();
  loading = false;
  errorMessage = '';

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private entryService: EntryService) {
    this.dataSource.filterPredicate = (row, filter) =>
      `${row.entryId} ${row.product} ${row.customer} ${row.user || ''}`.toLowerCase().includes(filter);
  }

  ngOnInit(): void {
    this.search();
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  search(): void {
    if (!this.selectedDate || Number.isNaN(this.selectedDate.getTime())) {
      this.errorMessage = 'Selecciona una fecha válida.';
      return;
    }

    const year = this.selectedDate.getFullYear();
    const month = String(this.selectedDate.getMonth() + 1).padStart(2, '0');
    const day = String(this.selectedDate.getDate()).padStart(2, '0');

    this.loading = true;
    this.errorMessage = '';
    this.entryService.reportDeliveredUnpaidProducts(`${year}-${month}-${day}`).subscribe({
      next: products => {
        this.dataSource.data = products;
        this.dataSource.paginator?.firstPage();
      },
      error: error => {
        this.errorMessage = 'No se pudo cargar el reporte.';
        this.loading = false;
        console.error(error);
      },
      complete: () => this.loading = false
    });
  }

  applyFilter(event: Event): void {
    this.dataSource.filter = (event.target as HTMLInputElement).value.trim().toLowerCase();
    this.dataSource.paginator?.firstPage();
  }

  getTotalPending(): number {
    return this.dataSource.data.reduce((total, row) => total + Number(row.total), 0);
  }
}
