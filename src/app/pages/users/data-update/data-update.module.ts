import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DataUpdateRoutingModule } from './data-update-routing.module';
import { DataUpdateComponent } from './data-update.component';
import { SharedModule } from 'src/app/shareds/shared.module';


@NgModule({
  declarations: [
    DataUpdateComponent
  ],
  imports: [
    CommonModule,
    DataUpdateRoutingModule,
    SharedModule
  ]
})
export class DataUpdateModule { }
