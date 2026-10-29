import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PendingProductsRoutingModule } from './pending-products-routing.module';
import { PendingProductsComponent } from './pending-products.component';
import { SharedModule } from 'src/app/shareds/shared.module';

@NgModule({
  declarations: [PendingProductsComponent],
  imports: [CommonModule, PendingProductsRoutingModule, SharedModule]
})
export class PendingProductsModule {}
