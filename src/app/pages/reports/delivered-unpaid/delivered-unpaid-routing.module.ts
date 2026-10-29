import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DeliveredUnpaidComponent } from './delivered-unpaid.component';

const routes: Routes = [{ path: '', component: DeliveredUnpaidComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DeliveredUnpaidRoutingModule {}
