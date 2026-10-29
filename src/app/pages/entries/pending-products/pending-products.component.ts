import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { PendingDetailProduct } from 'src/app/interfaces/detailProduct';
import { DetailProductService } from 'src/app/services/detailProduct.service';

@Component({
  selector: 'app-pending-products',
  templateUrl: './pending-products.component.html',
  styleUrls: ['./pending-products.component.sass']
})
export class PendingProductsComponent {
  displayedColumns: string[] = ['product', 'customer', 'lockers', 'cant', 'createAt', 'options'];
  dataSource = new MatTableDataSource<PendingDetailProduct>([]);
  loading = true;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private detailProductService: DetailProductService) {}

  ngAfterViewInit(): void {
    this.loadData();
  }

  loadData(): void {
    this.loading = true;
    this.detailProductService.pending().subscribe({
      next: products => {
        this.dataSource = new MatTableDataSource(products);
        this.dataSource.filterPredicate = (data, filter) => {
          const lockers = data.lockers.map(locker => locker.code).join(' ');
          const searchText = `${data.product.name} ${data.customer.name} ${lockers} ${data.createAt}`;
          return searchText.toLowerCase().includes(filter);
        };
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      complete: () => this.loading = false
    });
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value.trim().toLowerCase();
    this.dataSource.filter = filterValue;
    this.dataSource.paginator?.firstPage();
  }

  deliver(order: PendingDetailProduct): void {
    if (order.state !== 0) {
      return;
    }

    this.detailProductService.update(order.id, { state: 1 }).subscribe({
      next: () => this.loadData()
    });
  }
}
