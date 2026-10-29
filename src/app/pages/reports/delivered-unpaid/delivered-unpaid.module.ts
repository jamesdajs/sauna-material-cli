import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { DeliveredUnpaidRoutingModule } from './delivered-unpaid-routing.module';
import { DeliveredUnpaidComponent } from './delivered-unpaid.component';
import { SharedModule } from 'src/app/shareds/shared.module';

@NgModule({
  declarations: [DeliveredUnpaidComponent],
  imports: [
    CommonModule,
    DeliveredUnpaidRoutingModule,
    SharedModule
  ]
})
export class DeliveredUnpaidModule {}
