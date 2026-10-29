import { Component, OnDestroy, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { CookieService } from 'ngx-cookie-service';
import { io, Socket } from 'socket.io-client';
import { EMPTY, Subject, catchError, switchMap, takeUntil } from 'rxjs';
import { environment } from 'src/environments/environment';
import { PendingDetailProduct } from 'src/app/interfaces/detailProduct';
import { DetailProductService } from 'src/app/services/detailProduct.service';

@Component({
  selector: 'app-pending-products',
  templateUrl: './pending-products.component.html',
  styleUrls: ['./pending-products.component.sass']
})
export class PendingProductsComponent implements OnDestroy {
  displayedColumns: string[] = ['product', 'customer', 'lockers', 'cant', 'createAt', 'options'];
  dataSource = new MatTableDataSource<PendingDetailProduct>([]);
  loading = true;
  syncError = '';
  private readonly destroy$ = new Subject<void>();
  private readonly refresh$ = new Subject<void>();
  private readonly deliveringIds = new Set<string>();
  private socket?: Socket;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private detailProductService: DetailProductService,
    private cookieService: CookieService
  ) {
    this.dataSource.filterPredicate = (data, filter) => {
      const lockers = data.lockers.map(locker => locker.code).join(' ');
      const searchText = `${data.product.name} ${data.customer.name} ${lockers} ${data.createAt}`;
      return searchText.toLowerCase().includes(filter);
    };
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.refresh$.pipe(
      switchMap(() => this.detailProductService.pending().pipe(
        catchError(error => {
          this.syncError = 'No se pudieron actualizar los pedidos. Se volverá a intentar al recibir el próximo cambio.';
          console.error(error);
          this.loading = false;
          return EMPTY;
        })
      )),
      takeUntil(this.destroy$)
    ).subscribe(products => {
      this.dataSource.data = products;
      if (this.socket?.connected) {
        this.syncError = '';
      }
      this.loading = false;
    });
    const token = this.cookieService.get('token');
    if (token) {
      this.socket = io(environment.socketUrl, { auth: { token } });
      this.socket.on('connect', this.onSocketConnected);
      this.socket.on('pending-products:updated', this.requestRefresh);
      this.socket.on('connect_error', error => {
        this.syncError = 'No se pudo conectar al servicio de actualizaciones en tiempo real.';
        console.error(error);
      });
    }
    this.requestRefresh();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
    this.refresh$.complete();
    this.socket?.disconnect();
  }

  private readonly requestRefresh = (): void => this.refresh$.next();
  private readonly onSocketConnected = (): void => {
    this.syncError = '';
    this.requestRefresh();
  };

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value.trim().toLowerCase();
    this.dataSource.filter = filterValue;
    this.dataSource.paginator?.firstPage();
  }

  deliver(order: PendingDetailProduct): void {
    if (order.state !== 0) {
      return;
    }

    this.deliveringIds.add(order.id);
    this.syncError = '';
    this.detailProductService.update(order.id, { state: 1 }).pipe(
      takeUntil(this.destroy$)
    ).subscribe({
      next: () => {
        this.dataSource.data = this.dataSource.data.filter(item => item.id !== order.id);
        this.refresh$.next();
      },
      error: error => {
        this.syncError = 'No se pudo registrar la entrega. Inténtalo nuevamente.';
        console.error(error);
      },
      complete: () => this.deliveringIds.delete(order.id)
    });
  }

  isDelivering(order: PendingDetailProduct): boolean {
    return this.deliveringIds.has(order.id);
  }
}
