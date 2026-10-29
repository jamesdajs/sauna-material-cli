import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PendingProductsComponent } from './pending-products.component';

const routes: Routes = [{ path: '', component: PendingProductsComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PendingProductsRoutingModule {}
