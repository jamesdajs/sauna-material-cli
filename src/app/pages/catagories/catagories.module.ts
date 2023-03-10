import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CatagoriesRoutingModule } from './catagories-routing.module';
import { CatagoriesComponent } from './catagories.component';
import { SharedModule } from 'src/app/shareds/shared.module';


@NgModule({
  declarations: [
    CatagoriesComponent
  ],
  imports: [
    CommonModule,
    CatagoriesRoutingModule,
    SharedModule
  ]
})
export class CatagoriesModule { }
