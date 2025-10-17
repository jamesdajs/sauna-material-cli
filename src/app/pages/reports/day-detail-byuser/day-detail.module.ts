import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DayDetailRoutingModule } from './day-detail-routing.module';
import { DayDetailComponent } from './day-detail.component';
import { SharedModule } from 'src/app/shareds/shared.module';


@NgModule({
  declarations: [
    DayDetailComponent
  ],
  imports: [
    CommonModule,
    DayDetailRoutingModule,
    SharedModule
  ]
})
export class DayDetailModule { }
